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
import Spinner from '@/components/Common/Spinner.vue'
import { FRONTEGG_STORE_KEY } from '@/plugins/fronteggCore/constants';
import { mapState } from "@/plugins/fronteggCore/map-state";
import { AuthState } from "@/plugins/fronteggAuth/Api";

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
      ...mapState(this, {
        mfaState: (state: { auth: AuthState }) => state.auth.mfaState,
      }),
      rules: {
        code: [
          (v: string) => !!v || this.$t('validation.required-field', { name: 'code' }),
          (v: string) => !v || v.length === 6 || this.$t('validation.min-length', { name: 'code', limit: 6 }),
        ],
      },
    }
  },
  computed: {
    qrCode() {
      return this.mfaState.qrCode;
    },
    loading() {
      return this.mfaState.loading;
    },
  },
  mounted() {
    if(!this.qrCode) {
      this.enrollMfa()
    }
  },
  methods: {
    updateValue(value) {
      this.$emit('input', value)
    },
    enrollMfa() {
      this[FRONTEGG_STORE_KEY].dispatch({
        type: 'auth/enrollMfa'
      });
    },
  }
});
</script>
