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
import {MFAStep} from "@frontegg/redux-store/auth";

export default Vue.extend({
  name: "MFARecoveryCodeStep",
  components: {
    MFARecoveryCodeStepMessage,
    MFARecoveryCodeStepForm,
    MFARecoveryCodeStepFooter,
  },
  data() {
    return {
      ...this.mapMfaState(),
      MFAStep,
    }
  },
  computed: {
    step() {
      return this.$data.mfaState.step;
    },
    hasSlot() {
      return !!this.$slots.default;
    }
  }
});
</script>

