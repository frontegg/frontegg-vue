<template>
  <div class="fe-login-page">
    <v-container
      class="fe-login-container"
    >
      <div class="fe-login-header">
        <img v-bind:src="headerImage">
      </div>

      <div class="fe-forgot-password-component">
        <div v-if="!userId || !token">
          <ResetPasswordFailed/>
        </div>
        <div v-else-if="step === forgotPasswordStep.success">
          <ResetPasswordSuccess/>
        </div>
        <div v-else>
          <ResetPasswordForm
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
import {ForgotPasswordStep} from "@frontegg/redux-store/auth";
import ResetPasswordForm from "./ResetPasswordForm.vue";
import ResetPasswordSuccess from "./ResetPasswordSuccess.vue";
import ResetPasswordFailed from "./ResetPasswordFailed.vue";
import i18n from '@/i18n';

export default Vue.extend({
  name: "ForgetPassword",
  i18n,
  components: {
    ResetPasswordForm,
    ResetPasswordSuccess,
    ResetPasswordFailed,
  },
  data() {
    return {
      ...this.mapAuthState(),
      ...this.mapForgotPasswordState(),
      forgotPasswordStep: ForgotPasswordStep,
      url: new URL(window?.location.href),
      loading: false,
    };
  },
  computed: {
    step(): ForgotPasswordStep | undefined {
      return this.forgotPasswordState.step || this.forgotPasswordStep.forgotPassword;
    },
    userId(): string {
      return this.url.searchParams.get('userId') || '';
    },
    token(): string {
      return this.url.searchParams.get('token') || '';
    },
    isAuthenticated(): boolean | undefined {
      return this.authState?.isAuthenticated;
    },
    headerImage(): string {
      return this.authState.header || 'https://assets.frontegg.com/public-frontegg-assets/logo-transparent.png';
    },
  },

});
</script>

<style lang="scss">
@import '../../styles/auth/auth.scss';
</style>
