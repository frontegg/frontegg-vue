<template>
  <v-row class="ma-0">
    <v-col cols="12" class="pa-0">
      {{ $t('auth.login.suggest-sign-up.message') }}
      <span @click="redirectToSignUp" class="fe-login-component__back-to-sign-up-link">
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
              @change="shouldBackToLoginIfEmailChanged ? backToPreLogin() : undefined"
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
import { FRONTEGG_STORE_KEY } from "@/plugins/fronteggCore/constants";
import { mapState } from "@/plugins/fronteggCore/map-state";
import FButton from "@/components/core/elements/Button/FButton.vue";
import { validateEmail, validatePassword } from '@/plugins/fronteggCore/helpers/validates';
import { LoginStep, AuthState } from "@/plugins/fronteggAuth/Api";

export default Vue.extend({
  name: "LoginWithPassword",
  components: {
    FButton,
  },
  data() {
    return {
      ...mapState(this, {
        authState:  (state: { auth: AuthState }) => state.auth,
        loginState: (state: { auth: AuthState }) => state.auth.loginState,
        isSSOAuth: (state: { auth: AuthState }) => state.auth.isSSOAuth,
      }),
      isFormValid: false,
      email: "",
      password: "",
      rules: {
        email: validateEmail(),
        password: validatePassword(),
      },
      showPassword: false,
    };
  },
  computed: {
    step() {
      return this.loginState.step;
    },
    submitText() {
      if (!this.shouldDisplayPassword) {
        return this.$t('auth.login.continue');
      }
      return this.$t('auth.login.login');
    },
    isLoading() {
      return this.loginState.loading;
    },
    loginError() {
      if (this.loginState.error) {
        return this.loginState.error;
      } else {
        return null;
      }
    },
    shouldDisplayPassword() {
      return !this.isSSOAuth || this.step === LoginStep.loginWithPassword;
    },
    shouldBackToLoginIfEmailChanged() {
      return this.isSSOAuth && this.shouldDisplayPassword;
    }
  },
  methods: {
    backToPreLogin() {
      this[FRONTEGG_STORE_KEY].dispatch({
        type: "auth/setLoginState",
        payload: {
          step: 'preLogin'
        },
      });
    },
    loginSubmit() {
      if (!this.shouldDisplayPassword) {
        this[FRONTEGG_STORE_KEY].dispatch({
          type: "auth/preLogin",
          payload: {
            email: this.email,
          },
        });
      } else {
        this[FRONTEGG_STORE_KEY].dispatch({
          type: "auth/login",
          payload: {
            email: this.email,
            password: this.password,
          },
        });
      }
    },
    navigateForgetPass() {
      this[FRONTEGG_STORE_KEY].dispatch({
        type: "auth/setForgotPasswordState",
        payload: { email: this.email },
      });
      this[FRONTEGG_STORE_KEY].dispatch({
        type: "auth/resetLoginState",
      });

      this.$router.push(this.authState.routes.forgetPasswordUrl);
    },
    redirectToSignUp() {
      this.$router.push(this.authState.routes.signUpUrl);
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