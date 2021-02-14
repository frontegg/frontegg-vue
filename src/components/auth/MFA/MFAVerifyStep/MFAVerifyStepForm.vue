

<template>
  <v-row>
    <v-col cols="12">
      <ol class='fe-mfa__verify-form-ol'>
        <li>
          {{ $t('auth.mfa.verify.scan-qr-description-1') }}
          &nbsp;
          <span style="color: green;">Google Authenticator</span>
          &nbsp;
          {{ $t('auth.mfa.verify.scan-qr-description-2') }}
          <div className='fe-mfa__qr'>
            <Spinner v-if="loading && !qrCode" />
            <img v-else alt='Multi-factor QR' :src="qrCode" />
          </div>
        </li>
        <li>
          {{ $t('auth.mfa.verify.enter-generated-code') }}
          <v-input-text
            aria-autocomplete="false"
            autoComplete='off'
            name='token'
            :disabled="loading"
            placeholder='Ex. 1 2 3 4 5 6'
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
  data() {
    return {
      ...mapState(this, {
        mfaState: (state: { auth: AuthState }) => state.auth.mfaState,
      }),
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
    enrollMfa() {
      this[FRONTEGG_STORE_KEY].dispatch({
        type: 'auth/enrollMfa'
      });
    },
  }
});
</script>
