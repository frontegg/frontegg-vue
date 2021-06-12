import { AuthState } from '@frontegg/redux-store/auth';
import { NavigationGuard, NavigationGuardNext, Route } from 'vue-router';
import { StoreHolder } from '../StoreHolder';

export const isAuthenticatedGuard: NavigationGuard = function (_to: Route, _from: Route, next: NavigationGuardNext) {
  const checkIfAuthenticated = () => {
    const state = StoreHolder.getStore().getState().auth as AuthState;
    if (state.isAuthenticated) {
      next();
    } else {
      const basename = StoreHolder.getBasename() ?? '';
      const calculatedBasename = basename.endsWith('/') ? basename.substring(0, basename.length - 1) : '';
      localStorage.setItem('FRONTEGG_AFTER_AUTH_REDIRECT_URL', `${calculatedBasename}${_to.fullPath}`);
      next({ path: state.routes.loginUrl, replace: true });
    }
  };
  let store = StoreHolder.getStore()?.getState()?.auth as AuthState;
  if (store && !store?.isLoading) {
    checkIfAuthenticated();
    return;
  }

  const waitFor = setInterval(() => {
    store = StoreHolder.getStore()?.getState()?.auth as AuthState;
    if (store && !store?.isLoading) {
      clearInterval(waitFor);
      checkIfAuthenticated();
    }
  }, 1);

};
