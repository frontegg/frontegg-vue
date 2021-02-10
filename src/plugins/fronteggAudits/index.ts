import { reducer, sagas, storeName } from './Api';
import { initialState } from './Api/initialState';
import { PluginConfig } from '@frontegg/react-core';
import { VueConstructor } from 'vue';

const AuditsPlugin: PluginConfig = {
  storeName,
  preloadedState: {
    ...initialState,
  },
  reducer,
  sagas,
};

export default {
  install(Vue: VueConstructor) {
    if (!Vue.registerFronteggPlugin) {
      throw Error('FronteggCore plugin must register before, move Vue.use(FronteggCore) to the top');
    }
    Vue.registerFronteggPlugin(AuditsPlugin);
    console.log('Audits plugin installed');

    Vue.mixin({
      beforeCreate() {
        // console.log('AuditsPlugin.beforeCreate');
      },
      beforeDestroy() {
        // console.log('AuditsPlugin.beforeDestroy');
      },
    });
  },
};
