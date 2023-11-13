<template>
  <div id="app" v-if="fronteggLoaded">
    <router-view />

    <section v-if="authState.user">
      <div>SSO: [{{ sso.isEntitled }}, {{ sso.justification }}]</div>
      <!-- <div v-if="sso.isEntitled">A cool section</div> -->
      <div>feSecure: [{{ feSecure.isEntitled }}, {{ feSecure.justification }}]</div>
      <!-- <div v-if="permission1.isEntitled">An awesome section</div> -->
      <div>genSSODevEnv: [{{ genSSODevEnv.isEntitled }}, {{ genSSODevEnv.justification }}]</div>
      <!-- <div v-if="feature2.isEntitled">A mind-blowing section</div> -->

      <div class="entitlements-button-container">
        <button v-on:click="onLoadEntitlementsClicked">Load entitlements</button>
      </div>

      <div class="entitlements-button-container">
        <button v-on:click="onLoadEntitlementsWithCallbackClicked">Load entitlements with callback</button>
      </div>
  </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

/*
Add this in order to have authorizeContentGuard
export default Vue.extend({
  name: 'App',
  data() {
    return {
      authorizedContent: true
    };
  },
});
 */

export default Vue.extend({
  name: 'App',
  data() {
    return {
      ...this.mapAuthState(),
    };
  },
  methods: {
    onLoadEntitlementsClicked() {
      this.loadEntitlements();
    },
    onLoadEntitlementsWithCallbackClicked() {
      this.loadEntitlements((isSucceeded) => console.log('entitlements load: ', isSucceeded));
    },
    stepUp(maxAge: number) {
      this.stepUp(maxAge);
    }
  },
  computed: {
    isSteppedUpUser() {
      const isSteppedUp = this.isSteppedUp(this.authState.user);

      if (isSteppedUp) {
        this.stepUp(300);
      }

      return isSteppedUp;
    },
    // sso() {
    //   const result = this.getFeatureEntitlements(this.authState.user?.entitlements, 'sso');
    //   console.log('render')
    //   return result;
    // },
    // feSecure() {
    //   const result = this.getPermissionEntitlements(this.authState.user?.entitlements, 'fe.secure.*');
    //   return result;
    // },
    // genSSODevEnv() {
    //   const result = this.getEntitlements(this.authState.user?.entitlements, { featureKey: 'sso' });
    //   return result;
    // }
    sso() {
      const result: any = this.getFeatureEntitlements(this.authState.user, 'sso');
      console.log('render')
      return result;
    },
    feSecure() {
      const result = this.getPermissionEntitlements(this.authState.user, 'fe.secure.*');
      return result;
    },
    genSSODevEnv() {
      const result = this.getEntitlements(this.authState.user, { featureKey: 'sso' }, {env: 'dev'});
      return result;
    },
  },
});
</script>
