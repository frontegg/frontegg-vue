<template>
  <div class="fe-login-page">
    <v-container class="fe-login-container">
      <div class="fe-login-header">
        <img v-bind:src="headerImage">
      </div>

      <div class="fe-activate-account-component">
        <div v-if="!userId || !token">
          <ActivateAccountFailed/>
        </div>
        <div v-else-if="step === activateStep.success">
          <ActivateAccountSuccess/>
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
import {ForgotPasswordStep} from "@frontegg/redux-store/auth/ForgotPasswordState/interfaces";
import i18n from "@/i18n";

export default Vue.extend({
  name: "ActivateAccount",
  i18n,
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
    step(): ForgotPasswordStep {
      return this.authState.forgotPasswordState.step;
    },
    userId(): string {
      return this.url.searchParams.get('userId') ?? '';
    },
    token(): string {
      return this.url.searchParams.get('token') ?? '';
    },
    isAuthenticated(): boolean {
      return this.authState.isAuthenticated;
    },
    headerImage(): string {
      return this.authState.header || 'https://assets.frontegg.com/public-frontegg-assets/logo-transparent.png';
    },
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
