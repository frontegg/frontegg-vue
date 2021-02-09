<template>
  <div class="fe-login-page">
    <spinner v-if="isLoading" />
    <v-container
      v-else
      class="fe-login-container"
    >
      <div class="fe-login-header">
        <img src="../assets/main-logo.svg">
      </div>
      <div class="fe-login-component" v-if="currentStep === LoginStep.preLogin || currentStep === LoginStep.loginWithPassword">
        <LoginWithPassword />
        <SocialLogins />
      </div>

      <v-stepper v-model="currentStep" v-else>
        <v-stepper-items>
          <v-stepper-content :step="LoginStep.success">
            <LoginSuccess />
          </v-stepper-content>
          <button
            v-if="showBackBtn"
            class="fe-login-component__back-to-login"
            @click="backToLogin()"
          >
            {{ $t('auth.login.back-to-login') }}
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
import LoginSuccess from "@/components/Login/LoginSuccess.vue";
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
    LoginSuccess,
  },
  data() {
    return {
      ...mapState(this, {
        authState: (state: { auth: AuthState }) => state.auth,
      }),
      LoginStep: LoginStep,
    }
  },
  computed: {
    showBackBtn() {
      return [LoginStep.loginWithSSOFailed, LoginStep.forceTwoFactor, LoginStep.recoverTwoFactor].includes(this.currentStep);
    },
    isLoading() {
      return this.authState.isLoading;
    },
    currentStep: {
      get() {
        return this.authState.loginState.step || this.LoginStep.preLogin;
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
@import '../styles/login.scss';
.v-stepper {
  box-shadow: none;
}
.v-stepper__content {
  padding: 0;
}
</style>
