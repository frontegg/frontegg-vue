<template>
  <div v-if="!fronteggLoaded" style="min-height: 100vh; justify-content: center; display: flex; align-items: center; text-align: center;">
    <div>
      Example of how to customize frontegg loading status
      <br/>
      <br/>
      <div style="font-size: 30px; color: red"> Loading...</div>
    </div>
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
