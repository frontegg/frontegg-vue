<template>
  <v-form
    v-model="isFormValid"
    class="fe-form"
  >
    <div class="fe-input fe-input-full-width">
      <div class="fe-input__header">
        <div class="fe-input__label">
          Enter your email
        </div>
      </div>
      <div>
        <v-text-field
          v-model="email"
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
        Remind Me
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

export default Vue.extend({
  name: "ForgtPassword",
  components: {
    Spinner,
  },
  data() {
    return {
      ...mapState(this, {
        forgotPasswordState: (state: { auth: AuthState }) => state.auth.forgotPasswordState,
      }),
      email: '',
      emailRules: [
        (v: string) => !!v || "The Email is required",
        (v: string) =>
          !v ||
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "Must be a valid email",
      ],
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
