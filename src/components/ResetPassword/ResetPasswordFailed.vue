<template>
  <v-row>
    <v-col cols="12">
      <div class="fe-error-message">
        Reset Password Failed
        <br />
        {{ resetError }}
      </div>
      <button
        class="fe-forgot-password-component__back-to-login"
        @click="backToLogin()"
        >
        Back to Login
      </button>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import { FRONTEGG_STORE_KEY } from "@/plugins/fronteggCore/constants";
import { mapState } from '@/plugins/fronteggCore/map-state'

export default Vue.extend({
  name: "ResetPasswordFailed",
  data() {
    return {
      ...mapState(this, {
        authState: (state: { auth: AuthState }) => state.auth,
      }),
    }
  },
  computed: {
    resetError() {
      return this.forgotPasswordState.error;
    }
  },
  methods: {
    backToLogin() {
      this[FRONTEGG_STORE_KEY].dispatch({
        type: "auth/resetForgotPasswordState",
      });

      this.$router.push(this.authState.routes.loginUrl);
    }
  },
});
</script>

<style lang="scss">

</style>