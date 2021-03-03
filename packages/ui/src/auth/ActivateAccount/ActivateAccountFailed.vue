<template>
  <v-row>
    <v-col cols="12">
      <div class="fe-error-message">
        {{ $t('auth.activate-account.failed-title') }}
        <br>
        {{ $t('auth.activate-account.failed-description') }}
      </div>
      <button
        class="fe-forgot-password-component__back-to-login"
        @click="backToLogin()"
      >
        {{ $t('auth.activate-account.back-to-login') }}
      </button>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import i18n from '@/i18n';
import {mapActivateAccountActions} from "@frontegg/vue-core/auth";

export default Vue.extend({
  name: "ActivateAccountFailed",
  i18n,
  destroyed() {
    this.resetActivateState();
  },
  methods: {
    resetActivateState: mapActivateAccountActions('resetActivateState'),
    backToLogin() {
      this.$router.push(Vue.fronteggAuth.routes.loginUrl);
    }
  },
});
</script>
