<template>
  <div id='app' v-if='fronteggLoaded'>
    <router-view />
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';

export default Vue.extend({
  name: 'App',

  updated() {
    this.loginIfNeeded();
  },
  data() {
    return { ...this.mapAuthState() };
  },
  methods: {
    loginIfNeeded: function() {
      if (!this.$data.authState.isLoading && !this.$data.authState.isAuthenticated) {
        this.loginWithRedirect();
      }
    },
  },
});
</script>
