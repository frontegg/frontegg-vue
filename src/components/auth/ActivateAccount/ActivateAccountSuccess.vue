<template>
  <v-row>
    <v-col cols="12">
      <div class="fe-center fe-success-message">
        {{ $t('auth.activate-account.activation-succeeded') }}
      </div>
      <div class="fe-relative fe-mt-4">
        <spinner />
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import Spinner from "@/components/Common/Spinner.vue";
import { mapState } from '@/plugins/fronteggCore/map-state'
import { FRONTEGG_STORE_KEY } from '@/plugins/fronteggCore/constants';

export default Vue.extend({
  name: "ResetPasswordSuccess",
  components: {
    Spinner,
  },
  data() {
    return {
      ...mapState(this, {
        authState: (state: { auth: AuthState }) => state.auth,
      }),
    }
  },
  mounted() {
    setTimeout(() => {
      this[FRONTEGG_STORE_KEY].dispatch({
        type: "auth/resetActivateState",
      });
      this.$router.push(this.authState.routes.logoutUrl);
    }, 1000);
  },
});
</script>

<style lang="scss">

</style>