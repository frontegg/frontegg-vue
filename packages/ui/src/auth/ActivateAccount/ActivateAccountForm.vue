<template>
  <v-row>
    <v-col cols="12">
      <v-form
        v-model="isFormValid"
        ref="form"
        class="fe-form"
      >
        <div
          class="fe-input fe-input-full-width fe-input-in-form fe-input-with-suffix-icon"
        >
          <div class="fe-input__header">
            <div class="fe-input__label">
              {{ $t('auth.activate-account.new-password') }}
            </div>
          </div>
          <div class="password">
            <v-text-field
              v-model="password"
              tabindex="-1"
              :outlined="true"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="rules.password"
              :error-messages="passError"
              :type="showPassword ? 'text' : 'password'"
              ref="password"
              name="password"
              :placeholder="$t('auth.activate-account.enter-your-password')"
              @click:append="showPassword = !showPassword"
            />
          </div>
        </div>
        <div
          class="fe-input fe-input-full-width fe-input-in-form fe-input-with-suffix-icon"
        >
          <div class="fe-input__header">
            <div class="fe-input__label">
              {{ $t('auth.activate-account.confirm-new-password') }}
            </div>
          </div>
          <div class="password">
            <v-text-field
              v-model="confirmPassword"
              tabindex="-1"
              :outlined="true"
              :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="rules.confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              name="confirmPassword"
              :placeholder="$t('auth.activate-account.enter-your-password-again')"
              @click:append="showConfirmPassword = !showConfirmPassword"
            />
          </div>
        </div>
        <div class="continue">
          <button
            class="fe-button fe-button-primary fe-button-large fe-button-clickable fe-button-full-width"
            :class="{ 'fe-button-disabled': !isFormValid }"
            :disabled="!isFormValid"
            @click.prevent="activateAccount()"
          >
            <spinner v-if="isLoading"/>
            <span v-else>
              {{ $t('auth.activate-account.activate-account-button') }}
            </span>
          </button>
          <div
            v-if="resetError"
            class="fe-error-message"
          >
            {{ resetError }}
          </div>
        </div>
      </v-form>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import Spinner from "@/elements/Spinner.vue";
import {mapActivateAccountActions, mapForgotPasswordActions} from "@frontegg/vue-core/auth";
import {validateRequired, validatePasswordUsingOWASP, validatePasswordConfirmation} from "../../auth/utils";
import {TestConfig} from "owasp-password-strength-test";

export default Vue.extend({
  name: 'ActivateAccountForm',
  components: {
    Spinner,
  },
  props: {
    userId: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      ...this.mapActivateAccountState(),
      ...this.mapForgotPasswordState(),
      isFormValid: false,
      password: '',
      confirmPassword: '',
      showPassword: false,
      showConfirmPassword: false,
      passError: [],
      rules: {
        password: validateRequired('Password'),
        confirmPassword: validatePasswordConfirmation(this.$refs),
      },
    }
  },
  computed: {
    isLoading(): boolean {
      return this.activateAccountState.loading;
    },
    resetError(): string | undefined {
      return this.activateAccountState.error;
    },
    passwordConfig(): Partial<TestConfig> | null {
      return this.forgotPasswordState.passwordConfig;
    },
  },
  mounted() {
    this.loadPasswordConfig();
  },
  watch: {
    password(value): void {
      validatePasswordUsingOWASP(this.passwordConfig, value).then(error => {
        this.$data.passError = error;
        if (this.confirmPassword.length) {
          (this.$refs.form as any).validate();
        }
      })
    }
  },
  methods: {
    loadPasswordConfig: mapForgotPasswordActions('loadPasswordConfig'),
    _activateAccount: mapActivateAccountActions('activateAccount'),
    activateAccount() {
      this._activateAccount({
        password: this.password,
        userId: this.userId,
        token: this.token,
      })
    },
  },
});
</script>
