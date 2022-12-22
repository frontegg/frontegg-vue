<template>
  <div id="app" v-if="fronteggLoaded">
    <div v-if="authState.user">
      <span>Logged in as: {{ authState.user.name }}</span>
    </div>
    <div>
      <button v-if="authState.user" v-on:click="logout">Logout</button>
      <button v-if="authState.user" v-on:click="showAccessToken">What is my access token?</button>
      <button v-if="!authState.user" v-on:click="goToLogin">Login</button>
    </div>
  </div>
</template>

<script>
// export default {
//   name: 'App',
//   data() {
//     return {
//       fronteggLoaded: this.fronteggLoaded,
//       ...this.mapAuthState(),
//       authorizedContent: true,
//     };
//   },
//   methods: {
//     goToLogin() {
//       this.$router.push('/account/login');
//     },
//     showAccessToken() {
//       alert(this.authState.user.accessToken);
//     },
//     logout() {
//       this.$router.push('/account/logout');
//     },
//   },
// };

import { useFrontegg, useFronteggAuthGuard } from '@frontegg/vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();

    const { fronteggLoaded, authState } = useFrontegg();

    useFronteggAuthGuard();

    const goToLogin = () => {
      router.push('/account/login');
    };
    const logout = () => {
      router.push('/account/logout');
    };
    const showAccessToken = () => {
      alert(authState.user.accessToken);
    };

    return {
      fronteggLoaded,
      authState,
      goToLogin,
      logout,
      showAccessToken,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
