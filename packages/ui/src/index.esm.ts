import _Vue, { PluginFunction } from 'vue';

import './styles/app.scss';
// Import vue components
import * as authComponents from './auth/index';
import * as teamComponents from './team/index';

import Vuetify from 'vuetify';
import { Route } from 'vue-router';
import { NavigationGuardNext } from 'vue-router/types/router';

export const vuetify = new Vuetify();

_Vue.use(Vuetify);

// install function executed by Vue.use()
const install: PluginFunction<any> = function installVueUi(Vue: typeof _Vue) {

  Object.entries(authComponents).forEach(([componentName, component]) => {
    Vue.component(componentName, component);
  });

  Object.entries(teamComponents).forEach(([componentName, component]) => {
    Vue.component(componentName, component);
  });

  const routes = Vue.fronteggAuth.routes;

  const beforeEnter = (_route: Route, _redirect: Route, next: NavigationGuardNext) => {
    if (!Vue.fronteggAuth.loading) {
      next();
      return;
    }

    const waitFor = setInterval(() => {
      if (!Vue.fronteggAuth.loading) {
        clearInterval(waitFor);
        next();
      }
    }, 100);
  };

  Vue.fronteggAuth.router.addRoute({
    path: routes.loginUrl,
    name: 'Login',
    component: authComponents.LoginPage,
    beforeEnter,
  });

  Vue.fronteggAuth.router.addRoute({
    path: routes.activateUrl,
    name: 'ActivateAccount',
    component: authComponents.ActivateAccount,
    beforeEnter,
  });

  Vue.fronteggAuth.router.addRoute({
    path: routes.acceptInvitationUrl,
    name: 'AcceptInvitation',
    component: authComponents.AcceptInvitation,
    beforeEnter,
  });

  Vue.fronteggAuth.router.addRoute({
    path: routes.forgetPasswordUrl,
    name: 'ForgotPassword',
    component: authComponents.ForgotPassword,
    beforeEnter,
  });

  Vue.fronteggAuth.router.addRoute({
    path: routes.resetPasswordUrl,
    name: 'ResetPassword',
    component: authComponents.ResetPassword,
    beforeEnter,
  });

  Vue.fronteggAuth.router.addRoute({
    path: routes.logoutUrl,
    name: 'LogoutPage',
    component: authComponents.LogoutPage,
  });

  Vue.fronteggAuth.router.addRoute({
    path: routes.socialLoginCallbackUrl ?? '/account/social/success',
    name: 'SocialLoginsSuccess',
    component: authComponents.SocialLoginsSuccess,
    beforeEnter,
  });

  Vue.fronteggAuth.router.addRoute({
    path: routes.signUpUrl,
    name: 'SignUp',
    component: authComponents.SignUp,
    beforeEnter,
  });
};

// Create module definition for Vue.use()
export default install;

// To allow individual component use, export components
// each can be registered via Vue.component()
export * from './auth';
export * from './team';

