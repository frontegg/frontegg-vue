<template>
  <v-row>
    <v-col cols="12">
      <div
        v-if="step === MFAStep.recoveryCode"
        class="fe-mfa__recovery-code-step"
      >
        <MFARecoveryCodeStepMessage />
        <MFARecoveryCodeStepForm />
        <slot />
        <div v-if="!hasSlot">
          <MFARecoveryCodeStepFooter />
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import MFARecoveryCodeStepMessage from './MFARecoveryCodeStepMessage.vue';
import MFARecoveryCodeStepForm  from './MFARecoveryCodeStepForm.vue';
import MFARecoveryCodeStepFooter from './MFARecoveryCodeStepFooter.vue';
import { MFAStep, AuthState } from '@/plugins/fronteggAuth/Api';
import { mapState } from '@/plugins/fronteggCore/map-state'

export default Vue.extend({
  name: "MFARecoveryCodeStep",
  components: {
    MFARecoveryCodeStepMessage,
    MFARecoveryCodeStepForm,
    MFARecoveryCodeStepFooter,
  },
  data() {
    return {
      ...mapState(this, {
        mfaState: (state: { auth: AuthState }) => state.auth.mfaState,
      }),
      MFAStep,
    }
  },
  computed: {
    step() {
      return this.mfaState.step;
    },
    hasSlot() {
      return !!this.$slots.default;
    }
  }
});
</script>

<style lang="scss">

</style>

