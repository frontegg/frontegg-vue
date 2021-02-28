import _Vue, { PluginFunction } from 'vue';

// Import vue components
import * as authComponents from './auth/index';
import { FronteggAuth } from '@frontegg/vue-core/auth';
import Vuetify from 'vuetify';
import './styles/app.scss';

_Vue.use(Vuetify);
_Vue.use(FronteggAuth);

// install function executed by Vue.use()
const install: PluginFunction<any> = function installVueUi(Vue: typeof _Vue) {
  Object.entries(authComponents).forEach(([componentName, component]) => {
    Vue.component(componentName, component);
  });
};

// Create module definition for Vue.use()
export default install;

// To allow individual component use, export components
// each can be registered via Vue.component()
export * from './auth';

