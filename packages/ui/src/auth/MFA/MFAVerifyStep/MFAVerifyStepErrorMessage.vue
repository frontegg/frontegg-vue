<template>
  <div class="fe-error-message">
    {{ error }}
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "MFAVerifyStepErrorMessage",
  data() {
    return {
      ...this.mapMfaState(),
    }
  },
  computed: {
    error() {
      return this.$data.mfaState.error;
    },
  },
});
</script>
