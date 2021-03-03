import { ISocialLoginProviderConfiguration, SocialLoginsProviders } from '@frontegg/rest-api';

export {
  SocialLoginsProviders
}

export interface ISocialLoginCallbackState {
  provider: SocialLoginsProviders;
  action: SocialLoginsActions;
}

export interface ISocialLoginsContext {
  action: SocialLoginsActions;
}

export enum SocialLoginsActions {
  Login = 'login',
  SignUp = 'signUp',
}

export type UrlCreatorConfigType = ISocialLoginProviderConfiguration & { state: string };
