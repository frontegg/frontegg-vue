import Vue from 'vue';
import App from './App.vue';
import router from './router';
Vue.config.productionTip = false;

import { Frontegg } from '@frontegg/vue';

Vue.use(Frontegg, {
  contextOptions: {
    baseUrl: 'https://loudapi.frontegg.com',
    clientId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
  },
  hostedLoginBox: true,
  router,
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
