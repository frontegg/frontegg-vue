

<template>
  <v-row>
    <v-col cols="12">
      <div v-if="step === MFAStep.recoveryCode">
        <MFARecoveryCodeStep>
          <div class="fe-dialog__footer">
            <div class="fe-flex-spacer" />
            <button
              class="fe-button fe-button-primary fe-button-large fe-button-clickable"
              data-test-id="mfa-btn"
              @click="requestAuthorize(true)"
            >
              {{ $t("common.continue") }}
            </button>
          </div>
        </MFARecoveryCodeStep>
      </div>
      <div v-else>
        <v-form v-model="isFormValid" class="fe-form">
          <MFAVerifyStepMessage>{{
            $t("auth.mfa.verify.forceMfaMessage")
          }}</MFAVerifyStepMessage>
          <MFAVerifyStepForm />
          <MFAVerifyStepErrorMessage />

          <div class="fe-dialog__footer">
            <div class="fe-grid fe-container">
              <div class="fe-grid fe-item fe-grid-xs-true fe-text-align-end">
                <button
                  class="fe-button fe-button-large fe-button-clickable fe-button-full-width"
                  :class="!isFormValid ? 'fe-button-disabled' : ''"
                  :disabled="!isFormValid"
                  type="submit"
                  data-test-id="sumbit-btn"
                >
                  {{ $t("common.verify") }}
                </button>
              </div>
            </div>
          </div>
        </v-form>
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import Spinner from "@/components/Common/Spinner.vue";
import { AuthState, MFAStep } from "@/plugins/fronteggAuth/Api";
import { mapState } from "@/plugins/fronteggCore/map-state";
import MFAVerifyStepForm from "@/components/auth/MFA/MFAVerifyStep/MFAVerifyStepForm.vue";
import MFAVerifyStepErrorMessage from "@/components/auth/MFA/MFAVerifyStep/MFAVerifyStepErrorMessage.vue";
import MFAVerifyStepMessage from "@/components/auth/MFA/MFAVerifyStep/MFAVerifyStepMessage.vue";
import MFARecoveryCodeStep from "@/components/auth/MFA/MFARecoveryCodeStep/MFARecoveryCodeStep.vue";

export default Vue.extend({
  name: "ForceEnrollMfa",
  components: {
    // Spinner,
    MFARecoveryCodeStep,
    MFAVerifyStepForm,
    MFAVerifyStepErrorMessage,
    MFAVerifyStepMessage,
  },
  data() {
    return {
      ...mapState(this, {
        mfaState: (state: { auth: AuthState }) => state.auth.mfaState,
      }),
      MFAStep,
      isFormValid: false,
    };
  },
  computed: {
    step() {
      return this.mfaState.step;
    },
  },
});
</script>

<style lang="scss">
</style>