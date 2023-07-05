// @ts-ignore
import _Vue, { PluginObject, reactive, ref } from 'vue';
import { PluginOptions } from './interfaces';
import { setupOnRedirectTo, syncStateWithComponent } from './helpers';
import {
  getStoreBinding,
  loadingUnsubscribe,
  registerFronteggPlugin,
  setLoadingUnsubscribe,
  setStoreKey,
  setStoreUnsubscribe,
  storeUnsubscribe,
} from './utils';
import { StoreHolder } from './StoreHolder';
import { AdminPortal, initialize } from '@frontegg/js';
import { FronteggAuthService } from './auth/service';
import { connectMapState, connectFronteggStoreV3 } from './auth/mapAuthState';
import { ContextHolder, FronteggFrameworks } from '@frontegg/rest-api';
import {
  authStateKey,
  fronteggAuthKey,
  fronteggLoadedKey,
  fronteggOptionsKey,
  fronteggStoreKey,
  routerKey,
  unsubscribeFronteggStoreKey,
} from './constants';
import sdkVersion from './sdkVersion';

export * from './types';

export {
  mapAuthActions,
  mapLoginActions,
  mapAcceptInvitationActions,
  mapActivateAccountActions,
  mapApiTokensActions,
  mapForgotPasswordActions,
  mapMfaActions,
  mapProfileActions,
  mapSecurityPolicyActions,
  mapSignupActions,
  mapSocialLoginActions,
  mapSsoActions,
  mapTeamActions,
  useAuthState,
  useUnsubscribeFronteggStore,
  useFronteggLoaded,
  useFrontegg,
  useFronteggAuthGuard,
} from './auth/mapAuthState';
export * from './auth/interfaces';
export * from './auth/guards';

let fronteggApp: any = null;
const Frontegg: PluginObject<PluginOptions> | any = {
  install(Vue: typeof _Vue, options?: PluginOptions) {
    const { router, ...rest } = options ?? {};
    const { contextOptions } = options ?? {};
    if (contextOptions == null) {
      throw Error('contextOptions must be passed to Vue.use(Frontegg, { /* OPTIONS */ })');
    }
    contextOptions.requestCredentials = contextOptions.requestCredentials ?? 'include';
    contextOptions.metadataHeaders = {
      framework: FronteggFrameworks.Vuejs,
      fronteggSdkVersion: `@frontegg/vuejs@${sdkVersion.version}`,
    }
    ContextHolder.setContext(contextOptions);
    let pluginRegistered = false;

    // frontegg loader subscription
    let fronteggLoaded: boolean = false;

    const isVue3 = Vue.version.charAt(0) === '3';

    let fronteggLoadedV3: any;

    if (isVue3) {
      fronteggLoadedV3 = ref(false);
    }

    const fronteggLoadedSubscribes: Set<any> = new Set();
    const fronteggLoadedSubscribe = (instance: any) => {
      const func: any = () => {
        instance.fronteggLoaded = fronteggLoaded;
      };
      fronteggLoadedSubscribes.add(func);
      return () => fronteggLoadedSubscribes.delete(func);
    };

    const onRedirectTo = router && setupOnRedirectTo(router, options?.authOptions?.routes);
    fronteggApp = initialize({
      ...rest,
      onRedirectTo,
      basename: router?.options.base,
    } as any);

    const store = fronteggApp.store;
    StoreHolder.setStore(store);
    // @ts-ignore
    Vue.$fronteggApp = fronteggApp;

    if (!Vue.fronteggAuth) {
      Vue.fronteggAuth = new FronteggAuthService({ router });
      registerFronteggPlugin(Vue, Vue.fronteggAuth);
    }
    const registerPlugins = (instance: any) => {
      pluginRegistered = true;

      (Vue.fronteggPlugins || []).forEach((plugin: any) => plugin.init(rest, store));
      setStoreKey(instance, store);
      instance.fronteggAuth = Vue.fronteggAuth;
      connectMapState(instance);
    };

    const checkIfPluginsLoaded = () => {
      const _fronteggLoaded = (Vue.fronteggPlugins || []).reduce(
        (loaded: boolean, plugin) => loaded && !plugin.loading,
        true
      );

      if (_fronteggLoaded !== fronteggLoaded) {
        fronteggLoaded = _fronteggLoaded;
        if (isVue3) {
          fronteggLoadedV3.value = _fronteggLoaded;
        }
        for (const subscriber of fronteggLoadedSubscribes) {
          subscriber();
        }
      }
    };

    router?.getRoutes().map(route => {
      const beforeEnterFn = route.beforeEnter;
      route.beforeEnter = (route, redirect, next) => {
        const callNext = () => {
          if (beforeEnterFn) {
            beforeEnterFn(route, redirect, next);
          } else {
            next();
          }
        };

        if (fronteggLoaded) {
          callNext();
          return;
        }

        const waitFor = setInterval(() => {
          checkIfPluginsLoaded();
          if (fronteggLoaded) {
            clearInterval(waitFor);
            callNext();
          }
        }, 1);
      };
    });

    const waitFor = setInterval(() => {
      checkIfPluginsLoaded();
      if (fronteggLoaded) {
        clearInterval(waitFor);
      }
    }, 10);

    const isAuthRoutes = (path: string) => {
      const { routes } = Vue.fronteggAuth;
      return Object.values(routes)
        .filter(path => path != routes.authenticatedUrl)
        .includes(path);
    };

    const authorizedContentGuard = (_this: any) => {
      if (!_this.authorizedContent || isAuthRoutes(_this.$route.path)) {
        return;
      }
      if (!Vue.fronteggAuth.loading && !Vue.fronteggAuth.isAuthenticated) {
        if (options?.hostedLoginBox) {
          Vue.fronteggAuth.loginActions.requestHostedLoginAuthorize();
        } else {
          const { loginUrl } = Vue.fronteggAuth.routes;
          _this.$router.push(loginUrl);
        }
      }
    };

    if (!pluginRegistered) {
      registerPlugins(Vue);
    }

    // should be function not arrow to maintain this
    function loginWithRedirect() {
      // @ts-ignore
      if (!this.$route.path.startsWith(Vue.fronteggAuth.routes.hostedLoginRedirectUrl)) {
        store.dispatch({ type: 'auth/setState', payload: { isLoading: true } });
        Vue.fronteggAuth.loginActions.requestHostedLoginAuthorize();
      }
    }

    if (isVue3) {
      // @ts-ignore - provide will exist only in vue 3 app
      Vue.provide(fronteggLoadedKey, fronteggLoadedV3);

      const { authState, unsubscribe } = connectFronteggStoreV3(store);

      const fronteggAuthReactive = reactive({ ...Vue.fronteggAuth });

      // @ts-ignore
      Vue.provide(authStateKey, authState);
      // @ts-ignore
      Vue.provide(unsubscribeFronteggStoreKey, unsubscribe);
      // @ts-ignore
      Vue.provide(fronteggAuthKey, fronteggAuthReactive);
      // @ts-ignore
      Vue.provide(routerKey, router);
      // @ts-ignore
      Vue.provide(fronteggOptionsKey, options);
      // @ts-ignore
      Vue.provide(fronteggStoreKey, store);
    }

    Vue.mixin({
      data: () => ({
        fronteggLoaded,
      }),
      beforeCreate() {
        setStoreKey(this, store);
        this.fronteggAuth = Vue.fronteggAuth;
        this.loginWithRedirect = loginWithRedirect.bind(this);
        connectMapState(this);
      },
      updated() {
        authorizedContentGuard(this);
      },
      mounted() {
        authorizedContentGuard(this);
      },
      created() {
        if (getStoreBinding(this)) {
          setStoreUnsubscribe(this, store.subscribe(syncStateWithComponent(this, getStoreBinding(this))));
        }
        setLoadingUnsubscribe(this, fronteggLoadedSubscribe(this));
      },
      beforeDestroy() {
        storeUnsubscribe(this);
        loadingUnsubscribe(this);
      },
    });
  },
};

/**
 * @deprecated since version 2.0
 * use instead:
 * import {AdminPortal} from '@frontegg/vue'
 * AdminPortal.show()
 */
const openAdminPortal = () => AdminPortal.show();
/**
 * @deprecated since version 2.0
 * use instead:
 * import {AdminPortal} from '@frontegg/vue'
 * AdminPortal.hide()
 */
const closeAdminPortal = () => AdminPortal.hide();

export {
  Frontegg,
  AdminPortal,
  openAdminPortal,
  closeAdminPortal,
  ContextHolder
};
