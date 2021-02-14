

<template>
  <div class='fe-section-title'>
    {{ $t('auth.mfa.verify.message') }}
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "MFAVerifyStepMessage",
});
</script>
