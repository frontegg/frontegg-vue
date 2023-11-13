// @ts-ignore
import { inject, onUpdated, onMounted, reactive, onBeforeUnmount, computed } from 'vue';
import { FeatureFlags } from '@frontegg/rest-api';
import { defaultGetterGenerator, objectMappers } from '../helpers';
import {
  AcceptInvitationActions,
  ActivateAccountActions,
  ApiTokensActions,
  ForgotPasswordActions,
  LoginActions,
  MfaActions,
  ProfileActions,
  SecurityPolicyActions,
  SignUpActions,
  SocialLoginActions,
  SSOActions,
  TeamActions,
  TenantsActions,
  AuthActions,
} from '@frontegg/redux-store';
import { ActionsHolder } from './ActionsHolder';
import { AuthState, EnhancedStore/*, isSteppedUp*/ } from '@frontegg/redux-store';
import { FronteggAuthService } from './service';
import VueRouter from 'vue-router';
import {
  authStateKey,
  fronteggAuthKey,
  fronteggLoadedKey,
  fronteggOptionsKey,
  fronteggStoreKey,
  routerKey,
  unsubscribeFronteggStoreKey,
  loadEntitlementsKey,
  stepUpKey,
} from '../constants';

const mapSubState = (statePrefix: string, propertyName?: string) =>
  function() {
    const obj = { [propertyName ?? statePrefix.substring('auth.'.length)]: (state: any) => state };
    // @ts-ignore
    return objectMappers(statePrefix, obj, defaultGetterGenerator).bind(this)();
  };

export const mapAuthState = (_this: any) => mapSubState('auth', 'authState').bind(_this);
export const mapLoginState = (_this: any) => mapSubState('auth.loginState').bind(_this);
export const mapAcceptInvitationState = (_this: any) => mapSubState('auth.acceptInvitationState').bind(_this);
export const mapActivateAccountState = (_this: any) => mapSubState('auth.activateState').bind(_this);
export const mapApiTokensState = (_this: any) => mapSubState('auth.apiTokensState').bind(_this);
export const mapForgotPasswordState = (_this: any) => mapSubState('auth.forgotPasswordState').bind(_this);
export const mapMfaState = (_this: any) => mapSubState('auth.mfaState').bind(_this);
export const mapProfileState = (_this: any) => mapSubState('auth.profileState').bind(_this);
export const mapSecurityPolicyState = (_this: any) => mapSubState('auth.securityPolicyState').bind(_this);
export const mapSignUpState = (_this: any) => mapSubState('auth.signUpState').bind(_this);
export const mapSocialLoginState = (_this: any) => mapSubState('auth.socialLoginState').bind(_this);
export const mapSsoState = (_this: any) => mapSubState('auth.ssoState').bind(_this);
export const mapTeamState = (_this: any) => mapSubState('auth.teamState').bind(_this);
export const mapTenantsState = (_this: any) => mapSubState('auth.tenantsState').bind(_this);

export const connectMapState = (_this: any) => {
  Object.assign(_this, {
    mapAuthState: mapAuthState(_this),
    mapLoginState: mapLoginState(_this),
    mapAcceptInvitationState: mapAcceptInvitationState(_this),
    mapActivateAccountState: mapActivateAccountState(_this),
    mapApiTokensState: mapApiTokensState(_this),
    mapForgotPasswordState: mapForgotPasswordState(_this),
    mapMfaState: mapMfaState(_this),
    mapProfileState: mapProfileState(_this),
    mapSecurityPolicyState: mapSecurityPolicyState(_this),
    mapSignUpState: mapSignUpState(_this),
    mapSocialLoginState: mapSocialLoginState(_this),
    mapSsoState: mapSsoState(_this),
    mapTeamState: mapTeamState(_this),
    mapTenantsState: mapTenantsState(_this),
  });
};

const actionGetter = (action: any) => (...args: any) => (ActionsHolder.getAction(action) as any)(...args);

type MapLoginActions = LoginActions & { loginWithRedirect: LoginActions['requestHostedLoginAuthorize'] };
export const mapAuthActions = <K extends keyof AuthActions>(action: K): AuthActions[K] => actionGetter(action);
export const mapLoginActions = <K extends keyof MapLoginActions>(action: K): MapLoginActions[K] => {
  if (action === 'loginWithRedirect') {
    return actionGetter('requestHostedLoginAuthorize');
  }
  return actionGetter(action);
};
export const mapAcceptInvitationActions = <K extends keyof AcceptInvitationActions>(
  action: K
): AcceptInvitationActions[K] => actionGetter(action);
export const mapActivateAccountActions = <K extends keyof ActivateAccountActions>(
  action: K
): ActivateAccountActions[K] => actionGetter(action);
export const mapApiTokensActions = <K extends keyof ApiTokensActions>(action: K): ApiTokensActions[K] =>
  actionGetter(action);
export const mapForgotPasswordActions = <K extends keyof ForgotPasswordActions>(action: K): ForgotPasswordActions[K] =>
  actionGetter(action);
export const mapMfaActions = <K extends keyof MfaActions>(action: K): MfaActions[K] => actionGetter(action);
export const mapProfileActions = <K extends keyof ProfileActions>(action: K): ProfileActions[K] => actionGetter(action);
export const mapSecurityPolicyActions = <K extends keyof SecurityPolicyActions>(action: K): SecurityPolicyActions[K] =>
  actionGetter(action);
export const mapSignupActions = <K extends keyof SignUpActions>(action: K): SignUpActions[K] => actionGetter(action);
export const mapSocialLoginActions = <K extends keyof SocialLoginActions>(action: K): SocialLoginActions[K] =>
  actionGetter(action);
export const mapSsoActions = <K extends keyof SSOActions>(action: K): SSOActions[K] => actionGetter(action);
export const mapTeamActions = <K extends keyof TeamActions>(action: K): TeamActions[K] => actionGetter(action);
export const mapTenantsActions = <K extends keyof TenantsActions>(action: K): TenantsActions[K] => actionGetter(action);

export const connectFronteggStoreV3 = (store: EnhancedStore) => {
  const initialState = store.getState();

  const authState = reactive({ ...initialState.auth });

  const unsubscribe = store.subscribe(() => {
    const state = store.getState().auth;

    Object.entries(state).forEach(([key, value]) => {
      if (authState[key] !== state[key as keyof AuthState]) {
        authState[key as keyof AuthState] = value;
      }
    });
  });

  return { authState, unsubscribe };
};

export const useFronteggLoaded = () => {
  const fronteggLoaded = inject(fronteggLoadedKey) as boolean;

  return fronteggLoaded;
};

export const useUnsubscribeFronteggStore = () => {
  const unsubscribeFronteggStore = inject(unsubscribeFronteggStoreKey) as () => void;

  return unsubscribeFronteggStore;
};

export const useAuthState = () => {
  const authState = inject(authStateKey) as AuthState;

  return authState;
};

export const useFronteggStore = () => {
  const fronteggStore = inject(fronteggStoreKey);
  return fronteggStore;
};

export const useFronteggAuth = () => {
  const fronteggAuth = inject(fronteggAuthKey) as FronteggAuthService;
  return fronteggAuth;
};

export const useLoadEntitlements = () => {
  return inject(loadEntitlementsKey);
};

export const useStepUp = () => {
  return inject(stepUpKey);
};

export const useIsSteppedUp = () => {
  return computed(() => {
    // const { user } = inject(authStateKey);
    return true;
    // return isSteppedUp(user);
  });
};

export const useFeatureFlag = (keys: string[]) => {
  const { appName } = useFronteggStore();
  return FeatureFlags.getFeatureFlags(keys, appName);
};

export const useFrontegg = () => {
  const fronteggLoaded = useFronteggLoaded();
  const unsubscribeFronteggStore = useUnsubscribeFronteggStore();
  const authState = useAuthState();
  const fronteggAuth = useFronteggAuth();
  const loadEntitlements = useLoadEntitlements();
  const stepUp = useStepUp();
  const isSteppedUp = useIsSteppedUp();

  const fronteggStore = useFronteggStore() as EnhancedStore;

  const loginWithRedirect = () => {
    // @ts-ignore
    if (!fronteggAuth.router?.currentRoute.path.startsWith(authState.routes.hostedLoginRedirectUrl)) {
      fronteggStore.dispatch({ type: 'auth/setState', payload: { isLoading: true } });
      fronteggAuth.loginActions.requestHostedLoginAuthorize();
    }
  };

  onBeforeUnmount(() => {
    unsubscribeFronteggStore();
  });

  return {
    fronteggLoaded,
    authState,
    fronteggAuth,
    loginWithRedirect,
    loadEntitlements,
    stepUp,
    isSteppedUp
  };
};

export const useFronteggAuthGuard = () => {
  const fronteggAuth = useFronteggAuth();
  const fronteggOptions = inject(fronteggOptionsKey) as any;
  const authState = useAuthState();
  const router = inject(routerKey) as VueRouter;
  const fronteggStore = useFronteggStore() as EnhancedStore;

  const isAuthRoutes = (path: string) => {
    const { routes } = authState;
    return Object.values(routes)
      .filter(path => path !== routes.authenticatedUrl)
      .includes(path);
  };

  const checkGuard = () => {
    if (!isAuthRoutes(fronteggAuth.router?.currentRoute.path!) && !authState.isAuthenticated && !authState.isLoading) {
      if (fronteggOptions.hostedLoginBox) {
        fronteggStore.dispatch({ type: 'auth/setState', payload: { isLoading: true } });
        fronteggAuth.loginActions.requestHostedLoginAuthorize();
      } else {
        router.push(authState.routes.loginUrl);
      }
    }
  };

  onMounted(checkGuard);

  onUpdated(checkGuard);
};
