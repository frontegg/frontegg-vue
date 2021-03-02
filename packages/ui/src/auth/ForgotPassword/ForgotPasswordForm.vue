<template>
  <v-form
    v-model="isFormValid"
    class="fe-form"
  >
    <div class="fe-input fe-input-full-width fe-input-in-form">
      <div class="fe-input__header">
        <div class="fe-input__label">
          {{ $t('auth.forgot-password.email-label') }}
        </div>
      </div>
      <div class="fe-input__inner-small">
        <v-text-field
          v-model="email"
          :outlined="true"
          :rules="emailRules"
          name="email"
          placeholder="name@example.com"
        />
      </div>
    </div>
    <button
      class="fe-button fe-button-primary fe-button-large fe-button-clickable fe-button-full-width"
      data-test-id="submit-btn"
      @click.prevent="remindMe"
    >
      <spinner v-if="isLoading" />
      <span v-else>
        {{ $t('auth.forgot-password.remind-me') }}
      </span>
    </button>
    <div class="fe-error-message">
      {{ this.backendError }}
    </div>
  </v-form>
</template>

<script lang="ts">
import Vue from "vue";
import Spinner from '@/components/Common/Spinner.vue'
import {mapForgotPasswordActions} from "@frontegg/vue-core/auth";
import { validateEmail } from "../../auth/utils";

export default Vue.extend({
  name: "ForgotPasswordForm",
  components: {
    Spinner,
  },
  data() {
    return {
      ...this.mapForgotPasswordState(),
      email: '',
      emailRules: validateEmail(),
      isFormValid: false,
    };
  },
  computed: {
    isLoading() {
      return this.$data.forgotPasswordState.loading;
    },
    backendError() {
      return this.$data.forgotPasswordState.error;
    },
  },
  mounted() {
    this.$data.email = this.$data.forgotPasswordState.email;
  },
  methods: {
    _forgotPassword: mapForgotPasswordActions('forgotPassword'),
    remindMe() {
      this._forgotPassword({
        email: this.$data.email
      });
    },
  }
});
</script>
