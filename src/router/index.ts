import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/account/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/auth/Login.vue'),
  },
  {
    path: '/account/forget-password',
    name: 'ForgetPassword',
    component: () => import(/* webpackChunkName: "ForgetPassword" */ '../views/auth/ForgotPassword.vue'),
  },
  {
    path: '/account/reset-password',
    name: 'ResetPassword',
    component: () => import(/* webpackChunkName: "ResetPassword" */ '../views/auth/ResetPassword.vue'),
  },
  {
    path: '/account/activate',
    name: 'ActivateAccount',
    component: () => import(/* webpackChunkName: "ActivateAccount" */ '../views/auth/ActivateAccount.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
