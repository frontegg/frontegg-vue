<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      max-width="600"
      :persistent="true"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          {{ $t("auth.mfa.disable-button") }}
        </v-btn>
      </template>
      <v-card class="fe-dialog-content">
        <button
          type="button"
          aria-label="Close"
          class="fe-dialog-close"
          @click="closeDialog"
        >
          <span class="fe-dialog-close-x" />
        </button>
        <v-card-title class="fe-dialog-header">
          <div
            id="rcDialogTitle0"
            class="fe-dialog-title"
          >
            {{ $t("auth.mfa.disable-title") }}
          </div>
        </v-card-title>
        <v-card-text class="fe-dialog-body">
          <v-form
            v-model="isFormValid"
            class="fe-form"
            @submit.prevent="disableMfa"
          >
            <MFADisableDialogMessage />
            <MFADisableDialogForm v-model="token" />
            <MFADisableDialogErrorMessage />
            <MFADisableDialogFooter
              :is-form-valid="isFormValid"
              @close-dialog="closeDialog"
            />
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
import {mapMfaActions} from "@frontegg/vue-core/auth";

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
      isFormValid: false,
      dialog: false,
      token: ''
    };
  },
  computed: {},
  methods: {
    _disableMfa: mapMfaActions('disableMfa'),
    disableMfa() {
      this._disableMfa({
        token: this.$data.token,
      });
    },
    closeDialog() {
      this.$data.dialog = false;
    }
  }
});
</script>

<style scoped lang="scss">
.v-dialog > .v-card > .v-card__text {
  padding: 2rem;
}

.v-dialog__content {
  align-items: start;
}
</style>
