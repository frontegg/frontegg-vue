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
              {{ $t("auth.login.please-enter-the-6-digit-code") }}
            </div>
          </div>
          <div>
            <v-text-field
              :outlined="true"
              v-model="code"
              name="code"
              :rules="rules.code"
              aria-autocomplete="none"
              autocomplete="off"
            />
          </div>
        </div>
        <FButton
          :params="{
              type: 'submit',
              fullWidth: true,
              variant:'primary',
              size: 'large',
              loading: isLoading,
              disabled: !isFormValid,
              'data-test-id': 'submit-btn'
            }"
          @click.prevent="loginWithMfa()"
        >
          {{ $t("auth.login.login") }}
        </FButton>

        <div class="fe-note">
          <div class="fe-note-title">
            {{ $t("auth.login.disable-two-factor-title") }}
          </div>
          <div class="fe-note-description fe-recover-two-factor">
            <a data-test-id="recover-two-factor-button" @click.prevent="recoverTwoFactor()">{{
                $t("common.click-here")
              }}</a> {{ $t("auth.login.disable-two-factor-description") }}
          </div>
        </div>

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
import {LoginStep} from "@frontegg/redux-store/auth";
import {validateTwoFactorCode} from "@/auth/utils";
import FButton from "@/elements/Button/FButton.vue";

export default Vue.extend({
  name: "LoginWithTwoFactor",
  components: {
    FButton
  },
  data() {
    return {
      ...this.mapLoginState(),
      isFormValid: false,
      code: '',
      rules: {
        code: validateTwoFactorCode(),
      },
    }
  },
  computed: {
    mfaToken(): string {
      return this.loginState.mfaToken ?? ''
    },
    error(): any {
      return this.loginState.error
    },
    isLoading(): boolean {
      return this.loginState.loading
    },
  },
  methods: {
    _loginWithMfa: mapLoginActions('loginWithMfa'),
    _setLoginState: mapLoginActions('setLoginState'),
    loginWithMfa(): void {
      this._loginWithMfa({
        mfaToken: this.mfaToken,
        value: this.code,
      })
    },
    recoverTwoFactor(): void {
      this._setLoginState({
        step: LoginStep.recoverTwoFactor,
        error: '',
      })
    },
  },
});
</script>
