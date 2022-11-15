import Vue from 'vue';
import App from './App.vue';
import router from './router';
import fronteggOptions from './fronteggOptions';
Vue.config.productionTip = false;
import { Frontegg } from '@frontegg/vue';
export * from '@frontegg/rest-api';

Vue.use(Frontegg, {
  ...fronteggOptions,
  router,
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
