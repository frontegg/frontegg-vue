<template>
  <div class="fe-login-page">
    <v-container class="fe-login-container">
      <div class="fe-login-header">
        <img v-bind:src="headerImage">
      </div>
      <div class="fe-login-component">
        <div v-if="currentStep === SignUpStage.SignUp">
          <SignUpForm/>
          <SocialLogins/>
        </div>
        <div v-if="currentStep === SignUpStage.SignUpSuccess">
          <SignUpSuccess/>
        </div>
      </div>

    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import i18n from '@/i18n';
import Spinner from "@/elements/Spinner.vue";
import SocialLogins from "@/auth/SocialLogins/SocialLogins.vue";
import {NavigationGuardNext, Route} from "vue-router/types/router";
import {SignUpStage} from "@frontegg/redux-store/auth";
import {mapAuthActions} from "@frontegg/vue-core/auth";
import SignUpSuccess from "@/auth/SignUp/SignUpSuccess.vue";
import SignUpForm from "@/auth/SignUp/SignUpForm.vue";

export default Vue.extend({
  name: 'SignUp',
  i18n,
  components: {
    Spinner,
    SignUpForm,
    SocialLogins,
    SignUpSuccess,
  },
  data() {
    return {
      SignUpStage,
      ...this.mapAuthState(),
      ...this.mapSignUpState()
    }
  },
  destroyed() {
    this.resetSignUpState();
  },
  computed: {
    headerImage(): string {
      return this.authState.header || 'https://assets.frontegg.com/public-frontegg-assets/logo-transparent.png';
    },
    isAuthenticated(): boolean {
      return this.authState.isAuthenticated;
    },
    currentStep(): SignUpStage {
      return this.signUpState.stage;
    },
  },
  methods: {
    resetSignUpState: mapAuthActions('resetSignUpState'),
    backToLogin(): void {
      this.$router.push(this.fronteggAuth.routes.loginUrl);
    },
  },
  beforeRouteEnter(_to: Route, _from: Route, next: NavigationGuardNext) {
    next((vm: Vue) => {
      if (vm.fronteggAuth.isAuthenticated) {
        vm.$nextTick(() => {
          vm.fronteggAuth.router.push(Vue.fronteggAuth.routes.authenticatedUrl);
        })
      }
    })
  },
});
</script>

<style lang="scss">
@import '../../styles/auth/auth.scss';
</style>
