<template>
  <FButton
    :params="{
      class: `fe-social-login__button fe-social-login__button__${name.toLowerCase()}`,
      fullWidth: true,
      'data-test-id': `${name.toLowerCase()}SocialLogin-btn`
    }"
  >
    <div class="fe-row fe-center">
      <slot />
      <div>{{ $t(`auth.social-logins.${action.toLowerCase()}.button-text`, { providerName }) }}</div>
    </div>
  </FButton>
</template>

<script lang="ts">
import Vue from 'vue'
import FButton from "@/elements/Button/FButton.vue";
import i18n from "@/i18n";

export default Vue.extend({
  name: 'SocialLoginButton',
  i18n,
  components: {
    FButton,
  },
  props: {
    name: {
      type: String,
      required: true
    },
    action: {
      type: String,
      required: true
    }
  },
  computed: {
    providerName() {
      return this.name.charAt(0).toUpperCase() + this.name.slice(1);
    }
  },
});
</script>
