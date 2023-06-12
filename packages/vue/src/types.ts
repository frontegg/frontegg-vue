import { EnhancedStore } from '@reduxjs/toolkit';
import { Unsubscribe } from 'redux';
import { Entitlements } from '@frontegg/redux-store';
import { FronteggPluginService } from './interfaces';

declare module 'vue/types/vue' {
  interface VueConstructor {
    registerFronteggPlugin: (plugin: FronteggPluginService) => void;
    fronteggPlugins: FronteggPluginService[];
  }

  interface Vue {
    FRONTEGG_STORE_KEY?: EnhancedStore;
    FRONTEGG_ACTIONS_KEY?: any;
    FRONTEGG_UNSUBSCRIBE?: Unsubscribe;
    FRONTEGG_REDUX_BINDINGS?: any;
    _data?: any;
    fronteggLoaded: boolean;
    loginWithRedirect: () => void;

    /**
      @param _entitlements
      @param keys The requested entitlement keys
      @returns Entitlements contain true/false for every key (state of is key entitled)
    */
    getEntitlements: (_entitlements: any, keys: string[]) => Entitlements;
  }
}
