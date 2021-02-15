<template>
  <div class='fe-section-title'>
    <slot></slot>
    <span v-if="!hasSlot">
      {{ $t('auth.mfa.verify.message') }}
    </span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "MFAVerifyStepMessage",
  computed: {
    hasSlot() {
      return !!this.$slots.default;
    }
  }
});
</script>
