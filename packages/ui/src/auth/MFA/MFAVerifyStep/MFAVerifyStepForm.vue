<template>
  <v-row>
    <v-col cols="12">
      <ol class="fe-mfa__verify-form-ol">
        <li>
          {{ $t('auth.mfa.verify.scan-qr-description-1') }}
          &nbsp;
          <span style="color: green;">Google Authenticator</span>
          &nbsp;
          {{ $t('auth.mfa.verify.scan-qr-description-2') }}
          <div class="fe-mfa__qr">
            <Spinner v-if="loading && !qrCode" />
            <img
              v-else
              alt="Multi-factor QR"
              :src="qrCode"
            >
          </div>
        </li>
        <li class="fe-input fe-input-full-width fe-input-in-form">
          {{ $t('auth.mfa.verify.enter-generated-code') }}
          <v-text-field
            :rules="rules.code"
            :outlined="true"
            aria-autocomplete="false"
            auto-complete="off"
            name="token"
            :disabled="loading"
            placeholder="Ex. 1 2 3 4 5 6"
            @input="updateValue($event)"
          />
        </li>
      </ol>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import Spinner from "@/elements/Spinner.vue";
import {validateTwoFactorCode} from "../../../auth/utils";
import {mapMfaActions} from "@frontegg/vue-core/auth";

export default Vue.extend({
  name: "MFAVerifyStepForm",
  components: {
    Spinner,
  },
  props: {
    value: {
      type: String
    }
  },
  data(): any {
    return {
      ...this.mapMfaState(),
      rules: {
        code: validateTwoFactorCode(),
      },
    }
  },
  computed: {
    qrCode(): string | undefined {
      return this.$data.mfaState.qrCode;
    },
    loading(): boolean {
      return this.$data.mfaState.loading;
    },
  },
  mounted() {
    if(!this.qrCode) {
      this.enrollMfa()
    }
  },
  methods: {
    _enrollMfa: mapMfaActions('enrollMfa'),
    enrollMfa() {
      this._enrollMfa();
    },
    updateValue(value: any) {
      this.$emit('input', value)
    },
  }
});
</script>
