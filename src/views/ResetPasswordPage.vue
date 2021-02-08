<template>
  <div class="fe-login-page">
    <spinner v-if="isLoading"></spinner>
    <v-container class="fe-login-container" v-else>
      <div class="fe-login-header">
        <img src="../assets/main-logo.svg" />
      </div>

      <div class="fe-forgot-password-component">
        <div v-if="step === forgotPasswordStep.success">
          <ResetPasswordSuccess />
        </div>
        <div v-else-if="userId && token">
          <ResetPassword />
        </div>
        <div v-if="!userId || !token">
          <ResetPasswordFailed />
        </div>
      </div>

      <button
        v-if="showBackBtn"
        class="fe-login-component__back-to-login"
        @click="backToLogin()"
        >
        Back to Login
      </button>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { AuthState, ForgotPasswordStep } from "@/plugins/fronteggAuth/Api";
import ResetPassword from "@/components/ResetPassword/ResetPassword.vue";
import ResetPasswordSuccess from "@/components/ResetPassword/ResetPasswordSuccess.vue";
import ResetPasswordFailed from "@/components/ResetPassword/ResetPasswordFailed.vue";
import { FRONTEGG_STORE_KEY } from "@/plugins/fronteggCore/constants";
import { mapState } from "@/plugins/fronteggCore/map-state";
import Spinner from "@/components/Common/Spinner.vue";

export default Vue.extend({
  name: "ForgetPasswordPage",
  components: {
    Spinner,
    ResetPassword,
    ResetPasswordSuccess,
    ResetPasswordFailed,
  },
  data() {
    return {
      ...mapState(this, {
        authState: (state: { auth: AuthState }) => state.auth,
      }),
      forgotPasswordStep: ForgotPasswordStep,
      url: new URL(window?.location.href),
    };
  },
  computed: {
    isLoading() {
      return this.authState.isLoading;
    },
    step() {
      return this.authState.forgotPasswordState.step || this.forgotPasswordStep.forgotPassword;
    },
    userId() {
      return this.url.searchParams.get('userId') || '';
    },
    token() {
      return this.url.searchParams.get('token') || '';
    },
  },
  mounted() {
    this[FRONTEGG_STORE_KEY].dispatch({
      type: "auth/setState",
      payload: {
        isLoading: false,
      },
    });
  },
  methods: {
    backToLogin() {
      this.$router.push(this.authState.routes.loginUrl);
      this[FRONTEGG_STORE_KEY].dispatch({
        type: "auth/resetLoginState",
      });
    },
  },
});
</script>

<style lang="scss">
@import "../styles/login.scss";

.v-stepper {
  box-shadow: none;
}
.v-stepper__content {
  padding: 0;
}
</style>