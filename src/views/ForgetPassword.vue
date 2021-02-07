<template>
  <div class="fe-login-page">
    <spinner v-if="isLoading"></spinner>
    <v-container class="fe-login-container" v-else>
      <div class="fe-login-header">
        <img src="../assets/main-logo.svg" />
      </div>
      <div class="fe-forgot-password-component">
        <div as="div" class="fe-form">
          <v-form class="fe-form" v-model="isFormValid">
            <div class="fe-input fe-input-full-width">
              <div class="fe-input__header">
                <div class="fe-input__label">Enter your email</div>
              </div>
              <div>
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  name="email"
                  placeholder="name@example.com"
                />
              </div>
            </div>
            <button
              class="fe-button fe-button-primary fe-button-large fe-button-clickable fe-button-full-width"
              data-test-id="submit-btn"
              @click.prevent="remindMe"
            >
              Remind Me
            </button>
            <div class="fe-error-message">{{ this.backendError }}</div>
          </v-form>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { AuthState, LoginStep } from "@/plugins/fronteggAuth/Api";
import { FRONTEGG_STORE_KEY } from "@/plugins/fronteggCore/constants";
import { mapState } from "@/plugins/fronteggCore/map-state";
import Spinner from "@/components/Common/Spinner.vue";

export default Vue.extend({
  name: "ForgetPassword",
  components: {},
  data() {
    return {
      ...mapState(this, {
        forgotPasswordState: (state: { auth: any }) => state.auth.forgotPasswordState,
      }),
      email: '',
      emailRules: [
        (v: string) => !!v || "The Email is required",
        (v: string) =>
          !v ||
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "Must be a valid email",
      ],
      isFormValid: false,
    };
  },
  computed: {
    isLoading() {
      return this.forgotPasswordState.isLoading;
    },
    backendError() {
      return this.forgotPasswordState.error;
    },
  },
  methods: {
    remindMe() {
      this[FRONTEGG_STORE_KEY].dispatch({
        type: "auth/forgotPassword",
        payload: {
          email: this.email
        }
      });
    },
  },
  mounted() {
    this.email = this.forgotPasswordState.email;
  }
});
</script>


<style lang="scss">
.fe-login-page {
  position: absolute;
  top: 0;
  left: 0;
  background: var(--fe-auth-background, var(--color-white));
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 500px;
  overflow: auto;
}

.fe-login-container {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  max-width: 90%;
  min-height: 300px;
  box-shadow: 0 1.4px 4.5px rgba(0, 0, 0, 0.016),
    0 4.3px 12.5px rgba(0, 0, 0, 0.032), 0 10.3px 30.1px rgba(0, 0, 0, 0.055),
    0 29px 100px rgba(0, 0, 0, 0.14);
  background: var(--fe-auth-container-background, var(--color-white));
  border-radius: var(--fe-auth-container-border-radius, 0.5rem);
  padding: var(--fe-auth-container-paddig, 2rem);
  width: var(--fe-auth-container-width, 400px);
}

.fe-login-header {
  display: flex;
  justify-content: center;
  margin: 1rem 0 3rem;
  align-items: center;
  overflow-x: hidden;

  > * {
    max-width: 100%;
    max-height: 50px;
  }
}

@media screen and (max-width: 400px) {
  .fe-login-page {
    padding-top: 10vh;
    justify-content: flex-start;

    .fe-login-container {
      box-shadow: none;
    }
  }
}

.fe-forgot-password-component {
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
.fe-forgot-password-component {
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

<style scoped>
.v-stepper {
  box-shadow: none;
}
.v-stepper__content {
  padding: 0;
}
</style>