<template>
  <div v-if="isSocialLoginsConfig" class="fe-col fe-center">
    <Spinner v-if="firstLoad"/>
    <div v-else-if="error" class="fe-error-message">
      {{ error }}
    </div>
    <div v-else>
      <div class="fe-social-login__or-container">
        <span>OR</span>
      </div>
      <GoogleLogin/>
      <GithubLogin/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import GoogleLogin from "./GoogleLogin.vue";
import GithubLogin from "./GithubLogin.vue";
import Spinner from "@/elements/Spinner.vue";
import {ISocialLoginProviderConfiguration} from "@frontegg/rest-api";
import i18n from "@/i18n";

export default Vue.extend({
  name: 'SocialLogins',
  i18n,
  components: {
    GoogleLogin,
    GithubLogin,
    Spinner,
  },
  data() {
    return {
      ...this.mapSocialLoginState(),
    }
  },
  computed: {
    firstLoad() {
      return this.$data.socialLoginState.firstLoad;
    },

    isSocialLoginsConfig() {
      return this.$data.socialLoginState.socialLoginsConfig?.some(({active}: ISocialLoginProviderConfiguration) => active)
    },
    error() {
      return this.$data.socialLoginState.error;
    },
  },
});
</script>
