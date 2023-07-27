// @ts-ignore
import { inject, computed } from 'vue';
import { EntitledToOptions, Entitlement } from '@frontegg/types';

import {
  getFeatureEntitlements,
  getPermissionEntitlements,
  getEntitlements,
  AuthState,
} from '@frontegg/redux-store';

import { authStateKey } from '../constants';

const getEntitlementsState = () => {
  const authState = inject(authStateKey) as AuthState;
  return authState.user?.entitlements;
};

/**
  @param key feature
  @returns if the user is entitled to the given feature. Attaching the justification if not
  @throws when entitlement is not enabled via frontegg options
*/
export const useFeatureEntitlements = (key: string): Entitlement => {
  return computed(() => getFeatureEntitlements(getEntitlementsState(), key));
};

/**
  @param key permission
  @returns if the user is entitled to the given permission. Attaching the justification if not
  @throws when entitlement is not enabled via frontegg options
*/    
export const usePermissionEntitlements = (key: string): Entitlement => {
  return computed(() => getPermissionEntitlements(getEntitlementsState(), key));
};

/**
  @param options - including permission or feature key
  @returns if the user is entitled to the given permission or feature. Attaching the justification if not
  @throws when entitlement is not enabled via frontegg options
*/
export const useEntitlements = (entitledToOptions: EntitledToOptions): Entitlement => {
  return computed(() => getEntitlements(getEntitlementsState(), entitledToOptions));
};
