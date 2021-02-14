

<template>
  <div class="fe-error-message">
    {{ error }}
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from '@/plugins/fronteggCore/map-state'
import { AuthState } from '@/plugins/fronteggAuth/Api';

export default Vue.extend({
  name: "MFAVerifyStepErrorMessage",
  data() {
    return {
      ...mapState(this, {
        mfaState: (state: { auth: AuthState }) => state.auth.mfaState,
      }),
    }
  },
  computed: {
    error() {
      return this.mfaState.error;
    },
  },
});
</script>

<style lang="scss">

</style>