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