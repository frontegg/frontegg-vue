<template>
  <v-row>
    <v-col cols="12">
      <div class="fe-center fe-sign-up__success-container">
        <h2>{{ $t('auth.sign-up.success.title') }}</h2>
        <div class='fe-sign-up__success-message'>{{ successMessage }}</div>
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import i18n from "@/i18n";
import Spinner from "@/elements/Spinner.vue";
import {mapAuthActions} from "@frontegg/vue-core/auth";
import {TranslateResult} from "vue-i18n";

export default Vue.extend({
  name: "SignUpSuccess",
  i18n,
  components: {
    Spinner,
  },
  destroyed() {
    this.resetSignUpStateSoft();
  },
  data() {
    return {
      ...this.mapSignUpState()
    }
  },
  computed: {
    successMessage(): TranslateResult {
      if (this.signUpState.shouldActivate) {
        return this.$t('auth.sign-up.success.activate-message')
      } else {
        return this.$t('auth.sign-up.success.go-to-login-message')
      }
    }
  },
  methods: {
    resetSignUpStateSoft: mapAuthActions('resetSignUpStateSoft'),
    requestAuthorize: mapAuthActions('requestAuthorize')
  }
});
</script>

<style lang="scss">

</style>
