<template>
  <v-row>
    <v-col cols="12">
      <div class="fe-center fe-success-message fe-mb-4">
        {{ $t('auth.forgot-password.reset-email-sent') }}
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ForgotPasswordSuccess",
});
</script>
