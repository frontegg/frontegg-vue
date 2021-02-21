<template>
  <v-app id="app">
    <component :is="layout">
      <router-view :layout.sync="layout" />
    </component>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

const defaultLayout = "default";
export default Vue.extend({
  name: "App",
  computed: {
    layout() {
      return (this.$route.meta.layout || defaultLayout) + "-layout";
    }
  }
});
</script>

<style lang="scss"></style>