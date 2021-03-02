<template>
  <div v-if="!fronteggLoaded">Loading...</div>
  <v-app id="app" v-else>
    <router-view />
  </v-app>
</template>

<style lang="scss"></style>


<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",
});
</script>
