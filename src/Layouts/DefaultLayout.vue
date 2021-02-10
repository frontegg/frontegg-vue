<template>
  <div class="default-layout">
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "DefaultLayout",
});
</script>

<style lang="scss" scoped>

</style>