import { EnhancedStore } from '@reduxjs/toolkit';
import { Unsubscribe } from 'redux';
import { Entitlement, User } from '@frontegg/redux-store';
import { EntitledToOptions, LoadEntitlementsCallback, CustomAttributes } from '@frontegg/types';
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
      @param key feature key
      @param customAttributes consumer attributes
      @returns if the user is entitled to the given feature. Attaching the justification if not
      @throws when entitlement is not enabled via frontegg options
    */
    getFeatureEntitlements: (_user: User | undefined | null, key: string, customAttributes?: CustomAttributes) => Entitlement;

    /**
      @param key permission key
      @param customAttributes consumer attributes
      @returns if the user is entitled to the given permission. Attaching the justification if not
      @throws when entitlement is not enabled via frontegg options
    */    
    getPermissionEntitlements: (_user: User | undefined | null, key: string, customAttributes?: CustomAttributes) => Entitlement;

    /**
      @param entitledToOptions - including permission or feature key
      @param customAttributes consumer attributes
      @returns if the user is entitled to the given permission or feature. Attaching the justification if not
      @throws when entitlement is not enabled via frontegg options
    */
    getEntitlements: (_user: User | undefined | null, entitledToOptions: EntitledToOptions, customAttributes?: CustomAttributes) => Entitlement;

    /**
     * Load entitlements
     * @param callback called on request completed with true if succeeded, false if failed
     */
    loadEntitlements: (callback?: LoadEntitlementsCallback) => void;
  }
}
