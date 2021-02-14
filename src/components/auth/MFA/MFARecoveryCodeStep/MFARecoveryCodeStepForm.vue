<template>
  <v-row>
    <v-col cols="12">
      <div>Your recovery code</div>
      <div class="fe-mfa__recovery-code" :class="copiedMgsVisible? 'copied' : ''" @click="copyRecoverCode">
        <span>{{ copiedMgsVisible ? $t('common.copied') : recoveryCode }}</span>
        <v-icon name='mdi-content-copy' />
      </div>

      <div class='fe-mfa__recovery-note'>
        <v-icon name='mdi-alert' />
        <span>{{ $t('auth.mfa.recovery-code.copy-and-save-code') }}</span>
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import copy from 'clipboard-copy';
import { mapState } from '@/plugins/fronteggCore/map-state'

export default Vue.extend({
  name: "MFARecoveryCodeStepForm",
  components: {
  },
  data() {
    return {
      ...mapState(this, {
        mfaState: (state: { auth: AuthState }) => state.auth.mfaState,
      }),
      copiedMgsVisible: false,
    }
  },
  computed: {
    recoveryCode() {
      return this.mfaState.recoveryCode;
    },
  },
  methods: {
    displayCopiedMessage() {
      this.copiedMgsVisible = true;
      setTimeout(() => {
        this.copiedMgsVisible = false;
      }, 1000);
    },
    copyRecoverCode() {
      copy(this.recoveryCode ?? '').then(this.displayCopiedMessage);
    },
  },
});
</script>

<style lang="scss">

</style>

