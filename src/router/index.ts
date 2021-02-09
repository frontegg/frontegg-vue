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
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  },
  {
    path: '/account/forget-password',
    name: 'ForgetPasswordPage',
    component: () => import(/* webpackChunkName: "ForgetPasswordPage" */ '../views/ForgotPasswordPage.vue'),
  },
  {
    path: '/account/reset-password',
    name: 'ResetPasswordPage',
    component: () => import(/* webpackChunkName: "ResetPasswordPage" */ '../views/ResetPasswordPage.vue'),
  },
  {
    path: '/account/activate',
    name: 'ActivateAccount',
    component: () => import(/* webpackChunkName: "ActivateAccount" */ '../views/ActivateAccount.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
