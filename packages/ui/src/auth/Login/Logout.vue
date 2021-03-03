<template>
  <spinner v-if="isLoading"/>
</template>

<script lang="ts">
import Vue from 'vue';
import {LoginStep} from "@frontegg/redux-store/auth";
import Spinner from "@/elements/Spinner.vue";
import {NavigationGuardNext, Route} from "vue-router/types/router";
import {mapAuthActions} from "@frontegg/vue-core/auth";

export default Vue.extend({
  name: 'Logout',
  components: {
    Spinner,
  },
  data() {
    return {
      LoginStep,
      ...this.mapLoginState()
    }
  },
  mounted() {
    this.logout(() => {
      this.$router.push(Vue.fronteggAuth.routes.loginUrl)
    })
  },
  computed: {
    isLoading(): boolean {
      return this.loginState.loading;
    },
  },
  methods: {
    logout: mapAuthActions('logout')
  },
  beforeRouteEnter(_to: Route, _from: Route, next: NavigationGuardNext) {
    next((vm: Vue) => {
      if (!vm.fronteggAuth.isAuthenticated) {
        vm.$nextTick(() => {
          vm.fronteggAuth.router.push(Vue.fronteggAuth.routes.loginUrl);
        })
      }
    })
  },
});
</script>

<style lang="scss">
@import '../../styles/auth/auth.scss';
</style>
