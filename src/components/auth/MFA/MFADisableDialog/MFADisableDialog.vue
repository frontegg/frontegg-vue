<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="600" class="fe-mfa-dialog">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          {{ $t('auth.mfa.disable-button') }}
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">
          {{ $t("auth.mfa.disable-title") }}
        </v-card-title>
        <MFADisableDialogMessage />
        <MFADisableDialogForm />
        <MFADisableDialogErrorMessage />
        <MFADisableDialogFooter />
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import MFADisableDialogMessage from "./MFADisableDialogMessage.vue";
import MFADisableDialogFooter from "./MFADisableDialogFooter.vue";
import MFADisableDialogForm from "./MFADisableDialogForm.vue";
import MFADisableDialogErrorMessage from "./MFADisableDialogErrorMessage.vue";
import { AuthState } from "@/plugins/fronteggAuth/Api";
import { mapState } from "@/plugins/fronteggCore/map-state";

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
    };
  },
  computed: {},
});
</script>

<style lang="scss">
</style>