<template>
  <div class="hello">
    <v-card
      class="mx-auto"
      max-width="300"
      tile
    >
      <v-list>
        <v-list-item-group>
          <v-list-item :to="'/team_management'">
            <v-list-item-content>
              <v-list-item-title>Team management</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="'/account/login'">
            <v-list-item-content>
              <v-list-item-title>Login</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="'/account/forget-password'">
            <v-list-item-content>
              <v-list-item-title>Forget password</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
    <p></p>
    
    <p>{{ this.user ? this.user.email : "Not Logged in" }}</p>

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
// import {mapLoginActions} from "@frontegg/vue-core/auth";

export default Vue.extend({
  name: "HelloWorld",
  computed: {
    user() {
      return this.fronteggAuth.user
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
