// @ts-ignore
import { inject, computed } from 'vue';
import { EntitledToOptions, Entitlement, CustomAttributes, Attributes, JwtAttributes } from '@frontegg/types';

import {
  getFeatureEntitlements,
  getPermissionEntitlements,
  getEntitlements,
  AuthState,
} from '@frontegg/redux-store';

import { FeatureFlags, USE_ENTITLEMENTS_V2_ENDPOINT_FF } from '@frontegg/rest-api';

import { authStateKey } from '../constants';
import { useFronteggStore } from '../auth/mapAuthState';

/**
 * @returns user state 
 */
const useGetUserState = () => {
  const authState = inject(authStateKey) as AuthState;
  return authState.user;
};

/**
 * @returns true when need to use entitlements V2 API
 */
const useIsV2API = () => {
  // TODO: check should it be immediate or we can recursively inject (check when app name change?)
  const { appName } = useFronteggStore();
  const [useEntitlementsV2] = FeatureFlags.getFeatureFlags([USE_ENTITLEMENTS_V2_ENDPOINT_FF], appName);
  return useEntitlementsV2;
};

/**
 * @param customAttributes consumer attributes
 * @returns is entitled query data including: entitltments state, final attributes (consumer and frontegg) and API version to use
 */
const useEntitlementsQueryData = (customAttributes?: CustomAttributes) => {
  const user = useGetUserState();
  const entitlements = user?.entitlements;
  const isV2 = useIsV2API();

  const attributes: Attributes | undefined = {
    custom: customAttributes,
    jwt: user as JwtAttributes | undefined,
  };

  return {
    entitlements,
    attributes,
    isV2
  };
};

/**
  @param key feature key
  @param customAttributes consumer attributes
  @returns if the user is entitled to the given feature. Attaching the justification if not
  @throws when entitlement is not enabled via frontegg options
*/
export const useFeatureEntitlements = (key: string, customAttributes?: CustomAttributes): Entitlement => {
  return computed(() => {
    const { entitlements, attributes, isV2 } = useEntitlementsQueryData(customAttributes);
    return getFeatureEntitlements(entitlements, key, attributes, isV2)
  });
};

/**
  @param key permission key
  @param customAttributes consumer attributes
  @returns if the user is entitled to the given permission. Attaching the justification if not
  @throws when entitlement is not enabled via frontegg options
*/    
export const usePermissionEntitlements = (key: string, customAttributes?: CustomAttributes): Entitlement => {
  return computed(() => {
    const { entitlements, attributes, isV2 } = useEntitlementsQueryData(customAttributes);
    return getPermissionEntitlements(entitlements, key, attributes, isV2)
  });
};

/**
  @param entitledToOptions - including permission or feature key
  @param customAttributes consumer attributes
  @returns if the user is entitled to the given permission or feature. Attaching the justification if not
  @throws when entitlement is not enabled via frontegg options
*/
export const useEntitlements = (entitledToOptions: EntitledToOptions, customAttributes?: CustomAttributes): Entitlement => {
  return computed(() => {
    const { entitlements, attributes, isV2 } = useEntitlementsQueryData(customAttributes);
    return getEntitlements(entitlements as any, entitledToOptions, attributes, isV2)
  });
};
