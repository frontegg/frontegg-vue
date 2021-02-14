

<template>
  <v-row>
    <v-col cols="12">

      <div class="fe-relative fe-mt-4">
        <spinner />
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import Spinner from "@/components/Common/Spinner.vue";

export default Vue.extend({
  name: "ForceEnrollMfa",
  components: {
    Spinner,
  },
});
</script>

<style lang="scss">

</style>