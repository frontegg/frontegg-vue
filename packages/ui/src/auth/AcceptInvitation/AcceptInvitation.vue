<template>
  <div class="fe-login-page">
    <v-container class="fe-login-container">
      <div class="fe-login-header">
        <img v-bind:src="headerImage">
      </div>

      <div class="fe-activate-account-component">
        <div v-if="step === AcceptInvitationStep.invalid">
          <AcceptInvitationInvalid/>
        </div>
        <div v-if="step === AcceptInvitationStep.pending">
          <AcceptInvitationPending/>
        </div>
        <div v-if="step === AcceptInvitationStep.success">
          <AcceptInvitationSuccess/>
        </div>
        <div v-if="step === AcceptInvitationStep.failed">
          <AcceptInvitationFailed/>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Spinner from "@/elements/Spinner.vue";
import i18n from "@/i18n";
import {mapAcceptInvitationActions} from "@frontegg/vue-core/auth";
import {AcceptInvitationStep} from "@frontegg/redux-store/auth";
import AcceptInvitationInvalid from "./AcceptInvitationInvalid.vue";
import AcceptInvitationPending from "./AcceptInvitationPending.vue";
import AcceptInvitationSuccess from "./AcceptInvitationSuccess.vue";
import AcceptInvitationFailed from "./AcceptInvitationFailed.vue";

export default Vue.extend({
  name: "AcceptInvitation",
  i18n,
  components: {
    Spinner,
    AcceptInvitationInvalid,
    AcceptInvitationPending,
    AcceptInvitationSuccess,
    AcceptInvitationFailed,
  },
  data() {
    return {
      AcceptInvitationStep,
      ...this.mapAuthState(),
      ...this.mapAcceptInvitationState(),
      url: new URL(window?.location.href),
    };
  },
  mounted() {
    this.acceptInvitation({userId: this.userId, token: this.token});
  },
  computed: {
    step(): AcceptInvitationStep {
      return this.acceptInvitationState.step;
    },
    userId(): string {
      return this.url.searchParams.get('userId') ?? '';
    },
    token(): string {
      return this.url.searchParams.get('token') ?? '';
    },
    headerImage(): string {
      return this.authState.header || 'https://assets.frontegg.com/public-frontegg-assets/logo-transparent.png';
    },
  },
  methods: {
    acceptInvitation: mapAcceptInvitationActions('acceptInvitation')
  }
});
</script>

<style lang="scss">
@import '../../styles/auth/auth.scss';

.v-stepper {
  box-shadow: none;
}

.v-stepper__content {
  padding: 0;
}
</style>
