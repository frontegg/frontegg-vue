<template>
  <v-row>
    <v-col cols="12">
      <v-form
        v-model="isFormValid"
        class="fe-form"
      >
        <div class="fe-input fe-input-full-width fe-input-in-form">
          <div class="fe-input__header">
            <div class="fe-input__label">
              {{ $t('auth.login.please-enter-the-recovery-code') }}
            </div>
          </div>
          <div>
            <v-text-field
              v-model="code"
              :outlined="true"
              name="code"
              :rules="rules.code"
            />
          </div>
        </div>
        <FButton
          :params="{
              type: 'submit',
              fullWidth: true,
              variant:'primary',
              size: 'large',
              loading: isFormValid,
              disabled: !isFormValid,
              'data-test-id': 'submit-btn'
            }"
          @click.prevent="recoverMfa()"
        >
          {{ $t('auth.login.disable-mfa') }}
        </FButton>

        <div
          v-if="error"
          class="fe-error-message"
        >
          {{ error }}
        </div>
      </v-form>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import {mapLoginActions} from "@frontegg/vue-core/auth";
import {validateTwoFactorRecoveryCode} from "@/auth/utils";
import FButton from "@/elements/Button/FButton.vue";

export default Vue.extend({
  name: "RecoverTwoFactor",
  components: {
    FButton
  },
  data() {
    return {
      ...this.mapLoginState(),
      isFormValid: false,
      code: "",
      rules: {
        code: validateTwoFactorRecoveryCode(),
      },
    };
  },
  computed: {
    email() {
      return this.$data.loginState.email;
    },
    error() {
      return this.$data.loginState.error;
    },
  },
  methods: {
    _recoverMfa: mapLoginActions('recoverMfa'),
    recoverMfa() {
      this._recoverMfa({
        email: this.email || '',
        recoveryCode: this.code,
      });
    },
  },
});
</script>

<style scoped lang="scss">
.fe-button {
  margin-bottom: 12px;
}
</style>
