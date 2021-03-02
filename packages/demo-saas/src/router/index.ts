import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import { LoginPage } from '@frontegg/vue-ui';
import { ActivateAccount } from '@frontegg/vue-ui';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  }, {
    path: '/account/login',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/account/activate',
    name: 'ActivateAccount',
    component: ActivateAccount,
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

export default router;
