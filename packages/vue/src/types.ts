import { EnhancedStore } from '@reduxjs/toolkit';
import { Unsubscribe } from 'redux';
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
    authorizedContent?: boolean;
  }
}
