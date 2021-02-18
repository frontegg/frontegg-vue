<template>
  <div class='fe-login-page'>
    <v-container class="fe-login-container">
      <div class="fe-login-header">
        <img src="@/assets/main-logo.svg">
      </div>
      <div class="fe-login-component">
        <Spinner v-if="firstLoad" />
        <div v-else>
          <div v-if="error" class="fe-error-message">{{ error }}</div>
          <FButton
            @click="backToLogin()"
            :params="{
              type: 'button',
              fullWidth: true,
            }"
          >
            {{ $t('auth.login.back-to-login') }}
          </FButton>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Spinner from "@/components/Common/Spinner.vue";
import FButton from "@/components/core/elements/Button/FButton.vue";
import { mapState } from '@/plugins/fronteggCore/map-state';
import { FRONTEGG_STORE_KEY } from "@/plugins/fronteggCore/constants";

export default Vue.extend({
  name: 'SocailLoginsSuccess',
  components: {
    Spinner,
    FButton,
  },
  data() {
    return {
      ...mapState(this, {
        socialLoginsState: (state: { auth: AuthState }) => state.auth.socialLoginsState,
      }),
    }
  },
  computed: {
    isLoading() {
      return this.socialLoginsState.firstLoad || this.socialLoginsState.loading;
    },
    error() {
      return this.socialLoginsState.error;
    },
  },
  methods: {
    backToLogin() {
      this[FRONTEGG_STORE_KEY].dispatch({
        type: "auth/resetActivateState",
      });

      this.$router.push(this.authState.routes.loginUrl);
    }
  },
});
</script>
<style lang="scss">
@import '@/styles/auth/auth.scss';
</style>