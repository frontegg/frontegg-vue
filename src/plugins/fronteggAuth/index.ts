import { reducer, sagas, storeName, actions } from './Api';
import { initialState } from './Api/initialState';
import { AuthListener } from './Listener';
import { PluginConfig } from '@frontegg/react-core';
import { VueConstructor } from 'vue';
import { AuthPluginOptions } from './interfaces';
import { FRONTEGG_STORE_KEY } from '@/plugins/fronteggCore/constants';
import set from 'set-value';
import { mapState } from '@/plugins/fronteggCore/map-state'
import { AuthStateKey } from './constants'

const AuthPlugin = (options?: AuthPluginOptions): PluginConfig => ({
  storeName,
  preloadedState: {
    ...initialState,
    ...options,
    routes: {
      ...initialState.routes,
      ...options?.routes,
    },
  },
  reducer,
  sagas,
  // Listener: AuthListener,
});

export default {
  install(Vue: VueConstructor, options: AuthPluginOptions) {
    if (!Vue.registerFronteggPlugin) {
      throw Error('FronteggCore plugin must register before, move Vue.use(FronteggCore) to the top');
    }
    Vue.registerFronteggPlugin(AuthPlugin(options));

    const timer = {
      current: 0 as any
    }
  
    const updateSessionTimer = (authStore, authState, firstTime = false) => {
      timer.current && clearInterval(timer.current);
      if (firstTime) {
        // actions.requestAuthorize(firstTime);
        authStore.dispatch({
          type: "auth/requestAuthorize",
          payload: {firstTime},
        });
      } else {
        if (authState.isAuthenticated) {
          const ttl = (authState.user?.expiresIn || 20) * 1000 * 0.8;
          timer.current = setInterval(() => {
            //actions.requestAuthorize()
            authStore.dispatch({
              type: "auth/requestAuthorize",
            });
          }
          , ttl);
        }
      }
    };

    const updateAuthenticationOnStorage = (authState) => {
      if (authState.isLoading && !authState.isAuthenticated) return;
      localStorage.setItem(AuthStateKey, JSON.stringify(authState.isAuthenticated));
    };

    const addStorageListener = (authStore) => {
      window.addEventListener('storage', (ev) => {
        if (ev.key !== AuthStateKey) return;
  
        const authState = JSON.parse(ev.newValue || 'false');
        if (authState === true) return;
        // Force refresh token
        authStore.dispatch({
          type: "auth/resetState",
        });
        authStore.dispatch({
          type: "auth/requestAuthorize",
        });
        // actions.resetState();
        // actions.requestAuthorize();
      });
    };

    let pluginListener = false;
    Vue.mixin({
      data() {
        return {
          ...mapState(this, {
            authState: (state: { auth: AuthState }) => state.auth,
            isLoggedIn: (state) => state.auth.isAuthenticated,
          })
        }
      },
      watch: {
        isLoggedIn(value) {
          // run once on the top root component
          if(!this.$root || !this.$parent) {
            console.log("isAuthenticated", value);
            const authStore = this[FRONTEGG_STORE_KEY];
            updateSessionTimer(authStore, this.authState, value);
            updateAuthenticationOnStorage(this.authState);
          }
        }
      },
      beforeCreate() {
        if(!this.$root || !this.$parent) {
          console.log("dispatch req auth")
          const authStore = this[FRONTEGG_STORE_KEY];
          updateSessionTimer(authStore, this.authState, true);
        }
      },
      created() {
        if(!pluginListener) {
          const authStore = this[FRONTEGG_STORE_KEY];
          //updateSessionTimer(authStore, this.authState, true);
          updateAuthenticationOnStorage(this.authState);
          addStorageListener(authStore);
          pluginListener = true;
        }
      },
      beforeDestroy() {
        // console.log('AuthPlugin.beforeDestroy');
      },
    });
  },
};

export * from './constants'