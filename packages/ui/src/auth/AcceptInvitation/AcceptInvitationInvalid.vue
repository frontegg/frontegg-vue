<template>
  <v-row>
    <v-col cols="12">
      <div class="fe-error-message">
        {{ $t('auth.account.invalid-title') }}
        <br>
        {{ $t('auth.account.invalid-description') }}
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
import {mapAcceptInvitationActions} from "@frontegg/vue-core/auth";

export default Vue.extend({
  name: "AcceptInvitationInvalid",
  i18n,
  destroyed() {
    this.resetAcceptInvitationState();
  },
  methods: {
    resetAcceptInvitationState: mapAcceptInvitationActions('resetAcceptInvitationState'),
    backToLogin() {
      this.$router.push(Vue.fronteggAuth.routes.loginUrl);
    }
  },
});
</script>
