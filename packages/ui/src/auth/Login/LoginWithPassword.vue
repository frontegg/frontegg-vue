<template>
  <v-row class="ma-0">
    <v-col cols="12" class="pa-0">
      {{ $t('auth.login.suggest-sign-up.message') }}
      <span class="fe-login-component__back-to-sign-up-link" @click.prevent="navigateToSignup">
        {{ $t('auth.login.suggest-sign-up.sign-up-link') }}
      </span>
    </v-col>
    <v-col cols="12" class="pa-0">
      <v-form
        v-model="isFormValid"
        class="fe-form"
      >
        <div class="fe-input fe-input-full-width fe-input-in-form">
          <div class="fe-input__header">
            <div class="fe-input__label">
              {{ $t('auth.login.email') }}
            </div>
          </div>
          <div class="fe-input__inner-large">
            <v-text-field
              v-model="email"
              name="email"
              :outlined="true"
              :rules="rules.email"
              placeholder="name@example.com"
            />
          </div>
        </div>
        <div
          v-if="shouldDisplayPassword"
          class="fe-input fe-input-full-width fe-input-in-form fe-input-with-suffix-icon mb-0"
        >
          <div class="fe-input fe-input-full-width fe-input-in-form">
            <div class="fe-input__header">
              <div class="fe-input__label">
                {{ $t('auth.login.password') }}
              </div>
              <a
                class="fe-button fe-input__label-button fe-button-clickable mb-0"
                href="#"
                @click.prevent="navigateForgetPass"
              >
                {{ $t('auth.login.forgot-password') }}
              </a>
            </div>
            <div class="fe-input__inner-large">
              <v-text-field
                v-model="password"
                tabindex="-1"
                :outlined="true"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="rules.password"
                :type="showPassword ? 'text' : 'password'"
                name="password"
                placeholder="Enter Your Password"
                @click:append="showPassword = !showPassword"
              />
            </div>
          </div>
        </div>
        <div class="continue">
          <FButton
            :params="{
              type: 'submit',
              fullWidth: true,
              variant:'primary',
              size: 'large',
              loading: isLoading,
              disabled: !isFormValid,
              'data-test-id': 'sumbit-btn'
            }"
            @click.prevent="loginSubmit"
          >
            {{ submitText }}
          </FButton>
          <div
            v-if="loginError"
            class="fe-error-message"
          >
            {{ loginError }}
          </div>
        </div>
      </v-form>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import FButton from "@/elements/Button/FButton.vue";
import {mapLoginActions, mapForgotPasswordActions} from "@frontegg/vue-core/auth";
import {validateEmail, validatePassword} from "../../auth/utils";
import {LoginStep} from "@frontegg/redux-store/auth";
import i18n from "@/i18n";
import {TranslateResult} from "vue-i18n";

export default Vue.extend({
  name: "LoginWithPassword",
  i18n,
  components: {
    FButton,
  },
  data() {
    return {
      ...this.mapAuthState(),
      ...this.mapLoginState(),
      isFormValid: false,
      email: "",
      password: "",
      showPassword: false,
      rules: {
        email: validateEmail(),
        password: validatePassword(),
      },
    };
  },
  computed: {
    step(): LoginStep {
      return this.loginState.step;
    },
    submitText(): TranslateResult {
      if (!this.shouldDisplayPassword) {
        return this.$t('auth.login.continue');
      }
      return this.$t('auth.login.login');
    },
    isLoading(): boolean {
      return this.loginState.loading;
    },
    loginError(): string | null {
      return this.loginState.error ?? null
    },
    isSSOAuth(): boolean {
      return this.authState.isSSOAuth ?? false
    },
    shouldDisplayPassword(): boolean {
      return Boolean(!this.isSSOAuth || this.step === LoginStep.loginWithPassword);
    },

  },
  methods: {
    preLogin: mapLoginActions('preLogin'),
    login: mapLoginActions('login'),
    resetLoginState: mapLoginActions('resetLoginState'),
    setLoginState: mapLoginActions('setLoginState'),
    setForgotPasswordState: mapForgotPasswordActions('setForgotPasswordState'),
    loginSubmit() {
      if (this.loginState.step === "preLogin") {
        this.preLogin({email: this.email})
      } else {
        this.login({email: this.email, password: this.password})
      }
    },
    navigateForgetPass() {
      this.setForgotPasswordState({email: this.email})
      this.resetLoginState();
      this.$router.push(this.fronteggAuth.routes.forgetPasswordUrl);
    },
    navigateToSignup() {
      this.resetLoginState();
      this.$router.push(this.fronteggAuth.routes.signUpUrl);
    },
  },
});
</script>

<style scoped lang="scss">
a.fe-button {
  color: var(--color-gray-8);

  &:hover {
    background: transparent;
  }
}
</style>
