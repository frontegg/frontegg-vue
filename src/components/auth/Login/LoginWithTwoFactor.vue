

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
        <button
          class="fe-button fe-button-large fe-button-clickable fe-button-full-width"
          :class="!isFormValid? 'fe-button-disabled': ''"
          data-test-id="submit-btn"
          :disabled="!isFormValid"
          @click.prevent="loginWithMfa()"
        >
          {{ $t("auth.login.login") }}
        </button>
        <div class="fe-note">
          <div class="fe-note-title">
            {{ $t("auth.login.disable-two-factor-title") }}
          </div>
          <div class="fe-note-description fe-recover-two-factor">
            <a 
              test-id="recover-two-factor-button"
              @click.prevent="recoverTwoFactor()"
            >
              {{ $t("common.click-here") }}
            </a>
            &nbsp;
            {{ $t("auth.login.disable-two-factor-description") }}
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
import { mapState } from "@/plugins/fronteggCore/map-state";
import { FRONTEGG_STORE_KEY } from "@/plugins/fronteggCore/constants";
import Spinner from "@/components/Common/Spinner.vue";
import { LoginStep } from '@/plugins/fronteggAuth/Api';

export default Vue.extend({
  name: "LoginWithTwoFactor",
  components: {
  },
    data() {
    return {
      ...mapState(this, {
        loginState: (state: { auth: AuthState }) => state.auth.loginState,
      }),
      isFormValid: false,
      code: '',
      rules: {
        code: [
          (v: string) => !!v || "The code is required",
          (v: string) =>
            !v || v.length === 6 || "Code must be at least 6 characters",
        ],
      },
    }
  },
  computed: {
    mfaToken() {
      return this.loginState.mfaToken
    },
    error() {
      return this.loginState.error
    },
  },
  methods: {
    loginWithMfa() {
      this[FRONTEGG_STORE_KEY].dispatch({
        type: "auth/loginWithMfa",
        payload: {
          mfaToken: this.mfaToken,
          value: this.code,
        },
      });
    },
    recoverTwoFactor() {
      this[FRONTEGG_STORE_KEY].dispatch({
        type: "auth/setLoginState",
        payload: {
          step: LoginStep.recoverTwoFactor,
          error: '',
        },
      });
    },
  },
});
</script>

<style lang="scss">
</style>