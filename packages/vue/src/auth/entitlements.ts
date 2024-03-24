// @ts-ignore
import { inject, computed, ComputedRef } from 'vue';
import { EntitledToOptions, Entitlement, CustomAttributes, Attributes, JwtAttributes } from '@frontegg/types';

import {
  getFeatureEntitlements,
  getPermissionEntitlements,
  getEntitlements,
  AuthState,
} from '@frontegg/redux-store';

import { authStateKey } from '../constants';

/**
 * @returns user state 
 */
const useGetUserState = () => {
  const authState = inject(authStateKey) as AuthState;
  return authState.user;
};

/**
 * @param customAttributes consumer attributes
 * @returns is entitled query data including: entitlements state and final attributes (consumer and frontegg)
 */
const useEntitlementsQueryData = (customAttributes?: CustomAttributes) => {
  const user = useGetUserState();
  const entitlements = user?.entitlements;

  const attributes: Attributes = {
    custom: customAttributes,
    jwt: user as JwtAttributes | undefined,
  };

  return {
    entitlements,
    attributes,
  };
};

/**
  @param key feature key
  @param customAttributes consumer attributes
  @returns if the user is entitled to the given feature. Attaching the justification if not
  @throws when entitlement is not enabled via frontegg options
*/
export const useFeatureEntitlements = (key: string, customAttributes?: CustomAttributes): ComputedRef<Entitlement> => {
  return computed(() => {
    const { entitlements, attributes } = useEntitlementsQueryData(customAttributes);
    return getFeatureEntitlements(entitlements, key, attributes, true)
  });
};

/**
  @param key permission key
  @param customAttributes consumer attributes
  @returns if the user is entitled to the given permission. Attaching the justification if not
  @throws when entitlement is not enabled via frontegg options
*/    
export const usePermissionEntitlements = (key: string, customAttributes?: CustomAttributes): ComputedRef<Entitlement> => {
  return computed(() => {
    const { entitlements, attributes } = useEntitlementsQueryData(customAttributes);
    return getPermissionEntitlements(entitlements, key, attributes, true)
  });
};

/**
  @param entitledToOptions - including permission or feature key
  @param customAttributes consumer attributes
  @returns if the user is entitled to the given permission or feature. Attaching the justification if not
  @throws when entitlement is not enabled via frontegg options
*/
export const useEntitlements = (entitledToOptions: EntitledToOptions, customAttributes?: CustomAttributes): ComputedRef<Entitlement> => {
  return computed(() => {
    const { entitlements, attributes } = useEntitlementsQueryData(customAttributes);
    return getEntitlements(entitlements, entitledToOptions, attributes, true)
  });
};
