<template>
  <v-row>
    <v-col cols="12">
      <div class="fe-center fe-success-message">
        {{ $t('auth.activate-account.activation-succeeded') }}
      </div>
      <div class="fe-relative fe-mt-3">
        <spinner/>
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import Spinner from "@/elements/Spinner.vue";
import {mapActivateAccountActions, mapAuthActions} from "@frontegg/vue-core/auth";
import i18n from '@/i18n';

export default Vue.extend({
  name: "ActivateAccountSuccess",
  i18n,
  components: {
    Spinner,
  },
  mounted() {
    this.requestAuthorize(true);
  },
  destroyed() {
    this.resetActivateState();
  },
  methods: {
    resetActivateState: mapActivateAccountActions('resetActivateState'),
    requestAuthorize: mapAuthActions('requestAuthorize'),
  }
});
</script>
