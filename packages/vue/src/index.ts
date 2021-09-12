import _Vue, { PluginObject } from 'vue';
import { PluginOptions } from './interfaces';
import { setupOnRedirectTo, syncStateWithComponent } from './helpers';
import {
  getStoreBinding,
  loadingUnsubscribe,
  registerFronteggPlugin,
  setLoadingUnsubscribe,
  setStoreKey,
  setStoreUnsubscribe,
  storeUnsubscribe,
} from './utils';
import { StoreHolder } from './StoreHolder';
import { AdminPortal, initialize } from '@frontegg/admin-portal';
import { FronteggAuthService } from './auth/service';
import { connectMapState } from './auth/mapAuthState';
import { ContextHolder } from '@frontegg/rest-api';

export * from './types';

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
} from './auth/mapAuthState';
export * from './auth/interfaces';
export * from './auth/guards';

let fronteggApp: any = null;
const Frontegg: PluginObject<PluginOptions> = {
  install(Vue: typeof _Vue, options?: PluginOptions) {
    const { router, ...rest } = options ?? {};
    const { contextOptions } = options ?? {};
    if (contextOptions == null) {
      throw Error('contextOptions must be passed to Vue.use(Frontegg, { /* OPTIONS */ })');
    }

    contextOptions.requestCredentials = contextOptions.requestCredentials ?? 'include';
    ContextHolder.setContext(contextOptions);
    let pluginRegistered = false;

    // frontegg loader subscription
    let fronteggLoaded: boolean = false;
    const fronteggLoadedSubscribes: Set<any> = new Set();
    const fronteggLoadedSubscribe = function (instance: any) {
      const func: any = () => {
        // @ts-ignore
        instance.fronteggLoaded = fronteggLoaded;
      };
      fronteggLoadedSubscribes.add(func);
      return () => fronteggLoadedSubscribes.delete(func);
    };

    const onRedirectTo = router && setupOnRedirectTo(router);
    fronteggApp = initialize({
      ...rest,
      onRedirectTo,
      basename: router?.options.base,
    } as any);

    const store = fronteggApp.store;
    StoreHolder.setStore(store);
    // @ts-ignore
    Vue.$fronteggApp = fronteggApp;

    if (!Vue.fronteggAuth) {
      Vue.fronteggAuth = new FronteggAuthService({ router });
      registerFronteggPlugin(Vue, Vue.fronteggAuth);
    }
    const registerPlugins = (instance: any) => {
      pluginRegistered = true;

      (Vue.fronteggPlugins || []).forEach((plugin: any) => plugin.init(store));
      setStoreKey(instance, store);
      instance.fronteggAuth = Vue.fronteggAuth;
      connectMapState(instance);
    };

    const checkIfPluginsLoaded = () => {
      const _fronteggLoaded = (Vue.fronteggPlugins || []).reduce((loaded: boolean, plugin) => loaded && !plugin.loading, true);
      if (_fronteggLoaded !== fronteggLoaded) {
        fronteggLoaded = _fronteggLoaded;
        for (const subscriber of fronteggLoadedSubscribes) {
          subscriber();
        }
      }
    };

    router?.getRoutes().map(route => {
      const beforeEnterFn = route.beforeEnter;
      route.beforeEnter = (route, redirect, next) => {
        const callNext = () => {
          if (beforeEnterFn) {
            beforeEnterFn(route, redirect, next);
          } else {
            next();
          }
        };

        if (fronteggLoaded) {
          callNext();
          return;
        }

        const waitFor = setInterval(() => {
          checkIfPluginsLoaded();
          if (fronteggLoaded) {
            clearInterval(waitFor);
            callNext();
          }
        }, 1);
      };
    });

    const waitFor = setInterval(() => {
      checkIfPluginsLoaded();
      if (fronteggLoaded) {
        clearInterval(waitFor);
      }
    }, 10);

    if (!pluginRegistered) {
      registerPlugins(Vue);
    }
    Vue.mixin({
      data: () => ({
        fronteggLoaded,
      }),
      beforeCreate() {
        setStoreKey(this, store);
        this.fronteggAuth = Vue.fronteggAuth;
        connectMapState(this);
      },
      created() {
        if (getStoreBinding(this)) {
          setStoreUnsubscribe(this, store.subscribe(syncStateWithComponent(this, getStoreBinding(this))));
        }
        setLoadingUnsubscribe(this, fronteggLoadedSubscribe(this));
      },
      beforeDestroy() {
        storeUnsubscribe(this);
        loadingUnsubscribe(this);
      },
    });
  },
};

/**
 * @deprecated since version 2.0
 * use instead:
 * import {AdminPortal} from '@frontegg/vue'
 * AdminPortal.show()
 */
const openAdminPortal = () => AdminPortal.show();
/**
 * @deprecated since version 2.0
 * use instead:
 * import {AdminPortal} from '@frontegg/vue'
 * AdminPortal.hide()
 */
const closeAdminPortal = () => AdminPortal.hide();

export {
  Frontegg,
  AdminPortal,
  openAdminPortal,
  closeAdminPortal,
};
