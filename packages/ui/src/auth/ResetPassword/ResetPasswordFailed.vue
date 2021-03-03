<template>
  <v-row>
    <v-col cols="12">
      <div class="fe-error-message">
        {{ $t('auth.forgot-password.reset-password-failed-title') }}
        <br>
        {{ $t('auth.forgot-password.reset-password-failed-description') }}
      </div>
      <button
        class="fe-forgot-password-component__back-to-login"
        @click="backToLogin()"
      >
        {{ $t('auth.login.back-to-login') }}
      </button>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import {mapForgotPasswordActions} from "@frontegg/vue-core/auth";

export default Vue.extend({
  name: "ResetPasswordFailed",
  data() {
    return {
      ...this.mapAuthState(),
    }
  },
  methods: {
    _resetForgotPasswordState: mapForgotPasswordActions('resetForgotPasswordState'),
    backToLogin() {
      this._resetForgotPasswordState();
      this.$router.push(this.$data.authState.routes.loginUrl);
    }
  },
});
</script>

<style lang="scss">

</style>