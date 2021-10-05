import VueRouter from 'vue-router';
import { AuthState, EnhancedStore } from '@frontegg/redux-store';
import { FronteggAppOptions } from '@frontegg/types';

export interface PluginConfig {
  storeName: string;
  reducer: any;
  sagas: () => void;
  preloadedState: any;
}

export interface FronteggStore {
  auth: AuthState;
}

export interface PluginOptions extends FronteggAppOptions {
  router: VueRouter;
}

export abstract class FronteggPluginService {
  public loading!: boolean;
  public pluginConfig!: PluginConfig;

  public abstract init(options: PluginOptions, store: EnhancedStore<FronteggStore>): void;
}
