
<template>
  <v-row>
    <v-col cols="12">
      <v-form v-model="isFormValid" class="fe-form">
        <div class="fe-input fe-input-full-width fe-input-in-form">
          <div class="fe-input__header">
            <div class="fe-input__label">
              {{ $t('auth.login.please-enter-the-recovery-code') }}
            </div>
          </div>
          <div>
            <v-text-field
              v-model="code"
              name="code"
              :rules="rules.code"
            />
          </div>
        </div>
        <button
          class="fe-button  fe-button-large fe-button-clickable fe-button-full-width"
          :class="!isFormValid? 'fe-button-disabled':''"
          data-test-id="submit-btn"
          :disabled="!isFormValid"
          @click.prevent="recoverMfa()"
        >
          {{ $t('auth.login.disable-mfa') }}
        </button>

        <div v-if="error" class="fe-error-message">
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
import { LoginStep } from "@/plugins/fronteggAuth/Api";

export default Vue.extend({
  name: "RecoverTwoFactor",
  components: {},
  data() {
    return {
      ...mapState(this, {
        loginState: (state: { auth: AuthState }) => state.auth.loginState,
      }),
      isFormValid: false,
      code: "",
      rules: {
        code: [
          (v: string) => !!v || "The code is required",
          (v: string) =>
            !v || v.length >= 8 || "Code must be at least 8 characters",
        ],
      },
    };
  },
  computed: {
    email() {
      return this.loginState.email;
    },
    error() {
      return this.loginState.error;
    },
  },
  methods: {
    recoverMfa() {
      this[FRONTEGG_STORE_KEY].dispatch({
        type: "auth/recoverMfa",
        payload: {
          email: this.email || '',
          recoveryCode: this.code,
        },
      });
    },
  },
});
</script>

<style scopped lang="scss">
.fe-button {
      margin-bottom: 12px;
}
</style>