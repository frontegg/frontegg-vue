<template>
  <div class="fe-login-page">
    <v-container class="fe-login-container">
      <div class="fe-login-header">
        <img v-bind:src="headerImage">
      </div>
      <Spinner v-if="isLoading" />
      <div
        v-if="!isLoading"
        class="fe-error-message"
      >
        {{ error }}
      </div>
      <FButton
        v-if="!isLoading"
        :params="{
          type: 'button',
          fullWidth: true,
        }"
        @click="backToLogin()"
      >
        {{ $t('auth.login.back-to-login') }}
      </FButton>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { ISocialLoginCallbackState, SocialLoginsActions } from './types';
import FButton from "@/elements/Button/FButton.vue";
import Spinner from "@/elements/Spinner.vue";
import i18n from "@/i18n";

export default Vue.extend({
  name: 'SocailLoginsSuccess',
  i18n,
  components: {
    Spinner,
    FButton,
  },
  data() {
    return {
      ...this.mapSocialLoginState(),
      ...this.mapAuthState(),
    }
  },
  computed: {
    isLoading() {
      return this.$data.socialLoginsState.firstLoad || this.authState.socialLoginsState.loading;
    },
    errorMsg() {
      return this.$t('auth.social-logins.error.invalid-callback-url');
    },
    error() {
      return this.authState.socialLoginsState.error;
    },
    headerImage() {
      return this.$data.authState.header || 'https://assets.frontegg.com/public-frontegg-assets/logo-transparent.png';
    },
  },
  mounted() {
    const params: URLSearchParams = new URLSearchParams(location.search);
    const state = params.get('state');
    const code = params.get('code');
    let parsedState: ISocialLoginCallbackState;

    if (!state || !code) {
      this.setSocialLoginError({ error: this.errorMsg });
    }

    try {
      parsedState = JSON.parse(state);
    } catch (e) {
      this.setSocialLoginError({ error: this.errorMsg });
    }

    if (!parsedState.action || !parsedState.provider) {
      this.setSocialLoginError({ error: this.errorMsg });
    }

    switch (parsedState.action) {
      case SocialLoginsActions.Login:
      case SocialLoginsActions.SignUp:
        this.loginViaSocialLogin({ code, ...parsedState });
        break;
      default:
        this.setSocialLoginError({ error: this.errorMsg });
    }
  },
  methods: {
    backToLogin() {
      this[FRONTEGG_STORE_KEY].dispatch({
        type: "auth/resetActivateState",
      });
      this.$router.push(this.authState.routes.loginUrl);
    },
    setSocialLoginError(payload) {
      // this[FRONTEGG_STORE_KEY].dispatch({
      //   type: "auth/setSocialLoginError",
      //   payload
      // });
    },
    loginViaSocialLogin(payload) {
      // this[FRONTEGG_STORE_KEY].dispatch({
      //   type: "auth/loginViaSocialLogin",
      //   payload
      // });
    },
  },
});
</script>
<style lang="scss">
@import '@/styles/auth/auth.scss';
</style>
