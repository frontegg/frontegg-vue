import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { FronteggAuth, FronteggCore } from '@frontegg/vue-core';

Vue.config.productionTip = false;

Vue.use(FronteggCore, { contextOptions: { baseUrl: 'http://localhost:8080' }, router });
Vue.use(FronteggAuth);


new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
