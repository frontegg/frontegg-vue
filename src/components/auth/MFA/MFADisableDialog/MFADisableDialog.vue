<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="600">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          {{ $t("auth.mfa.disable-button") }}
        </v-btn>
      </template>
      <v-card class="fe-dialog-content">
        <button type="button" aria-label="Close" class="fe-dialog-close">
          <span class="fe-dialog-close-x"></span>
        </button>
        <v-card-title class="fe-dialog-header">
          {{ $t("auth.mfa.disable-title") }}
        </v-card-title>
        <v-card-text class="fe-dialog-body">
          <v-form
            v-model="isFormValid"
            class="fe-form"
            @submit.prevent="disableMfa"
          >
            <MFADisableDialogMessage />
            <MFADisableDialogForm />
            <MFADisableDialogErrorMessage />
            <MFADisableDialogFooter :isFormValid="isFormValid" />
          </v-form>
        </v-card-text>
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
      isFormValid: false,
      dialog: false,
    };
  },
  computed: {},
  methods: {
    disableMfa() {
      // 
    },
  }
});
</script>

<style lang="scss">
</style>