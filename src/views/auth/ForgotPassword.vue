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
import { AuthState, ForgotPasswordState, ForgotPasswordStep } from "@/plugins/fronteggAuth/Api";
import ForgotPasswordForm from "@/components/auth/ForgotPassword/ForgotPasswordForm.vue";
import ForgotPasswordSuccess from "@/components/auth/ForgotPassword/ForgotPasswordSuccess.vue";
import { FRONTEGG_STORE_KEY } from "@/plugins/fronteggCore/constants";
import { mapState } from "@/plugins/fronteggCore/map-state";
import Spinner from "@/components/Common/Spinner.vue";

export default Vue.extend({
  name: "ForgetPassword",
  components: {
    Spinner,
    ForgotPasswordForm,
    ForgotPasswordSuccess,
  },
  data() {
    return {
      ...mapState(this, {
        authState: (state: { auth: AuthState }) =>
          state.auth,
      }),
      forgotPasswordStep: ForgotPasswordStep,
    };
  },
  computed: {
    isLoading() {
      return this.authState.isLoading;
    },
    showBackBtn() {
      return this.forgotPasswordStep.success === this.currentStep;
    },
    currentStep: {
      get() {
        return this.authState.forgotPasswordState.step || this.forgotPasswordStep.forgotPassword;
      },
      set(value) {
        console.log("value", value)
      }
    },
  },
  mounted() {
    this[FRONTEGG_STORE_KEY].dispatch({
      type: 'auth/setState',
      payload: {
        isLoading: false,
      }
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
@import '@/styles/login.scss';

.v-stepper {
  box-shadow: none;
}
.v-stepper__content {
  padding: 0;
}
</style>