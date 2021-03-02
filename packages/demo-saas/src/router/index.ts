import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import { LoginPage, TeamPage } from '@frontegg/vue-ui';

const ifAuthenticated = (to:any, from:any , next: any) => {
  if (Vue.fronteggAuth.isAuthenticated) {
    next();
    return;
  } else {
    next(Vue.fronteggAuth.routes.loginUrl);
    return;
  }
};

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
    path: '/team_management',
    name: 'Team',
    component: TeamPage,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/account/login',
    name: 'Login',
    component: LoginPage,
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

export default router;
