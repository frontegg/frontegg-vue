import { AuthPluginOptions } from './interfaces';
import { FronteggPluginService, PluginConfig, PluginOptions } from '../interfaces';
import { defaultFronteggRoutes, FronteggStore } from '@frontegg/redux-store';
import {
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
  User,
  AuthState,
  TenantsActions,
  AuthPageRoutes,
} from '@frontegg/redux-store';
import { ActionsHolder } from './ActionsHolder';
import VueRouter from 'vue-router';

export class FronteggAuthService implements FronteggPluginService {
  pluginConfig!: PluginConfig;
  router?: VueRouter | null;
  private readonly _routes!: AuthPageRoutes;
  private store!: FronteggStore;
  private state!: AuthState;
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
      ...defaultFronteggRoutes,
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

  init = (options: PluginOptions, store: FronteggStore) => {
    this.store = store;


    this.loginActions = store.stateActions.auth.loginActions;
    this.socialLoginsActions = store.stateActions.auth.socialLoginActions;
    this.activateAccountActions = store.stateActions.auth.activateAccountActions;
    this.acceptInvitationActions = store.stateActions.auth.acceptInvitationActions;
    this.forgotPasswordActions = store.stateActions.auth.forgotPasswordActions;
    this.signUpActions = store.stateActions.auth.signUpActions;
    this.profileActions = store.stateActions.auth.profileActions;
    this.ssoActions = store.stateActions.auth.ssoActions;
    this.mfaActions = store.stateActions.auth.mfaActions;
    this.teamActions = store.stateActions.auth.teamActions;
    this.apiTokensActions = store.stateActions.auth.apiTokensActions;
    this.securityPolicyActions = store.stateActions.auth.securityPolicyActions;
    this.tenantsActions = store.stateActions.auth.tenantsActions;

    ActionsHolder.setActions(store.actions);

    if (!options.hostedLoginBox) {
      this.store.subscribe(this.storeSubscriber);
    }
  };

  storeSubscriber = () => {
    this.state = this.store.getState().auth;

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


  getCurrentRoute = (): string => {
    let route: string = '/';
    if (this.router?.currentRoute?.path) {
      // vue-router v3
      route = this.router?.currentRoute?.path;
    }
    // @ts-ignore vue-router v4
    if (this.router?.currentRoute?.value?.fullPath) {
      // @ts-ignore vue-router v4
      route = this.router?.currentRoute?.value?.fullPath;
    }

    return route;
  };

  isAuthRoutes = (path: string): boolean => {
    const pathname = new URL(path, window.location.origin).pathname;
    return Object.values(this.routes)
      .filter(route => route != this.routes.authenticatedUrl)
      .includes(pathname);
  };
}
