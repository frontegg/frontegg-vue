<template>
  <v-row>
    <v-col cols="12">
      <div class="fe-center">
          ResetPasswordFailed
      </div>
    </v-col>
    <v-col cols="12">
      <button
        class="fe-login-component__back-to-login"
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

export default Vue.extend({
  name: "ResetPasswordFailed",
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