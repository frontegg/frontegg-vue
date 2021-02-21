import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import {store} from "@/plugins/fronteggCore";
import { ContextHolder } from '@frontegg/rest-api';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.afterEach((to, from) => {
  if(to?.path.includes('account') && store?.getState().auth.routes.isAuthenticated) {
    ContextHolder.onRedirectTo(store?.getState().auth.routes.authenticatedUrl, { replace: true, refresh: false })
  }
})

export default router;
