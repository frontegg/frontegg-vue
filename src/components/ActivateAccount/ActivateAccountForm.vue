<template>
  <v-row>
    <v-col cols="12">
      <v-form
        v-model="isFormValid"
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
          <div class="password">
            <v-text-field
              v-model="password"
              tabindex="-1"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="rules.password"
              :type="showPassword ? 'text' : 'password'"
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
          <div class="password">
            <v-text-field
              v-model="confirmPassword"
              tabindex="-1"
              :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
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
import { FRONTEGG_STORE_KEY } from '@/plugins/fronteggCore/constants';
import { mapState } from '@/plugins/fronteggCore/map-state'
import Spinner from '@/components/Common/Spinner.vue'

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
        forgotPasswordState: (state: { auth: AuthState }) => state.auth.forgotPasswordState,
      }),
      isFormValid: false,
      password: '',
      confirmPassword: '',
      showPassword: false,
      showConfirmPassword: false,
      rules: {
        password: [
          (v: string) => !!v || "The Password is required",
          (v: string) =>
            !v || v.length >= 6 || "Password must be at least 6 characters",
        ],
        confirmPassword: [
          (v: string) => !!v || "The Password is required",
          (v: string) => this.password === this.confirmPassword || 'Password must match',
        ]
      },
    }
  },
  computed: {
    isLoading() {
      return this.forgotPasswordState.loading;
    },
    resetError() {
      return this.forgotPasswordState.error;
    }
  },
  methods: {
    resetPassword() {
      console.log('reset password action')

      this[FRONTEGG_STORE_KEY].dispatch({
        type: "auth/resetPassword",
        payload: {
          password: this.password,
          userId: this.userId,
          token: this.token,
        }
      });
    },
  },

});
</script>

<style lang="scss">
</style>