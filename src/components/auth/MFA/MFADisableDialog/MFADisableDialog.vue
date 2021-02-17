<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="600" :persistent="true">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          {{ $t("auth.mfa.disable-button") }}
        </v-btn>
      </template>
      <v-card class="fe-dialog-content">
        <button type="button" aria-label="Close" class="fe-dialog-close" @click="closeDialog">
          <span class="fe-dialog-close-x"></span>
        </button>
        <v-card-title class="fe-dialog-header">
          <div class="fe-dialog-title" id="rcDialogTitle0">
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
            <MFADisableDialogFooter @close-dialog="closeDialog" :isFormValid="isFormValid" />
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import { FRONTEGG_STORE_KEY } from '@/plugins/fronteggCore/constants';
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
      token: ''
    };
  },
  computed: {},
  methods: {
    disableMfa() {
      this[FRONTEGG_STORE_KEY].dispatch({
        type: "auth/disableMfa",
        payload: {
          token: this.token,
        }
      });
    },
    closeDialog() {
      this.dialog = false;
    }
  }
});
</script>

<style scopped lang="scss">
.v-dialog > .v-card > .v-card__text {
  padding: 2rem;
}

.v-dialog__content {
  align-items: start;
}
</style>
