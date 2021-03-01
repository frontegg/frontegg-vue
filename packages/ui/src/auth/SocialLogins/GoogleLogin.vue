<template>
  <div
    v-if="active"
    @click="redirect"
  >
    <slot/>
    <SocialLoginButton
      v-if="!hasSlot"
      :name="socialLoginType"
      :action="action"
    >
      <FeIcon :params="{iconName:'google'}"/>
    </SocialLoginButton>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import SocialLoginButton from './SocialLoginButton.vue';
import {UrlCreatorConfigType, SocialLoginsProviders, SocialLoginsActions} from './types';
import {ContextHolder, ISocialLoginProviderConfiguration} from '@frontegg/rest-api';
import FeIcon from "@/elements/Icons/FeIcon.vue";
import i18n from "@/i18n";

const createGoogleUrl = ({clientId, redirectUrl, state}: UrlCreatorConfigType): string => {
  const searchParams: URLSearchParams = new URLSearchParams({
    /* eslint-disable @typescript-eslint/camelcase */
    client_id: clientId,
    redirect_uri: redirectUrl,
    response_type: 'code',
    include_granted_scopes: 'true',
    scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
    state,
  });
  const url: URL = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  url.search = searchParams.toString();
  return url.toString();
};

export default Vue.extend({
  name: 'GoogleLogin',
  i18n,
  components: {
    FeIcon,
    SocialLoginButton
  },
  data() {
    return {
      ...this.mapSocialLoginState(),
      socialLoginType: SocialLoginsProviders.Google,
      action: SocialLoginsActions.Login,
    }
  },
  computed: {
    hasSlot() {
      return !!this.$slots.default;
    },
    config() {
      return this.$data.socialLoginState.socialLoginsConfig?.find(
        ({type}: ISocialLoginProviderConfiguration) => type.toLowerCase() === SocialLoginsProviders.Google.toLowerCase()
      );
    },
    active() {
      return this.$data.socialLoginState.socialLoginsConfig?.find(
        ({type}: ISocialLoginProviderConfiguration) => type.toLowerCase() === SocialLoginsProviders.Google.toLowerCase()
      )?.active;
    }
  },
  methods: {
    generatedRedirectUrl(): string {
      const redirectUrl = createGoogleUrl({
        ...this.$data.config,
        state: JSON.stringify({
          provider: SocialLoginsProviders.Google,
          action: SocialLoginsActions.Login
        }),
      } as UrlCreatorConfigType);

      if (!this.$data.active || !redirectUrl) {
        return '';
      }

      return redirectUrl;
    },
    redirect() {
      const redirectUrl = (this as any).generatedRedirectUrl();
      if (redirectUrl.length) {
        ContextHolder.onRedirectTo(redirectUrl, {replace: true, refresh: true})
      }
    }
  },
});
</script>
