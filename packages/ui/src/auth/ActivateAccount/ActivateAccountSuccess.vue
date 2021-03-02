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
import Spinner from "@/elements/Spinner.vue";
import {mapActivateAccountActions} from "@frontegg/vue-core/auth";

export default Vue.extend({
  name: "ActivateAccountSuccess",
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
      this._resetActivateState();
      this.$router.push(this.$data.authState.routes.logoutUrl);
    }, 1000);
  },
  methods: {
    _resetActivateState: mapActivateAccountActions('resetActivateState'),
  }
});
</script>
