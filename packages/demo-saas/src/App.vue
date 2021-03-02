<template>
  <div v-if="!fronteggLoaded">
    Example of how to customize frontegg loading status
    <div style="font-size: 30px; color: red"> Loading...</div>
  </div>
  <v-app id="app" v-else>
    <router-view/>
  </v-app>
</template>

<style lang="scss"></style>


<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",
});
</script>
