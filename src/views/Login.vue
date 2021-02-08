<template>
  <div class="fe-login-page">
    <spinner v-if="isLoading"></spinner>
    <v-container class="fe-login-container" v-else>
      <div class="fe-login-header">
        <img src="../assets/main-logo.svg" />
      </div>
      <v-stepper v-model="currentStep">
        <v-stepper-items>
          <v-stepper-content :step="LoginStep.preLogin">
            <div class="fe-login-component">
              <LoginWithPassword />
              <SocialLogins />
            </div>
          </v-stepper-content>

          <v-stepper-content :step="LoginStep.loginWithPassword">
            <div class="fe-login-component">
              <LoginWithPassword />
              <SocialLogins />
            </div>
          </v-stepper-content>

          <v-stepper-content :step="LoginStep.success">
            <spinner></spinner>
              success
          </v-stepper-content>

          <v-stepper-content :step="LoginStep.recoverTwoFactor">
              recoverTwoFactor
          </v-stepper-content>
          <button
            v-if="showBackBtn"
            class='fe-login-component__back-to-login'
            @click="onRedirectTo(routes.loginUrl); resetLoginState();"
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
import LoginWithPassword from "@/components/Login/LoginWithPassword.vue";
import SocialLogins from "@/components/Login/SocialLogins.vue";
import { AuthState, LoginStep } from '@/plugins/fronteggAuth/Api';
import { FRONTEGG_STORE_KEY } from '@/plugins/fronteggCore/constants';
import { mapState } from '@/plugins/fronteggCore/map-state'
import Spinner from '@/components/Common/Spinner.vue'

export default Vue.extend({
  name: "Login",
  components: {
    Spinner,
    LoginWithPassword,
    SocialLogins,
  },
  data() {
    return {
      ...mapState(this, {
        authState: (state: { auth: AuthState }) => state.auth,
      }),
      LoginStep: LoginStep,
      currentStep: '',
    }
  },
  computed: {
    showBackBtn() {
      return [LoginStep.loginWithSSOFailed, LoginStep.forceTwoFactor, LoginStep.recoverTwoFactor].includes(this.currentStep);
    },
    isLoading() {
      return this.authState.isLoading;
    },
  },
  mounted() {
    this.currentStep = this.authState.loginState.step || this.LoginStep.preLogin;

    this[FRONTEGG_STORE_KEY].dispatch({
      type: 'auth/setState',
      payload: {
        isLoading: false,
      }
    });
  }
});
</script>

<style lang="scss">
@import '../styles/login.scss';
.v-stepper {
  box-shadow: none;
}
.v-stepper__content {
  padding: 0;
}
</style>
