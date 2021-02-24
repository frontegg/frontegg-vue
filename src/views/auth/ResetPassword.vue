<template>
  <div class="fe-login-page">
    <spinner v-if="isLoading" />
    <v-container
      v-else
      class="fe-login-container"
    >
      <div class="fe-login-header">
        <img src="@/assets/main-logo.svg">
      </div>

      <div class="fe-forgot-password-component">
        <div v-if="!userId || !token">
          <ResetPasswordFailed />
        </div>
        <div v-else-if="step === forgotPasswordStep.success">
          <ResetPasswordSuccess />
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
import { AuthState, ForgotPasswordStep } from "@/plugins/fronteggAuth/Api";
import ResetPasswordForm from "@/components/auth/ResetPassword/ResetPasswordForm.vue";
import ResetPasswordSuccess from "@/components/auth/ResetPassword/ResetPasswordSuccess.vue";
import ResetPasswordFailed from "@/components/auth/ResetPassword/ResetPasswordFailed.vue";
import { FRONTEGG_STORE_KEY } from "@/plugins/fronteggCore/constants";
import { mapState } from "@/plugins/fronteggCore/map-state";
import Spinner from "@/components/Common/Spinner.vue";
import { AuthStateKey } from '@/plugins/fronteggAuth';

export default Vue.extend({
  name: "ForgetPassword",
  components: {
    Spinner,
    ResetPasswordForm,
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
      loading: false,
    };
  },
  computed: {
    isLoading() {
      return this.authState.isLoading || this.loading;
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
    const isAuthenticated = localStorage.getItem(AuthStateKey);
    if(isAuthenticated) {
      this.loading = true;
    }
    this[FRONTEGG_STORE_KEY].dispatch({
      type: "auth/setState",
      payload: {
        isLoading: false,
      },
    });
  },
  beforeRouteEnter(to, from, next) {
    const isAuthenticated = localStorage.getItem(AuthStateKey);
    next(vm => {
      if(isAuthenticated) {
        vm.$router.push(vm.authState.routes.authenticatedUrl);
      }
    })
  }
});
</script>

<style lang="scss">
@import "@/styles/auth/login.scss";

.v-stepper {
  box-shadow: none;
}
.v-stepper__content {
  padding: 0;
}
</style>