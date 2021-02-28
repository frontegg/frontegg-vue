import { defaultGetterGenerator, objectMappers } from '../helpers';
import {
  AcceptInvitationActions,
  ActivateAccountActions,
  ApiTokensActions,
  ForgotPasswordActions,
  LoginActions,
  MfaActions,
  ProfileActions,
  SecurityPolicyActions, SignUpActions,
  SocialLoginActions, SSOActions,
  TeamActions,
} from '@frontegg/redux-store/auth';
import { ActionsHolder } from './ActionsHolder';
import { AuthActions } from '@frontegg/redux-store';

const mapSubState = (statePrefix: string, propertyName?: string) => function () {
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
export const mapSignupState = (_this: any) => mapSubState('auth.signUpState').bind(_this);
export const mapSocialLoginState = (_this: any) => mapSubState('auth.socialLoginState').bind(_this);
export const mapSsoState = (_this: any) => mapSubState('auth.ssoState').bind(_this);
export const mapTeamState = (_this: any) => mapSubState('auth.teamState').bind(_this);

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
    mapSignupState: mapSignupState(_this),
    mapSocialLoginState: mapSocialLoginState(_this),
    mapSsoState: mapSsoState(_this),
    mapTeamState: mapTeamState(_this),
  });

};


const actionGetter = (action: any) => (...args: any) => (ActionsHolder.getAction(action) as any)(...args);

export const mapAuthActions =
  <K extends keyof AuthActions>(action: K): AuthActions[K] => actionGetter(action);
export const mapLoginActions =
  <K extends keyof LoginActions>(action: K): LoginActions[K] => actionGetter(action);
export const mapAcceptInvitationActions =
  <K extends keyof AcceptInvitationActions>(action: K): AcceptInvitationActions[K] => actionGetter(action);
export const mapActivateAccountActions =
  <K extends keyof ActivateAccountActions>(action: K): ActivateAccountActions[K] => actionGetter(action);
export const mapApiTokensActions =
  <K extends keyof ApiTokensActions>(action: K): ApiTokensActions[K] => actionGetter(action);
export const mapForgotPasswordActions =
  <K extends keyof ForgotPasswordActions>(action: K): ForgotPasswordActions[K] => actionGetter(action);
export const mapMfaActions =
  <K extends keyof MfaActions>(action: K): MfaActions[K] => actionGetter(action);
export const mapProfileActions =
  <K extends keyof ProfileActions>(action: K): ProfileActions[K] => actionGetter(action);
export const mapSecurityPolicyActions =
  <K extends keyof SecurityPolicyActions>(action: K): SecurityPolicyActions[K] => actionGetter(action);
export const mapSignupActions =
  <K extends keyof SignUpActions>(action: K): SignUpActions[K] => actionGetter(action);
export const mapSocialLoginActions =
  <K extends keyof SocialLoginActions>(action: K): SocialLoginActions[K] => actionGetter(action);
export const mapSsoActions =
  <K extends keyof SSOActions>(action: K): SSOActions[K] => actionGetter(action);
export const mapTeamActions =
  <K extends keyof TeamActions>(action: K): TeamActions[K] => actionGetter(action);


