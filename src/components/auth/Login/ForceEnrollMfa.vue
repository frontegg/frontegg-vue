

<template>
  <v-row>
    <v-col cols="12">
      <div v-if="MFAStep.recoveryCode">

      </div>
      <div class="fe-relative fe-mt-4">
        <spinner />
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import Spinner from "@/components/Common/Spinner.vue";
import { AuthState, MFAStep } from '@/plugins/fronteggAuth/Api';
import { mapState } from '@/plugins/fronteggCore/map-state'
// import { MFAVerifyStepErrorMessage, MFAVerifyStepForm, MFAVerifyStepMessage } from '@/components/MFA/MFAVerifyStep';
// import { MFARecoveryCodeStep } from '@/components/MFA/MFARecoveryCodeStep';

export default Vue.extend({
  name: "ForceEnrollMfa",
  components: {
    Spinner,
  },
  data() {
    return {
      MFAStep,
      
    }
  },
});
</script>

<style lang="scss">

</style>