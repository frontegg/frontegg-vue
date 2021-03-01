import { PluginObject, VueConstructor } from 'vue';
import { AuthPluginOptions } from './interfaces';
import { FronteggAuthService } from './service';
import { registerFronteggPlugin } from '../utils';
import { connectMapState } from './mapAuthState';

export {
  mapAuthActions,
  mapLoginActions,
  mapAcceptInvitationActions,
  mapActivateAccountActions,
  mapApiTokensActions,
  mapForgotPasswordActions,
  mapMfaActions,
  mapProfileActions,
  mapSecurityPolicyActions,
  mapSignupActions,
  mapSocialLoginActions,
  mapSsoActions,
  mapTeamActions,
} from './mapAuthState';
export * from './interfaces';
export const FronteggAuth: PluginObject<AuthPluginOptions> = {
  install(Vue: VueConstructor, options?: AuthPluginOptions) {
    if (Vue.fronteggAuth) {
      console.warn('Frontegg Auth already installed');
      return;
    }

    Vue.fronteggAuth = new FronteggAuthService(options ?? {});
    registerFronteggPlugin(Vue, Vue.fronteggAuth);

    Vue.mixin({
      beforeCreate() {
        this.fronteggAuth = Vue.fronteggAuth;
        connectMapState(this);
      },
    });
  },
};
