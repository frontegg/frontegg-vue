import { AuthPluginOptions } from './interfaces';
import { FronteggPluginService, FronteggStore, PluginConfig } from '../interfaces';
import { EnhancedStore } from '@reduxjs/toolkit';
import { bindActionCreators, CaseReducerActions, SliceCaseReducers } from '@frontegg/redux-store/toolkit';
import authPlugin, {
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
  securityPolicyActions, User, AuthState, authInitialState,
} from '@frontegg/redux-store/auth';
import { AuthActions } from '@frontegg/redux-store';
import { ActionsHolder } from './ActionsHolder';
import { AuthPageRoutes } from '@frontegg/redux-store/auth/interfaces';
import VueRouter from 'vue-router';

export const sliceReducerActionsBy = <T extends SliceCaseReducers<any>>(reducer: T): CaseReducerActions<T> => {
  const reducerKeys = Object.keys(reducer);
  const reducerActions = reducerKeys.map((key) => ({ [key]: authActions[key as keyof AuthActions] }));
  return reducerActions.reduce((p, n) => ({ ...p, ...n }), {}) as CaseReducerActions<T>;
};

const AuthPlugin = (options?: Omit<AuthPluginOptions, 'router'>): PluginConfig => ({
  storeName: authPlugin.storeName,
  preloadedState: {
    ...authPlugin.initialState,
    ...options,
    routes: {
      ...authPlugin.initialState.routes,
      ...options?.routes,
    },
  },
  reducer: authPlugin.reducer,
  sagas: authPlugin.sagas,
});


export class FronteggAuthService implements FronteggPluginService {
  pluginConfig!: PluginConfig;
  router!: VueRouter;
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

  constructor({router, ...options}: AuthPluginOptions) {
    this.pluginConfig = AuthPlugin(options);
    this._routes = {
      ...authInitialState.routes,
      ...options.routes
    }
    this.router = router;
  }

  get loading(): boolean {
    return this.store?.getState().auth.isLoading ?? true;
  }

  get routes(): AuthPageRoutes {
    return this.store?.getState().auth.routes ?? this._routes;
  }

  isAuthenticatedRef!: boolean;

  get isAuthenticated(): boolean {
    return this.store?.getState().auth.isAuthenticated ?? false;
  }

  get user(): User | undefined | null {
    return this.store?.getState().auth.user;
  }

  init = (store: EnhancedStore<FronteggStore>) => {
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
    }).forEach(([key, actions]) => {
      Object.assign(this, { [key]: bindActionCreators(actions, this.store!.dispatch) });
    });


    const detachableActions = bindActionCreators(authActions, this.store!.dispatch);
    ActionsHolder.setActions(detachableActions);


    this.accessTokenUpdater(true);
    this.store.subscribe(this.storeSubscriber);
  };

  storeSubscriber = () => {
    this.state = this.store!.getState().auth;

    if (this.state.isAuthenticated != this.isAuthenticatedRef) {
      this.isAuthenticatedRef = this.state.isAuthenticated;
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
