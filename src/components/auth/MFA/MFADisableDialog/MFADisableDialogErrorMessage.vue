<template>
  <v-row>
    <v-col cols="12">
      <div class="fe-error-message">
        {{ error }}
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import { AuthState } from '@/plugins/fronteggAuth/Api';
import { mapState } from '@/plugins/fronteggCore/map-state'

export default Vue.extend({
  name: "MFADisableDialogErrorMessage",
  components: {

  },
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
  }
});
</script>
