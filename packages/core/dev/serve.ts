import Vue, { VNode } from 'vue';
import Dev from './serve.vue';
import FronteggCore from '../src';

Vue.use(FronteggCore, {
  baseUrl: 'http://localhost:8080',
});

Vue.config.productionTip = false;

new Vue({
  render: (h): VNode => h(Dev),
}).$mount('#app');
