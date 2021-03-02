import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import { TeamPage } from '@frontegg/vue-ui';
import { isAuthenticatedGuard } from '@frontegg/vue-core/auth';

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
    beforeEnter: isAuthenticatedGuard,
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

export default router;
