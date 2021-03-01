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
        <!--        <div v-else-if="currentStep === LoginStep.recoverTwoFactor">-->
        <!--          <RecoverTwoFactor/>-->
        <!--        </div>-->
        <!--        <div v-else-if="currentStep === LoginStep.redirectToSSO">-->
        <!--          <RedirectToSSO/>-->
        <!--        </div>-->
        <!--        <div v-else-if="currentStep === LoginStep.loginWithSSOFailed">-->
        <!--          <LoginWithSSOFailed/>-->
        <!--        </div>-->
        <!--        <div v-else-if="currentStep === LoginStep.forceTwoFactor">-->
        <!--          <ForceEnrollMfa/>-->
        <!--        </div>-->
        <!--        <div v-else-if="currentStep === LoginStep.success">-->
        <!--          <LoginSuccess/>-->
        <!--        </div>-->
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
import LoginWithTwoFactor from "@/auth/Login/LoginWithTwoFactor.vue";

export default Vue.extend({
  name: 'Login',
  i18n,
  components: {
    Spinner,
    LoginWithPassword,
    // RedirectToSSO,
    // LoginWithSSOFailed,
    // ForceEnrollMfa,
    SocialLogins,
    // LoginSuccess,
    LoginWithTwoFactor,
    // RecoverTwoFactor,
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
  },
  methods: {
    backToLogin() {
      this.$router.push(this.fronteggAuth.routes.loginUrl);
    },
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

.fe-login-header {
  display: flex;
  justify-content: center;
  margin: 1rem 0 3rem;
  align-items: center;
  overflow-x: hidden;

  > * {
    max-width: 100%;
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
