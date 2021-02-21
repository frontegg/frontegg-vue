<template>
  <div
    v-if="issocialLoginsConfig"
    class="fe-col fe-center"
  >
    <Spinner v-if="firstLoad" />
    <div
      v-else-if="error"
      class="fe-error-message"
    >
      {{ error }}
    </div>
    <div v-else>
      <div class="fe-social-login__or-container">
        <span>OR</span>
      </div>
      <GoogleLogin />
      <GithubLogin />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import GoogleLogin from "./GoogleLogin.vue";
import GithubLogin from "./GithubLogin.vue";
import Spinner from "@/components/Common/Spinner.vue";
import { mapState } from '@/plugins/fronteggCore/map-state';
import { FRONTEGG_STORE_KEY } from "@/plugins/fronteggCore/constants";

export default Vue.extend({
  name: 'SocialLogins',
  components: {
    GoogleLogin,
    GithubLogin,
    Spinner,
  },
  data() {
    return {
      ...mapState(this, {
        socialLoginsState: (state: { auth: AuthState }) => state.auth.socialLoginsState,
      }),
    }
  },
  computed: {
    firstLoad() {
      return this.socialLoginsState.firstLoad;
    },
    socialLoginsConfig() {
      return this.socialLoginsState.socialLoginsConfig;
    },
    issocialLoginsConfig() {
      return this.socialLoginsConfig?.length && this.socialLoginsConfig.some(({ active }) => active)
    },
    error() {
      return this.socialLoginsState.error;
    },
  },
  watch: {
    firstLoad(value) {
      if(value) {
        this.loadSocialLoginsConfiguration();
      }
    }
  },
  methods: {
    loadSocialLoginsConfiguration() {
      this[FRONTEGG_STORE_KEY].dispatch({
        type: "auth/loadSocialLoginsConfiguration",
      });
    },
  },
});
</script>
