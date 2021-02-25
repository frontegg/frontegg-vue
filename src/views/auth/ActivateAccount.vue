<template>
  <div class="fe-login-page">
    <spinner v-if="isLoading" />
    <v-container
      v-else
      class="fe-login-container"
    >
      <div class="fe-login-header">
        <img src="@/assets/main-logo.svg">
      </div>

      <div class="fe-activate-account-component">
        <div v-if="!userId || !token">
          <ActivateAccountFailed />
        </div>
        <div v-else-if="step === activateStep.success">
          <ActivateAccountSuccess />
        </div>
        <div v-else>
          <ActivateAccountForm
            :user-id="userId"
            :token="token"
          />
        </div>
      </div>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { AuthState, ActivateStep } from "@/plugins/fronteggAuth/Api";
import ActivateAccountForm from "@/components/auth/ActivateAccount/ActivateAccountForm.vue";
import ActivateAccountSuccess from "@/components/auth/ActivateAccount/ActivateAccountSuccess.vue";
import ActivateAccountFailed from "@/components/auth/ActivateAccount/ActivateAccountFailed.vue";
import { FRONTEGG_STORE_KEY } from "@/plugins/fronteggCore/constants";
import { mapState } from "@/plugins/fronteggCore/map-state";
import Spinner from "@/components/Common/Spinner.vue";
import { AuthStateKey } from '@/plugins/fronteggAuth';

export default Vue.extend({
  name: "ActivateAccount",
  components: {
    Spinner,
    ActivateAccountForm,
    ActivateAccountSuccess,
    ActivateAccountFailed,
  },
  data() {
    return {
      ...mapState(this, {
        authState: (state: { auth: AuthState }) => state.auth,
      }),
      activateStep: ActivateStep,
      url: new URL(window?.location.href),
      loading: false,
    };
  },
  computed: {
    isLoading() {
      return this.authState.isLoading || this.loading;
    },
    step() {
      return this.authState.forgotPasswordState.step || this.forgotPasswordStep.forgotPassword;
    },
    userId() {
      return this.url.searchParams.get('userId') || '';
    },
    token() {
      return this.url.searchParams.get('token') || '';
    },
    isAuthenticated() {
      return this.authState?.isAuthenticated;
    },
  },
  created() {
    const isAuthenticated = localStorage.getItem(AuthStateKey) || this.isAuthenticated;
    if(isAuthenticated) {
      this.loading = true;
    }
  },
  mounted() {
    this[FRONTEGG_STORE_KEY].dispatch({
      type: "auth/setState",
      payload: {
        isLoading: false,
      },
    });
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      const isAuthenticated = localStorage.getItem(AuthStateKey) || vm.isAuthenticated;
      if(isAuthenticated) {
        vm.$nextTick(() => {
          vm.$router.push(vm.authState.routes.authenticatedUrl);
        })
      }
    })
  },
});
</script>

<style lang="scss">
@import "@/styles/auth/login.scss";

.v-stepper {
  box-shadow: none;
}
.v-stepper__content {
  padding: 0;
}
</style>