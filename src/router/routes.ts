import { RouteConfig } from 'vue-router';
import {store} from "@/plugins/fronteggCore";

const ifAuthenticated = (to, from, next) => {
  next();
  if (!store?.getState().auth.isAuthenticated) {
    console.log('TODO Authenticated redirect')
    next();
    return
  } else {
    next();
  }
};

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "login" */ '../views/Home.vue'),
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
  {
    path: '/team_management',
    name: 'team',
    meta: { layout: "main" },
    beforeEnter: ifAuthenticated,
    component: () => import(/* webpackChunkName: "Team" */ '../views/Team.vue'),
  },
];

export default routes;