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
            <spinner v-if="isLoading" />
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
import { FRONTEGG_STORE_KEY } from '@/plugins/fronteggCore/constants';
import { mapState } from '@/plugins/fronteggCore/map-state'
import Spinner from '@/components/Common/Spinner.vue'
import { validateRequired, validatePasswordUsingOWASP, validatePasswordConfirmation, } from '@/plugins/fronteggCore/helpers/validates';

export default Vue.extend({
  name: 'ResetPassword',
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
      ...mapState(this, {
        activateState: (state: { auth: AuthState }) => state.auth.activateState,
        forgotPasswordState: (state: { auth: AuthState }) => state.auth.forgotPasswordState,
      }),
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
      return this.activateState.loading;
    },
    resetError() {
      return this.activateState.error;
    },
    passwordConfig() {
      return this.forgotPasswordState.passwordConfig
    }
  },
  mounted() {
    this.loadPasswordConfig();
  },
  watch: {
    password(value) {
      validatePasswordUsingOWASP(this.passwordConfig, value).then(error => {
        this.passError = error;
        if(this.confirmPassword.length) {
          this.$refs.form.validate();
        }
      })
    }
  },
  methods: {
    activateAccount() {
      this[FRONTEGG_STORE_KEY].dispatch({
        type: "auth/activateAccount",
        payload: {
          password: this.password,
          userId: this.userId,
          token: this.token,
        }
      });
    },
    loadPasswordConfig() {
      this[FRONTEGG_STORE_KEY].dispatch({
        type: "auth/loadPasswordConfig",
      });
    },
  },
});
</script>

<style lang="scss">
</style>