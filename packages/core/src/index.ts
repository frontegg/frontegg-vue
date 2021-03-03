import _Vue, { PluginObject } from 'vue';
import { ContextHolder } from '@frontegg/rest-api';
import { EnhancedStore } from '@reduxjs/toolkit';
import VueMoment from 'vue-moment';
import { PluginOptions } from './interfaces';
import { combinedPluginsStore, syncStateWithComponent } from './helpers';
import { getStoreBinding, loadingUnsubscribe, setLoadingUnsubscribe, setStoreKey, setStoreUnsubscribe, storeUnsubscribe } from './utils';
import { StoreHolder } from './StoreHolder';
import { AdminBoxInjector } from '@frontegg/admin-box';

export * from './types';

_Vue.use(VueMoment as unknown as PluginObject<undefined>);

let store: EnhancedStore;

const FronteggCore: PluginObject<PluginOptions> = {
  install(Vue: typeof _Vue, options?: PluginOptions) {
    let { contextOptions, router } = options ?? {};
    if (contextOptions == null) {
      throw Error('contextOptions must be passed to Vue.use(FronteggCore, { /* OPTIONS */ })');
    }

    if (router == null) {
      throw Error('VueRouter instance must be passed to Vue.use(FronteggCore, { router })');
    }

    AdminBoxInjector.init({
      version: 'latest',
      contextOptions: {
        baseUrl: 'http://localhost:8080',
      },
    });

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

    const registerPlugins = (instance: any) => {
      console.log('Registering plugins', Vue.fronteggPlugins);
      pluginRegistered = true;
      const pluginConfigs = (Vue.fronteggPlugins || []).map(plugin => plugin.pluginConfig);
      store = combinedPluginsStore(contextOptions!, pluginConfigs, instance.$router);
      StoreHolder.setStore(store);
      (Vue.fronteggPlugins || []).forEach(plugin => plugin.init(store));
    };

    const checkIfPluginsLoaded = () => {
      const _fronteggLoaded = (Vue.fronteggPlugins || []).reduce((loaded: boolean, plugin) => loaded && !plugin.loading, true);
      if (_fronteggLoaded != fronteggLoaded) {
        fronteggLoaded = _fronteggLoaded;
        for (const subscriber of fronteggLoadedSubscribes) {
          subscriber();
        }
      }
    };

    router.getRoutes().map(route => {
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

    Vue.mixin({
      data: () => ({
        fronteggLoaded,
      }),
      beforeCreate() {
        if (!pluginRegistered) {
          registerPlugins(this);
        }

        setStoreKey(this, store);
        // setMapState(this);
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

const openAdminBox = () => AdminBoxInjector.open();
export {
  FronteggCore,
  openAdminBox,
};
