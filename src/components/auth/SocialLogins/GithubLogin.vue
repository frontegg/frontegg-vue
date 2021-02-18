<template>
  <div @click="redirect">
    <slot />
    <SocialLoginButton
      v-if="!hasSlot"
      :name="socialLoginType"
      :action="action"
    >
      <FeIcon :params="{iconName:'github'}" />
    </SocialLoginButton>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import SocialLoginButton from './SocialLoginButton.vue';
import { UrlCreatorConfigType, SocialLoginsProviders, SocialLoginsActions, ISocialLoginCallbackState } from './types';
import FeIcon from "@/components/core/elements/Icons/FeIcon.vue";
import { ContextHolder } from '@frontegg/rest-api';
import { mapState } from '@/plugins/fronteggCore/map-state'

export default Vue.extend({
  name: 'GithubLogin',
  components: {
    FeIcon,
    SocialLoginButton
  },
  data() {
    return {
      ...mapState(this, {
        socialLoginsState: (state: { auth: AuthState }) => state.auth.socialLoginsState,
      }),
      socialLoginType: SocialLoginsProviders.Github,
      action: SocialLoginsActions.Login,
    }
  },
  computed: {
    hasSlot() {
      return !!this.$slots.default;
    },
    config() {
      return this.socialLoginsState.socialLoginsConfig?.find(({ type }) => type.toLowerCase() === this.socialLoginType.toLowerCase());
    },
  },
  methods: {
    createGithubUrl({ clientId, redirectUrl, state }: UrlCreatorConfigType): string {
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
    },
    createSocialLoginState(state: ISocialLoginCallbackState): string {
      return JSON.stringify(state);
    },
    redirectUrl(): string {
      const redirectUrl = this.createGithubUrl({
        ...this.config,
        state: this.createSocialLoginState({ provider: this.socialLoginType, action: this.action }),
      });

      if (!this.config?.active || !redirectUrl) {
        return '';
      }

      return redirectUrl;
    },
    redirect() {
      if(this.redirectUrl().length) {
        ContextHolder.onRedirectTo(this.redirectUrl(), { replace: true, refresh: true })
      }
    }
  },
});
</script>