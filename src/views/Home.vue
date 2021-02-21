<template>
  <div class="home">
    <img
      alt="Vue logo"
      src="@/assets/logo.png"
      style="margin: 0 auto"
      class="d-block"
    >
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
  </div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Home",
  data() {
    return {
      selectedItem: 1
    };
  }
});
</script>
