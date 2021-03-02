<template>
  <div class="hello">

    <p>{{ this.userEmail }}</p>

    <div>Login Loading: {{ this.loginState.loading }}</div>

    <button v-on:click="login({email: 'david+1@frontegg.com', password: 'david93'})">
      login
    </button>
    <p>
      For a guide and recipes on how to configure / customize this project,<br/>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener"
      >vue-cli documentation</a
      >.
    </p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {mapLoginActions} from "@frontegg/vue-core/auth";
import {AuthState, LoginState} from "@frontegg/redux-store/auth";
// import {mapLoginActions} from "@frontegg/vue-core/auth";

export default Vue.extend({
  name: "HelloWorld",
  data(): { authState: AuthState, loginState: LoginState } {
    return {
      ...this.mapAuthState(),
      ...this.mapLoginState(),
    }
  },
  methods: {
    login: mapLoginActions('login')
  },
  computed: {
    userEmail(): string {
      return this.authState.user?.email ?? 'Not Logged In'
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
