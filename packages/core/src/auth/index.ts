import { PluginObject, VueConstructor } from 'vue';
import { AuthPluginOptions } from './interfaces';
import { FronteggAuthService } from './service';
import { registerFronteggPlugin } from '../utils';


export const FronteggAuth: PluginObject<AuthPluginOptions> = {
  install(Vue: VueConstructor, options?: AuthPluginOptions) {
    if (Vue.fronteggAuth) {
      console.warn('Frontegg Auth already installed');
      return;
    }

    // if (!Vue.registerFronteggPlugin) {
    //   throw Error('FronteggCore plugin must registered before, move Vue.use(FronteggCore) to the top');
    // }

    Vue.fronteggAuth = new FronteggAuthService(options ?? {});
    registerFronteggPlugin(Vue, Vue.fronteggAuth);


  },
};
