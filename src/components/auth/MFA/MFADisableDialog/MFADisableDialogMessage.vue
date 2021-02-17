<template>
  <v-row>
    <v-col cols="12">
      <div class='fe-section-title'>{{ $t('auth.mfa.disable.message') }}</div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "MFADisableDialogMessage",
});
</script>
