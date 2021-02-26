import _Vue from 'vue';
import { EnhancedStore } from '@reduxjs/toolkit';
import { FRONTEGG_REDUX_BINDINGS, FRONTEGG_STORE_KEY, FRONTEGG_UNSUBSCRIBE, FRONTEGG_LOADER_UNSUBSCRIBE } from './constants';
import { mapState } from './map-state';
import { FronteggPluginService } from './interfaces';

export const setStoreKey = (instance: any, store: EnhancedStore) => instance[FRONTEGG_STORE_KEY] = instance[FRONTEGG_STORE_KEY] ?? store;
export const getStore = (instance: any): EnhancedStore => instance[FRONTEGG_STORE_KEY];
export const getStoreBinding = (instance: any) => instance[FRONTEGG_REDUX_BINDINGS];
export const setStoreUnsubscribe = (instance: any, unsubscribe: () => void) => instance[FRONTEGG_UNSUBSCRIBE] = unsubscribe;
export const storeUnsubscribe = (instance: any) => instance[FRONTEGG_UNSUBSCRIBE]?.();
export const setMapState = (instance: any) => {instance.mapState = (...props: any[]) => mapState(instance, ...props);};

export const setLoadingUnsubscribe = (instance: any, unsubscribe: () => void) => instance[FRONTEGG_LOADER_UNSUBSCRIBE] = unsubscribe;
export const loadingUnsubscribe = (instance: any) => instance[FRONTEGG_LOADER_UNSUBSCRIBE]?.();


export const registerFronteggPlugin = (Vue: typeof _Vue, plugin: FronteggPluginService) => {
  console.log('New register plugin request', plugin);
  Vue.fronteggPlugins = Vue.fronteggPlugins ?? [];
  Vue.fronteggPlugins.push(plugin);
};

