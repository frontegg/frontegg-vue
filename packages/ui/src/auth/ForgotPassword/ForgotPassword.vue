<template>
  <div class="fe-login-page">
    <v-container
      class="fe-login-container"
    >
      <div class="fe-login-header">
        <img v-bind:src="headerImage">
      </div>
      <v-stepper v-model="currentStep">
        <v-stepper-items>
          <v-stepper-content :step="forgotPasswordStep.forgotPassword">
            <div class="fe-forgot-password-component">
              <ForgotPasswordForm />
            </div>
          </v-stepper-content>

          <v-stepper-content :step="forgotPasswordStep.success">
            <div class="fe-forgot-password-component">
              <ForgotPasswordSuccess />
            </div>
          </v-stepper-content>

          <button
            v-if="showBackBtn"
            class="fe-login-component__back-to-login"
            @click="backToLogin()"
          >
            {{ $t('auth.forgot-password.back-to-login') }}
          </button>
        </v-stepper-items>
      </v-stepper>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {ForgotPasswordStep} from "@frontegg/redux-store/auth";
import {mapLoginActions} from "@frontegg/vue-core/auth";
import ForgotPasswordForm from "./ForgotPasswordForm.vue";
import ForgotPasswordSuccess from "./ForgotPasswordSuccess.vue";
import i18n from '@/i18n';

export default Vue.extend({
  name: "ForgetPassword",
  i18n,
  components: {
    ForgotPasswordForm,
    ForgotPasswordSuccess,
  },
  data() {
    return {
      ...this.mapAuthState(),
      forgotPasswordStep: ForgotPasswordStep,
      loading: false,
    };
  },
  computed: {
    showBackBtn(): boolean | undefined {
      return this.forgotPasswordStep.success === this.currentStep;
    },
    isAuthenticated(): boolean | undefined {
      return this.authState.isAuthenticated;
    },
    currentStep(): ForgotPasswordStep {
        return this.authState.forgotPasswordState.step || this.forgotPasswordStep.forgotPassword;
    },
    headerImage(): string {
      return this.authState.header || 'https://assets.frontegg.com/public-frontegg-assets/logo-transparent.png';
    },
  },
  methods: {
    resetLoginState: mapLoginActions('resetLoginState'),
    backToLogin() {
      this.resetLoginState();
      this.$router.push(this.authState.routes.loginUrl);
    },
  },
});
</script>

<style lang="scss">
@import '../../styles/auth/auth.scss';
</style>
