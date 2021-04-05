<template>
  <div id="app" v-if="fronteggLoaded">
    <router-view/>
  </div>
</template>

<style lang="scss"></style>


<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",
});
</script>
