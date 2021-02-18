<template>
  <div data-app class="fe-login-page">
    <spinner v-if="isLoading" />
    <v-container
      v-else
      class="fe-login-container"
    >
      <div class="fe-login-header">
        <img src="@/assets/main-logo.svg">
      </div>
      <div class="fe-login-component">
        <div v-if="currentStep === LoginStep.preLogin || currentStep === LoginStep.loginWithPassword">
          <LoginWithPassword />
          <SocialLogins />
        </div>
        <div v-else-if="currentStep === LoginStep.loginWithTwoFactor">
          <LoginWithTwoFactor />
        </div>
        <div v-else-if="currentStep === LoginStep.recoverTwoFactor">
          <RecoverTwoFactor />
        </div>
        <div v-else-if="currentStep === LoginStep.redirectToSSO">
          <RedirectToSSO />
        </div>
        <div v-else-if="currentStep === LoginStep.loginWithSSOFailed">
          <LoginWithSSOFailed />
        </div>
        <div v-else-if="currentStep === LoginStep.forceTwoFactor">
          <ForceEnrollMfa />
        </div>
        <div v-else-if="currentStep === LoginStep.success">
          <LoginSuccess />
        </div>
      </div>
      <button
        v-if="showBackBtn"
        class="fe-login-component__back-to-login"
        @click="backToLogin()"
      >
        {{ $t('auth.login.back-to-login') }}
      </button>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import LoginWithPassword from '@/components/auth/Login/LoginWithPassword.vue';
import SocialLogins from '@/components/auth/SocialLogins/SocialLogins.vue';
import RedirectToSSO from '@/components/auth/Login/RedirectToSSO.vue';
import LoginWithSSOFailed from '@/components/auth/Login/LoginWithSSOFailed.vue';
import ForceEnrollMfa from '@/components/auth/Login/ForceEnrollMfa.vue';
import LoginSuccess from '@/components/auth/Login/LoginSuccess.vue';
import LoginWithTwoFactor from '@/components/auth/Login/LoginWithTwoFactor.vue';
import RecoverTwoFactor from '@/components/auth/Login/RecoverTwoFactor.vue'
import { AuthState, LoginStep } from '@/plugins/fronteggAuth/Api';
import { FRONTEGG_STORE_KEY } from '@/plugins/fronteggCore/constants';
import { mapState } from '@/plugins/fronteggCore/map-state'
import Spinner from '@/components/Common/Spinner.vue'

export default Vue.extend({
  name: 'Login',
  components: {
    Spinner,
    LoginWithPassword,
    RedirectToSSO,
    LoginWithSSOFailed,
    ForceEnrollMfa,
    SocialLogins,
    LoginSuccess,
    LoginWithTwoFactor,
    RecoverTwoFactor,
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
@import '@/styles/auth/auth.scss';
</style>
