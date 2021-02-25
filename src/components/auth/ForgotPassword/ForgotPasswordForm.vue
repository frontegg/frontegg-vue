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
import { AuthState, ForgotPasswordState } from '@/plugins/fronteggAuth/Api';
import { FRONTEGG_STORE_KEY } from '@/plugins/fronteggCore/constants';
import { mapState } from '@/plugins/fronteggCore/map-state'
import Spinner from '@/components/Common/Spinner.vue'
import { validateEmail } from '@/plugins/fronteggCore/helpers/validates';

export default Vue.extend({
  name: "ForgotPasswordForm",
  components: {
    Spinner,
  },
  data() {
    return {
      ...mapState(this, {
        forgotPasswordState: (state: { auth: AuthState }) => state.auth.forgotPasswordState,
      }),
      email: '',
      emailRules: validateEmail(),
      isFormValid: false,
    };
  },
  computed: {
    isLoading() {
      return this.forgotPasswordState.loading;
    },
    backendError() {
      return this.forgotPasswordState.error;
    },
  },
  mounted() {
    this.email = this.forgotPasswordState.email;
  },
  methods: {
    remindMe() {
      this[FRONTEGG_STORE_KEY].dispatch({
        type: "auth/forgotPassword",
        payload: {
          email: this.email
        }
      });
    },
  }
});
</script>

<style lang="scss">

</style>
