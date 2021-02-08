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
            <Spinner v-if="isLoading"/>
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
            !v || v.length > 6 || "Password must be at least 6 characters",
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
.fe-section-title {
  color: var(--color-gray-7);
  margin-bottom: 1rem;
  font-size: 1rem;
}

.fe {
  &-flex {
    display: flex;
    flex-direction: row;
    flex-flow: wrap;
    align-items: center;
  }

  &-full-width {
    width: 100%;
  }

  &-flex-no-wrap {
    flex-wrap: nowrap;
  }

  &-flex-spacer {
    flex: 1;
  }
}

.fe-login-component,
.fe-forgot-password-component,
.fe-accept-invitation-component,
.fe-activate-account-component {
  flex: 1;
  display: flex;
  flex-direction: column;

  .fe-recover-two-factor {
    a {
      text-decoration: underline;
      cursor: pointer;
    }
  }

  &__back-to-login {
    margin-top: 1rem;
  }

  .ui.loader.inline {
    display: block;
    margin: 2rem auto 1rem;
  }

  &__back-to-sign-up-link {
    cursor: pointer;
    color: var(--color-primary);

    &:hover {
      color: var(--color-primary-75);
    }
  }
}

.v-input {
  &.v-text-field.error--text,
  &.error--text {
    border-color: var(--color-danger);
    color: var(--color-danger);

    input {
      color: var(--color-danger);
    }
    .v-messages__message {
      color: var(--color-danger);
      padding: 6px 0;
    }
  }
}
.fe-login-component {
  .v-text-field > .v-input__control > .v-input__slot {
    &:before,
    &:after {
      content: none;
    }
  }
}

.v-input__slot {
  --size-font-size: var(--element-font-size-lg);
  --size-border-radius: var(--element-border-radius-sm);
  height: var(--size-height);
  font-size: var(--size-font-size);
  border-radius: var(--size-border-radius);
  padding: 0;
  overflow: hidden;
  display: inline-flex;
  position: relative;
  vertical-align: middle;
  align-items: center;
  height: var(--element-height);
  width: 100%;
  border-radius: var(--element-border-radius-sm);
  background-color: var(--color-white);
  color: var(--color-gray-8);
  border: 1px solid var(--element-border-color);
  padding-right: 8px;

  input {
    padding: 4px 8px;
  }
}
</style>