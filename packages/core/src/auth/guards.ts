import { AuthState } from '@frontegg/redux-store/auth';
import { NavigationGuard, NavigationGuardNext, Route } from 'vue-router';
import { StoreHolder } from '../StoreHolder';

export const isAuthenticatedGuard: NavigationGuard = (_to: Route, _from: Route, next: NavigationGuardNext) => {
  const state = StoreHolder.getStore().getState().auth as AuthState;
  if (state.isAuthenticated) {
    next();
  } else {
    localStorage.setItem('FRONTEGG_AFTER_AUTH_REDIRECT_URL', _to.path);
    next(state.routes.loginUrl);
  }
};
