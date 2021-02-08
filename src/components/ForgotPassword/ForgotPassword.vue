<template>
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
</template>

<script lang="ts">
import Vue from "vue";
import { AuthState, ForgotPasswordState } from '@/plugins/fronteggAuth/Api';
import { FRONTEGG_STORE_KEY } from '@/plugins/fronteggCore/constants';
import { mapState } from '@/plugins/fronteggCore/map-state'
import Spinner from '@/components/Common/Spinner.vue'

export default Vue.extend({
  name: "ForgtPassword",
  data() {
    return {
      ...mapState(this, {
        forgotPasswordState: (state: { auth: AuthState }) => state.auth.forgotPasswordState,
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
