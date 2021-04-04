import Vue from 'vue';
import App from './App.vue';
import router from './router';
Vue.config.productionTip = false;


import { Frontegg } from '@frontegg/vue';

Vue.use(Frontegg, {
  version: 'next',
  contextOptions: {
    baseUrl: 'https://david.frontegg.com',
  },
  router,
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
