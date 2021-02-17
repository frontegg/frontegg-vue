<template>
  <v-row>
    <v-col cols="12">
      <v-form v-model="isFormValid" class="fe-form" @submit.prevent="verifyMfa">
        <MFAVerifyStepMessage />
        <MFAVerifyStepForm v-model="token" />
        <MFAVerifyStepErrorMessage />
        <MFAVerifyStepFooter :isFormValid="isFormValid" />
      </v-form>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import { FRONTEGG_STORE_KEY } from '@/plugins/fronteggCore/constants';
import MFAVerifyStepForm from "@/components/auth/MFA/MFAVerifyStep/MFAVerifyStepForm.vue";
import MFAVerifyStepErrorMessage from "@/components/auth/MFA/MFAVerifyStep/MFAVerifyStepErrorMessage.vue";
import MFAVerifyStepMessage from "@/components/auth/MFA/MFAVerifyStep/MFAVerifyStepMessage.vue";
import MFAVerifyStepFooter from "@/components/auth/MFA/MFAVerifyStep/MFAVerifyStepFooter.vue";

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
    verifyMfa() {
      this[FRONTEGG_STORE_KEY].dispatch({
        type: "auth/verifyMfa",
        payload: {
          token: this.token,
        }
      });
    }
  },
});
</script>

<style lang="scss">
</style>