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
        <v-form
          v-model="isFormValid"
          class="fe-form"
        >
          <MFAVerifyStepMessage>
            {{ $t("auth.mfa.verify.forceMfaMessage") }}
          </MFAVerifyStepMessage>
          <MFAVerifyStepForm v-model="token" />
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
                  @click.prevent="verifyMfaAfterForce"
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
import {MFAStep} from "@frontegg/redux-store/auth";
import {mapMfaActions, mapLoginActions} from "@frontegg/vue-core/auth";
import MFAVerifyStepForm from "../MFA/MFAVerifyStep/MFAVerifyStepForm.vue";
import MFAVerifyStepErrorMessage from "../MFA/MFAVerifyStep/MFAVerifyStepErrorMessage.vue";
import MFAVerifyStepMessage from "../MFA/MFAVerifyStep/MFAVerifyStepMessage.vue";
import MFARecoveryCodeStep from "../MFA/MFARecoveryCodeStep/MFARecoveryCodeStep.vue";

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
      ...this.mapMfaState(),
      MFAStep,
      isFormValid: false,
      token: '',
      style: null,
    };
  },
  computed: {
    step() {
      return this.$data.mfaState.step;
    },
    loading() {
      return this.$data.mfaState.loading;
    },
    mfaToken() {
      return this.$data.mfaState.mfaToken;
    },
    recoveryCode() {
      return this.$data.mfaState.recoveryCode;
    },
  },
  mounted() {
    const head = document.head || document.getElementsByTagName('head')[0];
    this.$data.style = document.createElement('style');
    this.$data.style.type = 'text/css';
    this.$data.style.appendChild(
      document.createTextNode(`:root {
      --fe-auth-container-width: 500px;
    }`)
    );
    head.appendChild(this.$data.style);
  },
  destroyed() {
    this.$data.style.remove();
  },
  methods: {
    _verifyMfaAfterForce: mapMfaActions('verifyMfaAfterForce'),
    _setMfaState: mapMfaActions('setMfaState'),
    _requestAuthorize: mapLoginActions('requestAuthorize'),
    async verifyMfaAfterForce() {
      await this._verifyMfaAfterForce({
        mfaToken: this.mfaToken || '',
        value: this.$data.token,
        callback: (success) => {
          if (success) {
            this._setMfaState({
              recoveryCode: this.recoveryCode,
            })
          }
        },
      })
    },
    requestAuthorize(firstTime: boolean | undefined) {
      this._requestAuthorize(firstTime)
    }
  },
});
</script>
