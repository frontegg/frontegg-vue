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
              {{ $t('auth.forgot-password.new-password') }}
            </div>
          </div>
          <div class="fe-input__inner-small">
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
              placeholder="Enter Your Password"
              @click:append="showPassword = !showPassword"
            />
          </div>
        </div>
        <div
          class="fe-input fe-input-full-width fe-input-in-form fe-input-with-suffix-icon"
        >
          <div class="fe-input__header">
            <div class="fe-input__label">
              {{ $t('auth.forgot-password.confirm-new-password') }}
            </div>
          </div>
          <div class="fe-input__inner-small">
            <v-text-field
              v-model="confirmPassword"
              tabindex="-1"
              :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :outlined="true"
              :rules="rules.confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              name="confirmPassword"
              placeholder="Enter Your Password again"
              @click:append="showConfirmPassword = !showConfirmPassword"
            />
          </div>
        </div>
        <div class="continue">
          <button
            class="fe-button fe-button-primary fe-button-large fe-button-clickable fe-button-full-width"
            :class="{ 'fe-button-disabled': !isFormValid }"
            :disabled="!isFormValid"
            @click.prevent="resetPassword"
          >
            <spinner v-if="isLoading" />
            <span v-else>
              {{ $t('auth.forgot-password.reset-password-button') }}
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
import {mapForgotPasswordActions} from "@frontegg/vue-core/auth";
import { validateRequired, validatePasswordUsingOWASP, validatePasswordConfirmation } from "../../auth/utils";

export default Vue.extend({
  name: 'ResetPasswordForm',
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
    isLoading() {
      return this.$data.forgotPasswordState.loading;
    },
    resetError() {
      return this.$data.forgotPasswordState.error;
    },
    passwordConfig() {
      return this.$data.forgotPasswordState.passwordConfig;
    },
  },
  watch: {
    password(value) {
      validatePasswordUsingOWASP(this.passwordConfig, value).then(error => {
        this.$data.passError = error;
        if(this.confirmPassword.length) {
          (this.$refs.form as Vue & { validate: () => boolean }).validate()
        }
      })
    }
  },
  methods: {
    _resetPassword: mapForgotPasswordActions('resetPassword'),
    resetPassword() {
      this._resetPassword({
        password: this.$data.password,
        userId: this.userId,
        token: this.token,
      });
    },
  },
});
</script>
