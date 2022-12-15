import * as Vue from 'vue';
import App from './App.vue';

import { createRouter, createWebHistory } from 'vue-router';

import { Frontegg } from '@frontegg/vue';

const router = createRouter({
  history: createWebHistory('/'),
  routes: [{ name: 'HomePage', path: '/', component: App }],
});

const app = Vue.createApp(App);

app.use(router);

app.use(Frontegg, {
  contextOptions: {
    baseUrl: 'https://doglaza.stg.frontegg.com',
    clientId: '52d4bdc4-27fa-46c5-9bfd-76eeb1c8d474',
  },
  authOptions: {
    keepSessionAlive: true, // Uncomment this in order to maintain the session alive
  },
  hostedLoginBox: false,
  router,
});

app.mount('#app');
