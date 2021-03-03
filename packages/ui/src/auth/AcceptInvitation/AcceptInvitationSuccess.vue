<template>
  <v-row>
    <v-col cols="12">
      <div class="fe-center fe-success-message">
        {{ $t('auth.account.success-title') }}
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
import {mapAcceptInvitationActions, mapAuthActions} from "@frontegg/vue-core/auth";
import i18n from '@/i18n';

export default Vue.extend({
  name: "AcceptInvitationSuccess",
  i18n,
  components: {
    Spinner,
  },
  mounted() {
    setTimeout(() => {
      this.$router.push(Vue.fronteggAuth.routes.loginUrl);
    }, 2000)
  },
  destroyed() {
    this.resetAcceptInvitationState();
  },
  methods: {
    resetAcceptInvitationState: mapAcceptInvitationActions('resetAcceptInvitationState'),
    requestAuthorize: mapAuthActions('requestAuthorize'),
  }
});
</script>
