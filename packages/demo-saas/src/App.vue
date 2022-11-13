<template>
  <div id="app" v-if="fronteggLoaded">
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',
  data() {
    return {
      authorizedContent: true
    };
  },
});
</script>
