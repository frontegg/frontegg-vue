<template>
  <div class="hello">
    <slot />
    <br>
    email: {{ loginState.email }}
    <br>
    loading: {{ loginState.loading }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import mapState from '../plugins/fronteggCore/map-state'
import {AuthState} from "@/plugins/fronteggAuth/Api";

export default Vue.extend({
  name: 'Test',
  /* eslint-disable-next-line */
  data: mapState({
    loginState: (state: { auth: AuthState }) => state.auth.loginState
  }),
  mounted() {
    // console.log("store inside test Compo", this.store.getState())
    // console.log("mapState in test compo", this.auth)
  }
});
</script>

<style scoped lang="scss">

</style>
