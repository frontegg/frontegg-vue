import _Vue, { PluginFunction } from 'vue';

import './styles/app.scss';
// Import vue components
import * as authComponents from './auth/index';
import * as teamComponents from './team/index';

import Vuetify from 'vuetify';

export const vuetify = new Vuetify();

_Vue.use(Vuetify);

// install function executed by Vue.use()
const install: PluginFunction<any> = function installVueUi(Vue: typeof _Vue) {

  Object.entries(authComponents).forEach(([componentName, component]) => {
    Vue.component(componentName, component);
  });

  Object.entries(teamComponents).forEach(([componentName, component]) => {
    Vue.component(componentName, component);
  });
};

// Create module definition for Vue.use()
export default install;

// To allow individual component use, export components
// each can be registered via Vue.component()
export * from './auth';
export * from './team';

