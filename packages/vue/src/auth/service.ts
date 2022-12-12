import { AuthPluginOptions } from './interfaces';
import { FronteggPluginService, FronteggStore, PluginConfig, PluginOptions } from '../interfaces';
import { EnhancedStore } from '@reduxjs/toolkit';
import { bindActionCreators, CaseReducerActions, SliceCaseReducers } from '@frontegg/redux-store';
import {
  authActions,
  LoginActions,
  SocialLoginActions,
  ActivateAccountActions,
  AcceptInvitationActions,
  ForgotPasswordActions,
  SignUpActions,
  ProfileActions,
  SSOActions,
  MfaActions,
  TeamActions,
  ApiTokensActions,
  SecurityPolicyActions,
  tenantsActions,
  loginActions,
  socialLoginsActions,
  activateAccountActions,
  acceptInvitationActions,
  forgotPasswordActions,
  signUpActions,
  profileActions,
  ssoActions,
  mfaActions,
  teamActions,
  apiTokensActions,
  securityPolicyActions,
  User,
  AuthState,
  authInitialState,
  TenantsActions,
  AuthPageRoutes,
  AuthActions,
} from '@frontegg/redux-store';
import { ActionsHolder } from './ActionsHolder';
import VueRouter from 'vue-router';

export const sliceReducerActionsBy = <T extends SliceCaseReducers<any>>(reducer: T): CaseReducerActions<T> => {
  const reducerKeys = Object.keys(reducer);
  const reducerActions = reducerKeys.map(key => ({ [key]: (authActions as any)[key as keyof AuthActions] }));
  return reducerActions.reduce((p, n) => ({ ...p, ...n }), {}) as CaseReducerActions<T>;
};

export class FronteggAuthService implements FronteggPluginService {
  pluginConfig!: PluginConfig;
  router?: VueRouter | null;
  private readonly _routes!: AuthPageRoutes;
  private store?: EnhancedStore<FronteggStore>;
  private state: AuthState = authInitialState;
  loginActions!: LoginActions;
  socialLoginsActions!: SocialLoginActions;
  activateAccountActions!: ActivateAccountActions;
  acceptInvitationActions!: AcceptInvitationActions;
  forgotPasswordActions!: ForgotPasswordActions;
  signUpActions!: SignUpActions;
  profileActions!: ProfileActions;
  ssoActions!: SSOActions;
  mfaActions!: MfaActions;
  teamActions!: TeamActions;
  apiTokensActions!: ApiTokensActions;
  securityPolicyActions!: SecurityPolicyActions;
  tenantsActions!: TenantsActions;

  constructor({ router, ...options }: AuthPluginOptions) {
    this._routes = {
      ...authInitialState.routes,
      ...(options as any).routes,
    };
    this.router = router;
  }

  get loading(): boolean {
    return this.store?.getState().auth.isLoading ?? true;
  }

  get routes(): AuthPageRoutes {
    return this.store?.getState().auth.routes ?? this._routes;
  }

  isAuthenticatedRef!: boolean;
  userRef: User | null | undefined = undefined;

  get isAuthenticated(): boolean {
    return this.store?.getState().auth.isAuthenticated ?? false;
  }

  get user(): User | undefined | null {
    return this.store?.getState().auth.user;
  }

  init = (options: PluginOptions, store: EnhancedStore<FronteggStore>) => {
    this.store = store;

    Object.entries({
      loginActions,
      socialLoginsActions,
      activateAccountActions,
      acceptInvitationActions,
      forgotPasswordActions,
      signUpActions,
      profileActions,
      ssoActions,
      mfaActions,
      teamActions,
      apiTokensActions,
      securityPolicyActions,
      tenantsActions,
    }).forEach(([key, actions]: any) => {
      Object.assign(this, { [key]: bindActionCreators(actions, this.store!.dispatch) });
    });

    const detachableActions: any = bindActionCreators(authActions, this.store!.dispatch);
    ActionsHolder.setActions(detachableActions);

    if (!options.hostedLoginBox) {
      this.store.subscribe(this.storeSubscriber);
    }
  };

  storeSubscriber = () => {
    this.state = this.store!.getState().auth;

    let notifyChange = false;
    if (this.state.user !== this.userRef) {
      this.userRef = this.state.user;
      notifyChange = true;
    }
    if (this.state.isAuthenticated !== this.isAuthenticatedRef) {
      this.isAuthenticatedRef = this.state.isAuthenticated;
      notifyChange = true;
    }
    if (!this.userRef || !this.state.isAuthenticated) {
      clearInterval(this.accessTokenUpdaterRef);
    } else if (notifyChange) {
      this.accessTokenUpdater();
    }
  };

  accessTokenUpdaterRef!: any;
  accessTokenUpdater = (firstTime: boolean = false) => {
    this.accessTokenUpdaterRef && clearInterval(this.accessTokenUpdaterRef);
    if (firstTime) {
      this.loginActions.requestAuthorize(true);
    } else {
      if (this.isAuthenticated) {
        const ttl = (this.user?.expiresIn || 20) * 1000 * 0.8;
        this.accessTokenUpdaterRef = setInterval(this.loginActions.requestAuthorize, ttl);
      }
    }
  };
}
