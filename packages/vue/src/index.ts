// @ts-ignore
import _Vue, { PluginObject, reactive, ref } from 'vue';
import { PluginOptions } from './interfaces';
import { User } from '@frontegg/redux-store';
import { getRouterBaseName, setupOnRedirectTo, syncStateWithComponent } from './helpers';
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
import { AdminPortal, initialize } from '@frontegg/js';
import { FronteggAuthService } from './auth/service';
import { connectMapState, connectFronteggStoreV3 } from './auth/mapAuthState';
import { ContextHolder, FronteggFrameworks } from '@frontegg/rest-api';
import { EntitledToOptions, CustomAttributes } from '@frontegg/types';
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
} from './constants';
import sdkVersion from './sdkVersion';
import VuePkg from 'vue/package.json';

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
  useAuthState,
  useUnsubscribeFronteggStore,
  useFronteggLoaded,
  useFrontegg,
  useFronteggAuthGuard,
  useIsSteppedUp,
} from './auth/mapAuthState';
export {
  useFeatureEntitlements,
  usePermissionEntitlements,
  useEntitlements,
} from './auth/entitlements';
export * from './auth/interfaces';
export * from './auth/guards';

let fronteggApp: any = null;
const Frontegg: PluginObject<PluginOptions> | any = {
  install(Vue: typeof _Vue, options?: PluginOptions) {
    const { router, ...rest } = options ?? {};
    const { contextOptions } = options ?? {};
    if (contextOptions == null) {
      throw Error('contextOptions must be passed to Vue.use(Frontegg, { /* OPTIONS */ })');
    }
    contextOptions.requestCredentials = contextOptions.requestCredentials ?? 'include';
    contextOptions.metadataHeaders = {
      //TODO: remove this ts-ignore after updating rest-api context options type to accept string.
      //@ts-ignore
      framework: `${FronteggFrameworks.Vuejs}@${VuePkg.version}`,
      fronteggSdkVersion: `@frontegg/vuejs@${sdkVersion.version}`,
    }
    ContextHolder.setContext(contextOptions);
    let pluginRegistered = false;

    // frontegg loader subscription
    let fronteggLoaded: boolean = false;

    const isVue3 = Vue.version.charAt(0) === '3';

    let fronteggLoadedV3: any;

    if (isVue3) {
      fronteggLoadedV3 = ref(false);
    }

    const fronteggLoadedSubscribes: Set<any> = new Set();
    const fronteggLoadedSubscribe = (instance: any) => {
      const func: any = () => {
        instance.fronteggLoaded = fronteggLoaded;
      };
      fronteggLoadedSubscribes.add(func);
      return () => fronteggLoadedSubscribes.delete(func);
    };

    const onRedirectTo = router && setupOnRedirectTo(router, options?.authOptions?.routes);
    fronteggApp = initialize({
      ...rest,
      onRedirectTo,
      basename: getRouterBaseName(router),
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

      (Vue.fronteggPlugins || []).forEach((plugin: any) => plugin.init(rest, store));
      setStoreKey(instance, store);
      instance.fronteggAuth = Vue.fronteggAuth;
      connectMapState(instance);
    };

    const checkIfPluginsLoaded = () => {
      const _fronteggLoaded = (Vue.fronteggPlugins || []).reduce(
        (loaded: boolean, plugin) => loaded && !plugin.loading,
        true
      );

      if (_fronteggLoaded !== fronteggLoaded) {
        fronteggLoaded = _fronteggLoaded;
        if (isVue3) {
          fronteggLoadedV3.value = _fronteggLoaded;
        }
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


    const authorizedContentGuard = (_this: any) => {
      if (!_this.authorizedContent || Vue.fronteggAuth.isAuthRoutes(_this.$route.path)) {
        return;
      }
      if (!Vue.fronteggAuth.loading && !Vue.fronteggAuth.isAuthenticated) {
        if (options?.hostedLoginBox) {
          Vue.fronteggAuth.loginActions.requestHostedLoginAuthorize();
        } else {
          const { loginUrl } = Vue.fronteggAuth.routes;
          _this.$router.push(loginUrl);
        }
      }
    };

    if (!pluginRegistered) {
      registerPlugins(Vue);
    }

    // should be function not arrow to maintain this
    function loginWithRedirect() {
      // @ts-ignore
      if (!this.$route.path.startsWith(Vue.fronteggAuth.routes.hostedLoginRedirectUrl)) {
        store.dispatch({ type: 'auth/setState', payload: { isLoading: true } });
        Vue.fronteggAuth.loginActions.requestHostedLoginAuthorize();
      }
    }

    const loadEntitlements = fronteggApp.loadEntitlements.bind(fronteggApp);
    const stepUp = fronteggApp.stepUp.bind(fronteggApp);

    if (isVue3) {
      // @ts-ignore - provide will exist only in vue 3 app
      Vue.provide(fronteggLoadedKey, fronteggLoadedV3);

      const { authState, unsubscribe } = connectFronteggStoreV3(store);

      const fronteggAuthReactive = reactive({ ...Vue.fronteggAuth });

      // @ts-ignore
      Vue.provide(authStateKey, authState);
      // @ts-ignore
      Vue.provide(unsubscribeFronteggStoreKey, unsubscribe);
      // @ts-ignore
      Vue.provide(fronteggAuthKey, fronteggAuthReactive);
      // @ts-ignore
      Vue.provide(routerKey, router);
      // @ts-ignore
      Vue.provide(fronteggOptionsKey, options);
      // @ts-ignore
      Vue.provide(fronteggStoreKey, store);
      // @ts-ignore
      Vue.provide(loadEntitlementsKey, loadEntitlements);
      // @ts-ignore
      Vue.provide(stepUpKey, stepUp);
    }

    Vue.mixin({
      data: () => ({
        fronteggLoaded,
      }),
      beforeCreate() {
        setStoreKey(this, store);
        this.fronteggAuth = Vue.fronteggAuth;
        this.loginWithRedirect = loginWithRedirect.bind(this);

        // _user was added for to make the computed property reactive, then it will get updated
        this.getFeatureEntitlements = (_user: User | undefined | null, key: string, customAttributes?: CustomAttributes) => fronteggApp.getFeatureEntitlements(key, customAttributes);
        this.getPermissionEntitlements = (_user: User | undefined | null, key: string, customAttributes?: CustomAttributes) => fronteggApp.getPermissionEntitlements(key, customAttributes);
        this.getEntitlements = (_user: User | undefined | null, entitledToOptions: EntitledToOptions, customAttributes?: CustomAttributes) => fronteggApp.getEntitlements(entitledToOptions, customAttributes);
        this.loadEntitlements = loadEntitlements;
        this.isSteppedUp = (_user: User | undefined | null) => fronteggApp.isSteppedUp();

        connectMapState(this);
      },
      updated() {
        authorizedContentGuard(this);
      },
      mounted() {
        authorizedContentGuard(this);
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
  ContextHolder
};
