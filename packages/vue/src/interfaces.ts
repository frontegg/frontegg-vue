import VueRouter from 'vue-router';
import { FronteggStore } from '@frontegg/redux-store';
import { FronteggAppOptions } from '@frontegg/types';

export interface PluginConfig {
  storeName: string;
  reducer: any;
  sagas: () => void;
  preloadedState: any;
}



export interface PluginOptions extends FronteggAppOptions {
  router: VueRouter;
}

export abstract class FronteggPluginService {
  public loading!: boolean;
  public pluginConfig!: PluginConfig;

  public abstract init(options: PluginOptions, store: FronteggStore): void;
}
