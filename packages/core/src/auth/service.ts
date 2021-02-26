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

export const sliceReducerActionsBy = <T extends SliceCaseReducers<any>>(reducer: T): CaseReducerActions<T> => {
  const reducerKeys = Object.keys(reducer);
  const reducerActions = reducerKeys.map((key) => ({ [key]: authActions[key as keyof AuthActions] }));
  return reducerActions.reduce((p, n) => ({ ...p, ...n }), {}) as CaseReducerActions<T>;
};

const AuthPlugin = (options?: AuthPluginOptions): PluginConfig => ({
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
  private store?: EnhancedStore<FronteggStore>;
  private state: AuthState = authInitialState;
  protected loginActions!: LoginActions;
  protected socialLoginsActions!: SocialLoginActions;
  protected activateAccountActions!: ActivateAccountActions;
  protected acceptInvitationActions!: AcceptInvitationActions;
  protected forgotPasswordActions!: ForgotPasswordActions;
  protected signUpActions!: SignUpActions;
  protected profileActions!: ProfileActions;
  protected ssoActions!: SSOActions;
  protected mfaActions!: MfaActions;
  protected teamActions!: TeamActions;
  protected apiTokensActions!: ApiTokensActions;
  protected securityPolicyActions!: SecurityPolicyActions;

  constructor(private options: AuthPluginOptions) {
    this.pluginConfig = AuthPlugin(options);
  }

  get loading(): boolean {
    return this.store?.getState().auth.isLoading ?? true;
  }

  isAuthenticatedRef!: boolean;

  get isAuthenticated(): boolean {
    return this.store?.getState().auth.isAuthenticated ?? false;
  }

  get user(): User | undefined | null {
    return this.store?.getState().auth.user;
  }

  init = (store: EnhancedStore<FronteggStore>) => {
    console.log('init', this.options);
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

    console.log('init finished');
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
