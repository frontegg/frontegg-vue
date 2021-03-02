<template>
  <div class="fe-login-page">
    <spinner v-if="isLoading" />
    <v-container
      v-else
      class="fe-login-container"
    >
      <div class="fe-login-header">
        <img v-bind:src="headerImage">
      </div>

      <div class="fe-activate-account-component">
        <div v-if="!userId || !token">
          <ActivateAccountFailed />
        </div>
        <div v-else-if="step === activateStep.success">
          <ActivateAccountSuccess />
        </div>
        <div v-else>
          <ActivateAccountForm
            :user-id="userId"
            :token="token"
          />
        </div>
      </div>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {ActivateAccountStep} from "@frontegg/redux-store/auth";
import ActivateAccountForm from "./ActivateAccountForm.vue";
import ActivateAccountSuccess from "./ActivateAccountSuccess.vue";
import ActivateAccountFailed from "./ActivateAccountFailed.vue";
import Spinner from "@/elements/Spinner.vue";

export default Vue.extend({
  name: "ActivateAccount",
  components: {
    Spinner,
    ActivateAccountForm,
    ActivateAccountSuccess,
    ActivateAccountFailed,
  },
  data() {
    return {
      ...this.mapAuthState(),
      activateStep: ActivateAccountStep,
      url: new URL(window?.location.href),
      loading: false,
    };
  },
  computed: {
    isLoading() {
      return this.$data.authState.isLoading || this.$data.loading;
    },
    step() {
      return this.$data.authState.forgotPasswordState.step || this.$data.forgotPasswordStep.forgotPassword;
    },
    userId() {
      return this.$data.url.searchParams.get('userId') || '';
    },
    token() {
      return this.$data.url.searchParams.get('token') || '';
    },
    isAuthenticated() {
      return this.$data.authState.isAuthenticated;
    },
    headerImage() {
      return this.$data.authState.header || 'https://assets.frontegg.com/public-frontegg-assets/logo-transparent.png';
    },
  },
  mounted() {
    // this[FRONTEGG_STORE_KEY].dispatch({
    //   type: "auth/setState",
    //   payload: {
    //     isLoading: false,
    //   },
    // });
  },
});
</script>

<style lang="scss">
@import '../../styles/auth/auth.scss';

.v-stepper {
  box-shadow: none;
}
.v-stepper__content {
  padding: 0;
}
</style>