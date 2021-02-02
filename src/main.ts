import Vue from 'vue';
import App from './App.vue';
import router from './router';
import fronteggCore from './plugins/fronteggCore';
import fronteggAuth from './plugins/fronteggAuth';
import fronteggAudits from './plugins/fronteggAudits';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;
Vue.use(fronteggCore, { baseUrl: 'http://localhost:8080' });
Vue.use(fronteggAuth, {
  routes: {
    loginUrl: 'AAAAA',
  },
});
Vue.use(fronteggAudits);


new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app');
