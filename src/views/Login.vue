<template>
  <div class="fe-login-page">
    <spinner v-if="isLoading"></spinner>
    <v-container class="fe-login-container" v-else>
      <div class="fe-login-header">
        <img src="../assets/main-logo.svg" />
      </div>
      <div class="fe-login-component">
        <v-stepper v-model="loginStepper">
          <v-stepper-items>
            <v-stepper-content v-if="loginStepper === LoginStep.preLogin || loginStepper === LoginStep.loginWithPassword" :step="loginStepper">
              <LoginWithPassword />
              <SocialLogins />
            </v-stepper-content>

            <v-stepper-content :step="LoginStep.success">
                success component
            </v-stepper-content>

            <v-stepper-content :step="LoginStep.recoverTwoFactor">
                recoverTwoFactor
            </v-stepper-content>
            <Button
              v-if="showBackBtn"
              class='fe-login-component__back-to-login'
              @click="onRedirectTo(routes.loginUrl); resetLoginState();"
            >
              Back to Login
            </Button>
          </v-stepper-items>
        </v-stepper>
      </div>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import LoginWithPassword from "@/components/Login/LoginWithPassword.vue";
import SocialLogins from "@/components/Login/SocialLogins.vue";
import { AuthState, LoginStep } from '@/plugins/fronteggAuth/Api';
import { FRONTEGG_STORE_KEY } from '@/plugins/fronteggCore/constants';
import {mapData} from '@/plugins/fronteggCore/map-state'
import Spinner from '@/components/Common/Spinner.vue'

export default Vue.extend({
  name: "Home",
  components: {
    Spinner,
    LoginWithPassword,
    SocialLogins,
  },
  data() {
    return {
      ...mapData(this, {
        authState: (state: { auth: AuthState }) => state.auth,
      }),
      LoginStep: LoginStep,
      loginStepper: 'preLogin',
    }
  },
  computed: {
    showBackBtn() {
      return [LoginStep.loginWithSSOFailed, LoginStep.forceTwoFactor, LoginStep.recoverTwoFactor].includes(this.loginStepper);
    },
    isLoading() {
      return this.authState.isLoading;
    },
  },
  mounted() {
    console.log(this.$data)
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
</style>
