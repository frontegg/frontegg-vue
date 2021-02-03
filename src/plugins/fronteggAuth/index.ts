import { reducer, sagas, storeName, actions } from './Api';
import { initialState } from './Api/initialState';
import { PluginConfig } from '@frontegg/react-core';
import { VueConstructor } from 'vue';
import { AuthPluginOptions } from './interfaces';
import set from 'set-value';

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
});

export default {
  install(Vue: VueConstructor, options: AuthPluginOptions) {
    if (!Vue.registerFronteggPlugin) {
      throw Error('FronteggCore plugin must register before, move Vue.use(FronteggCore) to the top');
    }
    Vue.registerFronteggPlugin(AuthPlugin(options));

    Vue.mixin({
      beforeCreate() {
        // console.log('AuthPlugin.beforeCreate');
      },
      beforeDestroy() {
        // console.log('AuthPlugin.beforeDestroy');
      },
    });
  },
};
