<template>
  <v-row>
    <v-col cols="12">
      <MFADisableDialogMessage />
      <MFADisableDialogForm />
      <MFADisableDialogErrorMessage />
      <MFADisableDialogFooter />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import MFADisableDialogMessage from './MFADisableDialogMessage.vue';
import MFADisableDialogFooter  from './MFADisableDialogFooter.vue';
import MFADisableDialogForm from './MFADisableDialogForm.vue';
import MFADisableDialogErrorMessage from './MFADisableDialogErrorMessage.vue';
import { AuthState } from '@/plugins/fronteggAuth/Api';
import { mapState } from '@/plugins/fronteggCore/map-state'

export default Vue.extend({
  name: "MFADisableDialog",
  components: {
    MFADisableDialogMessage,
    MFADisableDialogFooter,
    MFADisableDialogForm,
    MFADisableDialogErrorMessage,
  },
  data() {
    return {
      ...mapState(this, {
        mfaState: (state: { auth: AuthState }) => state.auth.mfaState,
      }),
    }
  },
  computed: {

  }
});
</script>

<style lang="scss">
</style>