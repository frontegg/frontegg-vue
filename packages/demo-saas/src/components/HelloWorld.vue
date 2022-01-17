<template>
  <div class="hello">
    <button data-test-id="open-admin-portal-btn" v-on:click="openAdminBox()">open</button>
    <button data-test-id="open-hosted" v-on:click="loginWithRedirect()">Open hosted login</button>
    <v-card class="mx-auto" max-width="300" tile>
      <v-list>
        <v-list-item-group>
          <v-list-item :to="'/team_management'">
            <v-list-item-content>
              <v-list-item-title>Team management</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            :to="
              this.authState.isAuthenticated ? this.fronteggAuth.routes.logoutUrl : this.fronteggAuth.routes.loginUrl
            "
          >
            <v-list-item-content>
              <v-list-item-title>{{ this.authState.isAuthenticated ? 'Logout' : 'Login' }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-on:click="openAdminBox">
            <v-list-item-content>
              <v-list-item-title>Admin Box</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
    <p></p>

    <p>{{ this.userEmail }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { AdminPortal, mapLoginActions } from '@frontegg/vue';

export default Vue.extend({
  name: 'HelloWorld',
  data() {
    return {
      ...this.mapAuthState(),
      ...this.mapLoginState(),
    };
  },
  methods: {
    login: mapLoginActions('login'),
    loginWithRedirect: mapLoginActions('loginWithRedirect'),
    openAdminBox() {
      AdminPortal.show();
    },
  },
  computed: {
    userEmail(): string {
      return this.authState.user?.email ?? 'Not Logged In';
    },
  },
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
