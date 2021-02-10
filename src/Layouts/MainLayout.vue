<template>
  <div class="main-layout">
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "main-layout",
});
</script>

<style lang="scss" scoped>

</style>