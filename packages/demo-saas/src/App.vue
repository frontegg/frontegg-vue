<template>
  <div id="app" v-if="fronteggLoaded">
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

/*
Add this in order to have authorizeContentGuard
export default Vue.extend({
  name: 'App',
  data() {
    return {
      authorizedContent: true
    };
  },
});
 */

export default Vue.extend({
  name: 'App',
});
</script>
