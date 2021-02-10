<template>
  <div class="default-layout">
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "default-layout",
});
</script>

<style lang="scss" scoped>

</style>