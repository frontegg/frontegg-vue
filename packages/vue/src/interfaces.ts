import { AuthState } from '@frontegg/redux-store/auth';
import { ContextOptions } from '@frontegg/rest-api';
import VueRouter from 'vue-router';
import { EnhancedStore } from '@reduxjs/toolkit';

export interface PluginConfig {
  storeName: string;
  reducer: any;
  sagas: () => void;
  preloadedState: any;
}


export interface FronteggStore {
  auth: AuthState;
}

export interface PluginOptions {
  contextOptions: ContextOptions;
  router: VueRouter
}


export abstract class FronteggPluginService {
  public loading!: boolean;
  public pluginConfig!: PluginConfig;

  public abstract init(store: EnhancedStore<FronteggStore>): void;
}
