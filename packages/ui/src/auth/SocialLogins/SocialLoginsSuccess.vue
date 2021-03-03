<template>
  <div class="fe-login-page">
    <v-container class="fe-login-container">
      <div class="fe-login-header">
        <img v-bind:src="headerImage">
      </div>
      <div v-if="isLoading" class="fe-relative fe-mt-3">
        <spinner/>
      </div>
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
import {ISocialLoginCallbackState, SocialLoginsActions} from './types';
import FButton from "@/elements/Button/FButton.vue";
import Spinner from "@/elements/Spinner.vue";
import i18n from "@/i18n";
import {mapSocialLoginActions} from "@frontegg/vue-core/auth";

export default Vue.extend({
  name: 'SocialLoginsSuccess',
  i18n,
  components: {
    Spinner,
    FButton,
  },
  data() {
    return {
      ...this.mapAuthState(),
      ...this.mapSocialLoginState(),
    }
  },
  computed: {
    isLoading(): boolean {
      return Boolean(this.socialLoginState.firstLoad || this.socialLoginState.loading);
    },
    errorMsg(): string {
      return this.$t('auth.social-logins.error.invalid-callback-url') as string;
    },
    error(): any {
      return this.socialLoginState.error;
    },
    headerImage(): string {
      return this.authState.header || 'https://assets.frontegg.com/public-frontegg-assets/logo-transparent.png';
    },
  },
  mounted() {
    const params: URLSearchParams = new URLSearchParams(location.search);
    const state = params.get('state');
    const code = params.get('code');
    let parsedState: ISocialLoginCallbackState;

    if (!state || !code) {
      this.setSocialLoginError({error: this.errorMsg});
    }

    try {
      parsedState = JSON.parse(state ?? '');
    } catch (e) {
      this.setSocialLoginError({error: this.errorMsg});
      return
    }

    if (!parsedState.action || !parsedState.provider) {
      this.setSocialLoginError({error: this.errorMsg});
    }

    switch (parsedState.action) {
      case SocialLoginsActions.Login:
      case SocialLoginsActions.SignUp:
        this.loginViaSocialLogin({code: code!, ...parsedState});
        break;
      default:
        this.setSocialLoginError({error: this.errorMsg});
    }
  },
  methods: {
    setSocialLoginError: mapSocialLoginActions('setSocialLoginError'),
    loginViaSocialLogin: mapSocialLoginActions('loginViaSocialLogin'),
    backToLogin() {
      this.$router.push(this.authState.routes.loginUrl);
    },
  },
});
</script>
<style lang="scss">
@import '../../styles/auth/auth.scss';
</style>
