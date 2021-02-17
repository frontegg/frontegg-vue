<template>
  <FButton
  :params="{
    class: `fe-social-login__button fe-social-login__button__${name.toLowerCase()}`,
    fullWidth: true,
    'data-test-id': `${name.toLowerCase()}SocialLogin-btn`
  }"
    >
      <div className={'fe-row fe-center'}>
        <slot></slot>
        <div>{{ $t(`auth.social-logins.${action.toLowerCase()}.button-text`, { providerName }) }}</div>
      </div>
  </FButton>
</template>

<script lang="ts">
import Vue from 'vue'
import FButton from "@/components/core/elements/Button/FButton.vue";

export default Vue.extend({
  name: 'SocialLoginButton',
  components: {
    FButton,
  },
  data() {
    return {
      
    }
  },
});
</script>