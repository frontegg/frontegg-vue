import Vue from 'vue';
import { Frontegg } from '@frontegg/vue';

const FRONTEGG_OPTIONS = JSON.parse(`<%= options %>`);

export default function(context, inject) {
  const { app, store } = context;

  const router = app.router;

  Vue.use(Frontegg, {
    version: 'next',
    ...FRONTEGG_OPTIONS,
    router,
  });

  if (store) {
    store.$fronteggApp = Vue.$fronteggApp;
  }

  context.$fronteggApp = Vue.$fronteggApp;

  if (Vue.$fronteggApp) {
    inject('$fronteggApp', Vue.$fronteggApp);
  }
}
