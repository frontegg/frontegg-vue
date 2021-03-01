<template>
  <v-row>
    <v-col cols="12">
      <div class="fe-center">
        {{ $t('auth.login.authentication-succeeded') }}
      </div>
      <div class="fe-relative fe-mt-4">
        <spinner />
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import i18n from "@/i18n";
import Spinner from "@/elements/Spinner.vue";

export default Vue.extend({
  name: "LoginSuccess",
  i18n,
  components: {
    Spinner,
  },
});
</script>

<style lang="scss">

</style>
