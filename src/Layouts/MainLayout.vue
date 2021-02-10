<template>
  <div class="main-layout">
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "MainLayout",
});
</script>

<style lang="scss" scoped>

</style>