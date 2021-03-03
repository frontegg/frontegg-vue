<template>
  <v-row>
    <v-col cols="12">
      <div class="fe-center fe-success-message">
        {{ $t('auth.forgot-password.password-has-been-changed') }}
      </div>
      <div class="fe-relative fe-mt-4">
        <spinner />
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import Spinner from "@/elements/Spinner.vue";
import {mapForgotPasswordActions} from "@frontegg/vue-core/auth";

export default Vue.extend({
  name: "ResetPasswordSuccess",
  components: {
    Spinner,
  },
  data() {
    return {
      ...this.mapAuthState(),
    }
  },
  mounted() {
    setTimeout(() => {
      this._resetForgotPasswordState();
      this.$router.push(this.$data.authState.routes.loginUrl);
    }, 1000);
  },
  methods: {
    _resetForgotPasswordState: mapForgotPasswordActions('resetForgotPasswordState'),
  }
});
</script>
