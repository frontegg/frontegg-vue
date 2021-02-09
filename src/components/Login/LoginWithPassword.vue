<template>
  <v-row>
    <v-col cols="12">
      Dont have an account?
      <span class="fe-login-component__back-to-sign-up-link">Sign up.</span>
    </v-col>
    <v-col cols="12">
      <v-form class="fe-form" v-model="isFormValid">
        <div class="fe-input__header">
          <div class="fe-input__label">Email</div>
        </div>
        <div>
          <v-text-field
            name="email"
            v-model="email"
            :rules="rules.email"
            placeholder="name@example.com"
          ></v-text-field>
        </div>
        <div
          v-if="step === 'loginWithPassword'"
          class="fe-input fe-input-full-width fe-input-in-form fe-input-with-suffix-icon"
        >
          <div class="fe-input__header">
            <div class="fe-input__label">Password</div>
            <a
            class="fe-button fe-input__label-button fe-button-clickable"
            href="#"
            @click.prevent="navigateForgetPass">
            Forgot Password?
            </a>
          </div>
          <div class="password">
            <v-text-field
              v-model="password"
              tabindex="-1"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="rules.password"
              :type="showPassword ? 'text' : 'password'"
              name="password"
              placeholder="Enter Your Password"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </div>
        </div>
        <div class="continue">
          <button
            class="fe-button fe-button-primary fe-button-large fe-button-clickable fe-button-full-width"
            :class="{ 'fe-button-disabled': !isFormValid }"
            :disabled="!isFormValid"
            @click="loginSubmit"
          >
            <spinner v-if="isLoading"></spinner>
            {{ submitText }}
          </button>
          <div v-if="loginError" class="fe-error-message">
            {{ loginError }}
          </div>
        </div>
      </v-form>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import { FRONTEGG_STORE_KEY } from "@/plugins/fronteggCore/constants";
import { mapState } from "@/plugins/fronteggCore/map-state";
import Spinner from "@/components/Common/Spinner.vue";

export default Vue.extend({
  name: "LoginWithPassword",
  components: {
    Spinner,
  },
  data() {
    return {
      ...mapState(this, {
        loginState: (state: { auth: AuthState }) => state.auth.loginState,
      }),
      isFormValid: false,
      email: "",
      password: "",
      rules: {
        email: [
          (v: string) => !!v || "The Email is required",
          (v: string) =>
            !v ||
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
            "Must be a valid email",
        ],
        password: [
          (v: string) => !!v || "The Password is required",
          (v: string) =>
            !v || v.length >= 6 || "Password must be at least 6 characters",
        ],
      },
      showPassword: false,
    };
  },
  computed: {
    step() {
      return this.loginState.step;
    },
    submitText() {
      if (this.loginState.loading) {
        return "";
      } else if (this.loginState.step === "preLogin") {
        return "Continue";
      } else {
        return "Login";
      }
    },
    isLoading() {
      return this.loginState.loading;
    },
    loginError() {
      if (this.loginState.error) {
        return this.loginState.error;
      } else {
        return null;
      }
    },
  },
  methods: {
    loginSubmit(e) {
      e.preventDefault();
      if (this.loginState.step === "preLogin") {
        this[FRONTEGG_STORE_KEY].dispatch({
          type: "auth/preLogin",
          payload: {
            email: this.email,
          },
        });
      } else {
        this[FRONTEGG_STORE_KEY].dispatch({
          type: "auth/login",
          payload: {
            email: this.email,
            password: this.password,
          },
        });
      }
    },
    navigateForgetPass() {
      this[FRONTEGG_STORE_KEY].dispatch({
        type: "auth/setForgotPasswordState",
        payload: { email: this.email },
      });
      this[FRONTEGG_STORE_KEY].dispatch({
        type: "auth/resetLoginState",
      });

      this.$router.push('/account/forget-password');
    },
  },
  mounted() {
    console.log("call action here pp", this);
  },
});
</script>

<style lang="scss">

</style>