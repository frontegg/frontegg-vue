<template>
  <div class="hello">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import mapState from "./../plugins/fronteggCore/map-state";

export default Vue.extend({
  name: 'Test',
  /* eslint-disable-next-line */
  data: mapState(
    "auth",
    "audits"
  ),
  mounted() {
    console.log("store inside test Compo", this.store.getState())
    console.log("mapState in test compo", this.auth)
  }
});
</script>

<style scoped lang="scss">

</style>
