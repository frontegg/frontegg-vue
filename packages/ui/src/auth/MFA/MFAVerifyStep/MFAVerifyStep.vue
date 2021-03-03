<template>
  <v-row>
    <v-col cols="12">
      <v-form
        v-model="isFormValid"
        class="fe-form"
        @submit.prevent="verifyMfa"
      >
        <MFAVerifyStepMessage />
        <MFAVerifyStepForm v-model="token" />
        <MFAVerifyStepErrorMessage />
        <MFAVerifyStepFooter :is-form-valid="isFormValid" />
      </v-form>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import MFAVerifyStepForm from "./MFAVerifyStepForm.vue";
import MFAVerifyStepErrorMessage from "./MFAVerifyStepErrorMessage.vue";
import MFAVerifyStepMessage from "./MFAVerifyStepMessage.vue";
import MFAVerifyStepFooter from "./MFAVerifyStepFooter.vue";
import {mapMfaActions} from "@frontegg/vue-core/auth";

export default Vue.extend({
  name: "MFAVerifyStep",
  components: {
    MFAVerifyStepMessage,
    MFAVerifyStepForm,
    MFAVerifyStepErrorMessage,
    MFAVerifyStepFooter,
  },
  data() {
    return {
      isFormValid: false,
      token: '',
    }
  },
  methods: {
    _verifyMfa: mapMfaActions('verifyMfa'),
    verifyMfa() {
      this._verifyMfa({
        token: this.$data.token,
      })
    }
  },
});
</script>
