import * as Vue from 'vue';
import App from './App.vue';

import { createRouter, createWebHistory } from 'vue-router';

import { Frontegg } from '@frontegg/vue';
import Entitlement from '@/Entitlement.vue';

const router = createRouter({
  history: createWebHistory('/'),
  routes: [{ name: 'HomePage', path: '/', component: App }],
});

const app = Vue.createApp(App);
app.component('Entitlement', Entitlement);

app.use(router);

app.use(Frontegg, {
  contextOptions: {
    baseUrl: 'https://app-o1uurvajm1on.stg.frontegg.com',
    // baseUrl: process.env.PUBLIC_URL || process.env.REACT_APP_BASE_URL,
    clientId: '9e23d2c9-b45a-4f6a-a879-1418469b1c89', //process.env.REACT_APP_CLIENT_ID,
},
  authOptions: {
    keepSessionAlive: true, // Uncomment this in order to maintain the session alive
  },
  entitlementsOptions: {
    enabled: true,
  },
  hostedLoginBox: false,
  router,
});

app.mount('#app');
