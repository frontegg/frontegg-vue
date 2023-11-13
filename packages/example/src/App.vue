<template>
  <button data-test-id="open-hosted" v-on:click="goToLogin()" v-if="!authState.user">Login</button>

  <section v-if="authState.user">
    <div class="outer-container">
      <div class="boxes-container">
        <Entitlement
          name="useFeatureEntitlements(sso)"
          :isEntitled="featureSSO.isEntitled"
          :justification="featureSSO.justification"
        />
        <Entitlement
          name="useFeatureEntitlements(sso, { env: 'dev' })"
          :isEntitled="featureSSOEnvDev.isEntitled"
          :justification="featureSSOEnvDev.justification"
        />

        <Entitlement
          name="usePermissionEntitlements(fe.secure.*)"
          :isEntitled="permissionFESecure.isEntitled"
          :justification="permissionFESecure.justification"
        />

        <Entitlement
          name="usePermissionEntitlements(fe.balagan.*)"
          :isEntitled="permissionFEBalagan.isEntitled"
          :justification="permissionFEBalagan.justification"
        />
        <Entitlement
          name="useEntitlements(fe.secure.*)"
          :isEntitled="genPermissionFESecure.isEntitled"
          :justification="genPermissionFESecure.justification"
        />

        <Entitlement
          name="useEntitlements(sso, { env: 'dev' })"
          :isEntitled="genFeatureSSOEndDev.isEntitled"
          :justification="genFeatureSSOEndDev.justification"
        />
      </div>

      <div class="entitlements-button-container">
        <button v-on:click="onLoadEntitlementsClicked">Load entitlements</button>
      </div>

      <div class="entitlements-button-container">
        <button v-on:click="onLoadEntitlementsWithCallbackClicked">Load entitlements with callback</button>
      </div>
    </div>
  </section>
</template>

<script>
import {
  useFrontegg,
  useFeatureEntitlements,
  usePermissionEntitlements,
  useEntitlements,
  useIsSteppedUp,
  useFronteggAuthGuard
} from '@frontegg/vue';
import { useRouter } from 'vue-router';
import Entitlement from '@/Entitlement.vue';

export default {
  setup() {
    const router = useRouter();

    const { fronteggLoaded, authState, loadEntitlements, stepUp } = useFrontegg();
    const isSteppedUp = useIsSteppedUp();
    
    useFronteggAuthGuard();

    const goToLogin = () => {
      router.push('/account/login');
    };
    const logout = () => {
      router.push('/account/logout');
    };
    const showAccessToken = () => {
      alert(authState.user.accessToken);
    };

    function onLoadEntitlementsClicked() {
      loadEntitlements();
    }

    function onLoadEntitlementsWithCallbackClicked() {
      loadEntitlements(
        (isSucceeded) => console.log('load entitlements', isSucceeded ? 'succeeded' : 'failed')
      );
    }

    // if (!isSteppedUp) {
    //   // full
    //   stepUp();
    // }

    // function onTransfer() {
    //   // action

    //   if (!isSteppedUp) {
    //     // local storage stuff
    //     stepUp();
    //     return;
    //   }

    //   // when stepped up
    //   transfer();
    // }

    // if (waiting for step up to transfer) {
    //   // action - after step up
    //   transfer();
    // }

    const featureSSO = useFeatureEntitlements('sso');
    const featureSSOEnvDev = useFeatureEntitlements('sso', { env: 'dev' });
    const permissionFESecure = usePermissionEntitlements('fe.secure.*');
    const permissionFEBalagan = usePermissionEntitlements('fe.balagan.*');
    const genFeatureSSOEndDev = useEntitlements({ featureKey: 'sso' }, { env: 'dev' });
    const genPermissionFESecure = useEntitlements({ permissionKey: 'fe.secure.*' });

    return {
      fronteggLoaded,
      authState,
      goToLogin,
      logout,
      showAccessToken,
      featureSSO,
      featureSSOEnvDev,
      genPermissionFESecure,
      permissionFEBalagan,
      genFeatureSSOEndDev,
      permissionFESecure,
      onLoadEntitlementsClicked,
      onLoadEntitlementsWithCallbackClicked,
    };
  },
};

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
