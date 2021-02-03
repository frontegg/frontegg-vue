<template>
  <v-row>
    <v-col cols="12">
      Dont have an account?
      <span class="fe-login-component__back-to-sign-up-link">Sign up.</span>
    </v-col>
    <v-col cols="12">
      <v-form class="fe-form">
        <div class="fe-input__header">
          <div class="fe-input__label">Email</div>
        </div>
        <v-text-field
          name="email"
          v-model="email"
          :rules="rules.email"
          placeholder="name@example.com"
          dense
        ></v-text-field>
        <v-container>
          <v-row
            v-show="step === 'loginWithPassword'"
            class="fe-input fe-input-full-width fe-input-in-form fe-input-with-suffix-icon"
          >
            <v-col class="fe-input__header" cols="12">
              <div class="fe-input__label">Password</div>
              <button
                class="fe-button fe-input__label-button fe-button-clickable"
                type="button"
                test-id="forgot-password-button"
                tabindex="-1"
              >
                Forgot Password?
              </button>
            </v-col>
            <v-col class="fe-input__inner fe-input__inner-large" cols="12">
              <v-text-field
                class="fe-input__input"
                v-model="password"
                tabindex="-1"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="rules.password"
                :type="showPassword ? 'text' : 'password'"
                name="password"
                placeholder="Enter Your Password"
                @click:append="showPassword = !showPassword"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <button
                class="fe-button fe-button-large fe-button-clickable fe-button-full-width"
                :class="{ 'fe-button-disabled': isDisabled }"
                @click="loginSubmit"
              >
                Continue
              </button>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import { FRONTEGG_STORE_KEY } from "@/plugins/fronteggCore/constants";
import { mapState } from "@/plugins/fronteggCore/map-state";

export default Vue.extend({
  name: "LoginWithPassword",
  data() {
    return {
      ...mapState(this, {
        loginState: (state: { auth: AuthState }) => state.auth.loginState,
      }),
      email: "",
      password: "",
      isDisabled: true,
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
            !v || v.length < 6 || "Password must be at least 6 characters",
        ],
      },
      showPassword: false,
    };
  },
  computed: {
    step() {
      return this.loginState.step;
    },
  },
  methods: {
    loginSubmit(e) {
      e.preventDefault();
      this[FRONTEGG_STORE_KEY].dispatch({
        type: "auth/preLogin",
        payload: {
          email: this.email,
        },
      });

      this[FRONTEGG_STORE_KEY].dispatch({
        type: "auth/setLoginState",
        payload: {
          loading: true,
        },
      });

      this[FRONTEGG_STORE_KEY].dispatch({
        type: "auth/setLoginState",
        payload: {
          step: "loginWithPassword",
          loading: false,
        },
      });
    },
  },
  mounted() {
    console.log("call action here pp", this[FRONTEGG_STORE_KEY]);
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
</style>
<style scoped>
  .v-text-field__slot {
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
  }
</style>