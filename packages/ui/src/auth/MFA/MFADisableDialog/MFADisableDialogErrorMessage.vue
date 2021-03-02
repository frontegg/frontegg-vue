<template>
  <v-row v-if="error">
    <v-col cols="12">
      <div class="fe-error-message">
        {{ error }}
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "MFADisableDialogErrorMessage",
  data() {
    return {
      ...this.mapMfaState(),
    }
  },
  computed: {
    error() {
      return this.$data.mfaState.error;
    },
  }
});
</script>
