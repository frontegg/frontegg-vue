<template>
  <div v-if="active" @click="redirect">
    <slot/>
    <SocialLoginButton
      v-if="!hasSlot"
      :name="socialLoginType"
      :action="action"
    >
      <FeIcon :params="{iconName:'github'}"/>
    </SocialLoginButton>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import SocialLoginButton from './SocialLoginButton.vue';
import {ContextHolder, ISocialLoginProviderConfiguration, SocialLoginsProviders} from '@frontegg/rest-api';
import {SocialLoginsActions, UrlCreatorConfigType} from "./types";
import FeIcon from "@/elements/Icons/FeIcon.vue";
import i18n from "@/i18n";

const createGithubUrl = ({clientId, redirectUrl, state}: UrlCreatorConfigType): string => {
  const searchParams: URLSearchParams = new URLSearchParams({
    /* eslint-disable @typescript-eslint/camelcase */
    client_id: clientId,
    redirect_uri: redirectUrl,
    scope: 'read:user user:email',
    state,
  });
  const url: URL = new URL('https://github.com/login/oauth/authorize');
  url.search = searchParams.toString();
  return url.toString();
}

export default Vue.extend({
  name: 'GithubLogin',
  i18n,
  components: {
    FeIcon,
    SocialLoginButton
  },
  data() {
    return {
      ...this.mapSocialLoginState(),
      socialLoginType: SocialLoginsProviders.Github,
      action: SocialLoginsActions.Login,
    }
  },
  computed: {
    hasSlot() {
      return !!this.$slots.default;
    },
    config() {
      return this.$data.socialLoginState.socialLoginsConfig?.find(
        ({type}: ISocialLoginProviderConfiguration) => type.toLowerCase() === SocialLoginsProviders.Github.valueOf().toLowerCase()
      );
    },
    active() {
      return this.$data.socialLoginState.socialLoginsConfig?.find(
        ({type}: ISocialLoginProviderConfiguration) => type.toLowerCase() === SocialLoginsProviders.Github.valueOf().toLowerCase()
      )?.active;
    }
  },
  methods: {
    generateRedirectUrl(): string {
      const redirectUrl = createGithubUrl({
        ...(this as any).config,
        state: JSON.stringify({
          provider: SocialLoginsProviders.Github,
          action: SocialLoginsActions.Login
        }),
      });

      if (!(this as any).active || !redirectUrl) {
        return '';
      }

      return redirectUrl;
    },
    redirect() {
      const redirectUrl = (this as any).generateRedirectUrl();
      if (redirectUrl.length) {
        ContextHolder.onRedirectTo(redirectUrl, {replace: true, refresh: true})
      }
    }
  },
});
</script>
