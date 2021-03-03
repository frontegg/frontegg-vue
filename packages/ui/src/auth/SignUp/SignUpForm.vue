<template>
  <v-row class="ma-0">
    <v-col cols="12" class="pa-0">
      {{ $t('auth.sign-up.suggest-login.message') }}
      <span class="fe-login-component__back-to-sign-up-link" @click.prevent="navigateToLogin">
        {{ $t('auth.sign-up.suggest-login.login-link') }}
      </span>
    </v-col>
    <v-col cols="12" class="pa-0">
      <v-form
        v-model="isFormValid"
        class="fe-form"
      >
        <div class="fe-input fe-input-full-width fe-input-in-form">
          <div class="fe-input__inner-large">
            <v-text-field
              v-model="name"
              name="name"
              :outlined="true"
              :rules="rules.name"
              :placeholder="$t('auth.sign-up.form.name')"
            />
          </div>
        </div>
        <div class="fe-input fe-input-full-width fe-input-in-form">
          <div class="fe-input__inner-large">
            <v-text-field
              v-model="email"
              name="email"
              :outlined="true"
              :rules="rules.email"
              :placeholder="$t('auth.sign-up.form.email')"
            />
          </div>
        </div>
        <div class="fe-input fe-input-full-width fe-input-in-form">
          <div class="fe-input__inner-large">
            <v-text-field
              v-model="companyName"
              name="companyName"
              :outlined="true"
              :rules="rules.companyName"
              :placeholder="$t('auth.sign-up.form.company-name')"
            />
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
            @click.prevent="signUpSubmit"
          >
            {{ $t('auth.sign-up.form.submit-button') }}
          </FButton>
          <div
            v-if="signUpError"
            class="fe-error-message"
          >
            {{ signUpError }}
          </div>
        </div>
      </v-form>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import {mapAuthActions} from "@frontegg/vue-core/auth";
import {validateEmail, validateRequired} from "@/auth/utils";
import i18n from "@/i18n";
import FButton from "@/elements/Button/FButton.vue";

export default Vue.extend({
  name: "SignUpForm",
  i18n,
  components: {
    FButton,
  },
  data() {
    return {
      ...this.mapAuthState(),
      ...this.mapSignUpState(),

      isFormValid: false,
      name: "",
      email: "",
      companyName: "",
      rules: {
        name: validateRequired('Name'),
        email: validateEmail(),
      },
    };
  },
  computed: {
    signUpError(): string | undefined {
      return this.signUpState.error
    },
    isLoading(): boolean {
      return this.signUpState.loading
    }
  },
  methods: {
    signUpUser: mapAuthActions('signUpUser'),
    resetSignUpState: mapAuthActions('resetSignUpState'),
    signUpSubmit(): void {
      this.signUpUser({
        name: this.name,
        email: this.email,
        companyName: this.companyName,
      })
    },
    navigateToLogin(): void {
      this.resetSignUpState();
      this.$router.push(this.fronteggAuth.routes.loginUrl);
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
