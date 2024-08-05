import _Vue from 'vue';
import { FronteggStore } from '@frontegg/redux-store';
import { FRONTEGG_REDUX_BINDINGS, FRONTEGG_STORE_KEY, FRONTEGG_UNSUBSCRIBE, FRONTEGG_LOADER_UNSUBSCRIBE } from './constants';
// import { mapState } from './map-state';
import { FronteggPluginService } from './interfaces';

export const setStoreKey = (instance: any, store: FronteggStore) => instance[FRONTEGG_STORE_KEY] = instance[FRONTEGG_STORE_KEY] ?? store;
export const getStore = (instance: any): FronteggStore => instance[FRONTEGG_STORE_KEY];
export const getStoreBinding = (instance: any) => instance[FRONTEGG_REDUX_BINDINGS];
export const setStoreBinding = (instance: any, data: any) => instance[FRONTEGG_REDUX_BINDINGS] = data;
export const setStoreUnsubscribe = (instance: any, unsubscribe: () => void) => instance[FRONTEGG_UNSUBSCRIBE] = unsubscribe;
export const storeUnsubscribe = (instance: any) => instance[FRONTEGG_UNSUBSCRIBE]?.();
// export const setMapState = (instance: any) => {instance.mapState = (...props: any[]) => mapState(instance, ...props);};

export const setLoadingUnsubscribe = (instance: any, unsubscribe: () => void) => instance[FRONTEGG_LOADER_UNSUBSCRIBE] = unsubscribe;
export const loadingUnsubscribe = (instance: any) => instance[FRONTEGG_LOADER_UNSUBSCRIBE]?.();

export const registerFronteggPlugin = (Vue: typeof _Vue, plugin: FronteggPluginService) => {
  Vue.fronteggPlugins = Vue.fronteggPlugins ?? [];
  Vue.fronteggPlugins.push(plugin);
};

