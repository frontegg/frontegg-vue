<template>
  <v-row>
    <v-col cols="12">
      <div class="fe-center fe-success-message fe-mb-4">
          A password reset email has been sent to your registered email address
      </div>
    </v-col>
    <v-col cols="12">
        <button
        v-if="showBackBtn"
        class='fe-login-component__back-to-login'
        @click="onRedirectTo(routes.loginUrl); resetLoginState();"
        >
            Back to Login
        </button>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import { AuthState, ForgotPasswordStep } from "@/plugins/fronteggAuth/Api";
import { FRONTEGG_STORE_KEY } from "@/plugins/fronteggCore/constants";
import { mapState } from "@/plugins/fronteggCore/map-state";

export default Vue.extend({
  name: "ForgotPasswordSuccess",
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