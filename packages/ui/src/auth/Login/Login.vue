<template>
  <div class="fe-login-page">
    <v-container class="fe-login-container">
      <div class="fe-login-header">
        <img v-bind:src="headerImage">
      </div>
      <div class="fe-login-component">
        <div v-if="currentStep === LoginStep.preLogin || currentStep === LoginStep.loginWithPassword">
          <LoginWithPassword/>
          <SocialLogins/>
        </div>
        <div v-else-if="currentStep === LoginStep.loginWithTwoFactor">
          <LoginWithTwoFactor/>
        </div>
        <div v-else-if="currentStep === LoginStep.recoverTwoFactor">-->
          <RecoverTwoFactor/>
        </div>
        <div v-else-if="currentStep === LoginStep.redirectToSSO">
          <RedirectToSSO/>
        </div>
        <div v-else-if="currentStep === LoginStep.loginWithSSOFailed">
          <LoginWithSSOFailed/>
        </div>
        <div v-else-if="currentStep === LoginStep.forceTwoFactor">
          <ForceEnrollMfa/>
        </div>
        <div v-else-if="currentStep === LoginStep.success">
          <LoginSuccess/>
        </div>
      </div>

      <button
        v-if="showBackBtn"
        class="fe-login-component__back-to-login"
        @click=""
      >
        Back to Login
      </button>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {LoginStep} from "@frontegg/redux-store/auth";
import i18n from '@/i18n';
import Spinner from "@/elements/Spinner.vue";
import LoginWithPassword from "@/auth/Login/LoginWithPassword.vue";
import SocialLogins from "@/auth/SocialLogins/SocialLogins.vue";
import RedirectToSSO from '@/auth/Login/RedirectToSSO.vue';
import LoginWithSSOFailed from '@/auth/Login/LoginWithSSOFailed.vue';
import ForceEnrollMfa from '@/auth/Login/ForceEnrollMfa.vue';
import LoginSuccess from '@/auth/Login/LoginSuccess.vue';
import LoginWithTwoFactor from '@/auth/Login/LoginWithTwoFactor.vue';
import RecoverTwoFactor from '@/auth/Login/RecoverTwoFactor.vue'

export default Vue.extend({
  name: 'Login',
  i18n,
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
      LoginStep,
      ...this.mapAuthState(),
      ...this.mapLoginState()
    }
  },
  computed: {
    showBackBtn() {
      return [LoginStep.loginWithSSOFailed, LoginStep.forceTwoFactor, LoginStep.recoverTwoFactor].includes(this.$data.loginState.step);
    },
    currentStep() {
      return this.$data.loginState.step || LoginStep.preLogin;
    },
    headerImage() {
      return this.$data.authState.header || 'https://assets.frontegg.com/public-frontegg-assets/logo-transparent.png';
    },
    isAuthenticated() {
      return this.$data.authState.isAuthenticated;
    },
  },
  methods: {
    backToLogin() {
      this.$router.push(this.fronteggAuth.routes.loginUrl);
    },
  },
  // beforeRouteEnter(to, from, next) {
  //   to
  //   from
  //   next(vm => {
  //     const isAuthenticated = vm.$data.isAuthenticated;
  //     if(isAuthenticated) {
  //       vm.$nextTick(() => {
  //         vm.$router.push(vm.$data.authState.routes.authenticatedUrl);
  //       })
  //     }
  //   })
  // },
});
</script>

<style lang="scss">
@import '../../styles/auth/auth.scss';
</style>
