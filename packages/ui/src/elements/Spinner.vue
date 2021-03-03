<template>
  <v-container>
    <span class="fe-loader__inner fe-loader__inner-primary" />
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Spinner",
})
</script>

<style scoped>
.v-stepper {
  box-shadow: none;
}
.fe-loader__inner {
  width: 24px;
  height: 24px;
}
</style>
