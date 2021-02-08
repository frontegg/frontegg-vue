<template>
  <div class="fe-login-page">
    <spinner v-if="isLoading"></spinner>
    <v-container class="fe-login-container" v-else>
      <div class="fe-login-header">
        <img src="../assets/main-logo.svg" />
      </div>
      <v-stepper v-model="currentStep">
        <v-stepper-items>
          <v-stepper-content :step="forgotPasswordStep.forgotPassword">
            <div class="fe-forgot-password-component">
              <FotgotPassword />
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
            @click="
              onRedirectTo(routes.loginUrl);
              resetLoginState();
            "
          >
            Back to Login
          </button>
        </v-stepper-items>
      </v-stepper>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { AuthState, ForgotPasswordState, ForgotPasswordStep } from "@/plugins/fronteggAuth/Api";
import FotgotPassword from "@/components/ForgotPassword/ForgotPassword.vue";
import ForgotPasswordSuccess from "@/components/ForgotPassword/ForgotPasswordSuccess.vue";
import { FRONTEGG_STORE_KEY } from "@/plugins/fronteggCore/constants";
import { mapState } from "@/plugins/fronteggCore/map-state";
import Spinner from "@/components/Common/Spinner.vue";

export default Vue.extend({
  name: "ForgetPasswordPage",
  components: {
    Spinner,
    FotgotPassword,
    ForgotPasswordSuccess,
  },
  data() {
    return {
      ...mapState(this, {
        authState: (state: { auth: AuthState }) =>
          state.auth,
      }),
      forgotPasswordStep: ForgotPasswordStep,
      currentStep: '',
    };
  },
  computed: {
    isLoading() {
      return this.authState.isLoading;
    },
    showBackBtn() {
      return this.forgotPasswordStep.success === this.currentStep;
    },
  },
  mounted() {
    console.log('authState', this.forgotPasswordStep)
    this.currentStep = this.authState.forgotPasswordState.step || this.forgotPasswordStep.forgotPassword;

    this[FRONTEGG_STORE_KEY].dispatch({
      type: 'auth/setState',
      payload: {
        isLoading: false,
      }
    });
  },
  methods: {
    resetLoginState() {
      console.log('resetLoginState');
    }
  },
});
</script>

<style lang="scss">
.fe-login-page {
  position: absolute;
  top: 0;
  left: 0;
  background: var(--fe-auth-background, var(--color-white));
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 500px;
  overflow: auto;
}

.fe-login-container {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  max-width: 90%;
  min-height: 300px;
  box-shadow: 0 1.4px 4.5px rgba(0, 0, 0, 0.016),
    0 4.3px 12.5px rgba(0, 0, 0, 0.032), 0 10.3px 30.1px rgba(0, 0, 0, 0.055),
    0 29px 100px rgba(0, 0, 0, 0.14);
  background: var(--fe-auth-container-background, var(--color-white));
  border-radius: var(--fe-auth-container-border-radius, 0.5rem);
  padding: var(--fe-auth-container-paddig, 2rem);
  width: var(--fe-auth-container-width, 400px);
}

.fe-login-header {
  display: flex;
  justify-content: center;
  margin: 1rem 0 3rem;
  align-items: center;
  overflow-x: hidden;

  > * {
    max-width: 100%;
    max-height: 50px;
  }
}

@media screen and (max-width: 400px) {
  .fe-login-page {
    padding-top: 10vh;
    justify-content: flex-start;

    .fe-login-container {
      box-shadow: none;
    }
  }
}
</style>

<style scoped>
.v-stepper {
  box-shadow: none;
}
.v-stepper__content {
  padding: 0;
}
</style>