import { FronteggAuthService } from './service';
import {
  AcceptInvitationState,
  ActivateAccountState,
  ApiTokensState,
  AuthState, ForgotPasswordState, LoginState,
  MFAState,
  ProfileState,
  SecurityPolicyState,
  SignUpState,
  SocialLoginState,
  SSOState,
  TeamState,
  EntitlementsState
} from '@frontegg/redux-store';
import VueRouter from 'vue-router';
import { TenantsState } from '@frontegg/redux-store';

// export type AuthPageRoutes = {
//   /**
//    * the page whither need to redirect in the case when a user is authenticated
//    * @default: url before redirect to login or '/'
//    */
//   authenticatedUrl: string;
//   /**
//    * the page whither need to redirect in the case when a user is not authenticated
//    */
//   loginUrl: string;
//   /**
//    * navigating to this url, AuthProvider will logout and remove coockies
//    */
//   logoutUrl: string;
//   /**
//    * the page whither need to redirect in the case when a user want to activate his account
//    */
//   activateUrl: string;
//   /**
//    * the page whether need to redirect in the case when a user want to accept invite to tanent
//    */
//   acceptInvitationUrl: string;
//   /**
//    * the page in the case a user forgot his account password
//    */
//   forgetPasswordUrl: string;
//   /**
//    * the page whither need to redirect in the case when a user redirected from reset password url
//    */
//   resetPasswordUrl: string;
//   /**
//    * the url to reach the idp redirect after successful SAML response
//    */
//   samlCallbackUrl?: string;
//   /**
//    * the url to reach the idp redirect after successful SAML response
//    */
//   socialLoginCallbackUrl?: string;
//   /**
//    * sign up page
//    */
//   signUpUrl: string;
// };


export type AuthPluginOptions = {
  headerImage?: string;
  router?: VueRouter | null;
};

declare module 'vue/types/vue' {
  interface VueConstructor {
    fronteggAuth: FronteggAuthService;
    loginWithRedirect: () => void;
  }

  interface Vue {
    fronteggAuth: FronteggAuthService;
    loginWithRedirect: () => void;
    mapAuthState: () => { authState: AuthState };
    mapEntitlementsState: () => { entitlements: EntitlementsState['entitlements'] };
    mapLoginState: () => { loginState: LoginState };
    mapAcceptInvitationState: () => { acceptInvitationState: AcceptInvitationState };
    mapActivateAccountState: () => { activateState: ActivateAccountState };
    mapApiTokensState: () => { apiTokensState: ApiTokensState };
    mapForgotPasswordState: () => { forgotPasswordState: ForgotPasswordState };
    mapMfaState: () => { mfaState: MFAState };
    mapProfileState: () => { profileState: ProfileState };
    mapSecurityPolicyState: () => { securityPolicyState: SecurityPolicyState };
    mapSignUpState: () => { signUpState: SignUpState };
    mapSocialLoginState: () => { socialLoginState: SocialLoginState };
    mapSsoState: () => { ssoState: SSOState };
    mapTeamState: () => { teamState: TeamState };
    mapTenantsState: () => { tenantsState: TenantsState };
  }
}
