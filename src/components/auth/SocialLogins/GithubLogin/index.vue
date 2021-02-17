<template>
  <div @click="FronteggContext.onRedirectTo(redirectUrl, { replace: true, refresh: true })">
    <slot>
    </slot>
    <SocialLoginButton v-if="!hasSlot" name={SocialLoginsProviders.Github} action={action}>
      <GithubIcon />
    </SocialLoginButton>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import SocialLoginButton from '../SocialLoginButton';
import GithubIcon from './GithubIcon';
import { FronteggContext, SocialLoginsProviders } from '@frontegg/rest-api';

export default Vue.extend({
  name: 'GithupLogin',
  components: {
    GithubIcon,
    SocialLoginButton
  },
  data() {
    return {
      
    }
  },
  computed: {
    hasSlot() {
      return !!this.$slots.default;
    }
  },
  methods: {
  },
});
</script>