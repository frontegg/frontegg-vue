<template>
  <v-row>
    <v-col cols="12">
      <div class="fe-center fe-success-message">
        {{ $t('auth.account.pending-title') }}
      </div>
      <div class="fe-relative fe-mt-4">
        <spinner/>
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import Spinner from "@/elements/Spinner.vue";
import i18n from '@/i18n';

export default Vue.extend({
  name: "AcceptInvitationPending",
  i18n,
  components: {
    Spinner,
  },
});
</script>
