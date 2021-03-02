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
        <li>
          {{ $t('auth.mfa.verify.enter-generated-code') }}
          <v-text-field
            :rules="rules.code"
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
import Spinner from '@/components/Common/Spinner.vue';
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
  data() {
    return {
      ...this.mapMfaState(),
      rules: {
        code: validateTwoFactorCode(),
      },
    }
  },
  computed: {
    qrCode() {
      return this.$data.mfaState.qrCode;
    },
    loading() {
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
    updateValue(value) {
      this.$emit('input', value)
    },
    enrollMfa() {
      this._enrollMfa();
    },
  }
});
</script>
