import { PluginConfig } from '@frontegg/react-core';
import { EnhancedStore } from '@reduxjs/toolkit';
import { Unsubscribe } from 'redux';

declare module 'vue/types/vue' {
  interface VueConstructor {
    registerFronteggPlugin: (plugin: PluginConfig) => void;
  }

  interface Vue {
    FRONTEGG_STORE_KEY?: EnhancedStore;
    FRONTEGG_ACTIONS_KEY?: any;
    FRONTEGG_UNSUBSCRIBE?: Unsubscribe;
    FRONTEGG_REDUX_BINDINGS?: any;
    _data?: any;
    mapState?: (...props: any[]) => object;
  }
}

export const FRONTEGG_STORE_KEY = 'FRONTEGG_STORE_KEY';
export const FRONTEGG_ACTIONS_KEY = 'FRONTEGG_ACTIONS_KEY';
