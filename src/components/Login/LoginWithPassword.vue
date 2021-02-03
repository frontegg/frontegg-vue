<template>
  <v-row>
    <v-col
      cols="12"
    >
      Dont have an account?
      <span
        class="fe-login-component__back-to-sign-up-link"
      >Sign up.</span>
    </v-col>
    <v-col
      cols="12"
    >
    <v-form class="fe-form">
      <v-text-field
        name="email"
        v-model="email"
        :rules="emailRules"
        :label="'Email'"
        placeholder="name@example.com"
        dense
      ></v-text-field>
      <!-- <span style="visibility: hidden; position: absolute">
        <div
          class="fe-input fe-input-full-width fe-input-in-form fe-input-with-suffix-icon"
        >
          <div class="fe-input__header">
            <div class="fe-input__label">Password</div>
            <button
              class="fe-button fe-input__label-button fe-button-clickable"
              type="button"
              test-id="forgot-password-button"
              tabindex="-1"
            >
              Forgot Password?
            </button>
          </div>
          <div class="fe-input__inner fe-input__inner-large">
            <input
              name="password"
              tabindex="-1"
              placeholder="Enter Your Password"
              data-testid="password-box"
              class="fe-input__input"
              type="password"
              value=""
            >
            <svg
              width="2rem"
              height="2rem"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              class="fe-icon fe-icon fe-icon-clickable"
            >
              <path
                d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7z
                M2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27z
                M7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2z
                m4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"
              />
            </svg>
          </div>
        </div>
      </span> -->
      <button
        class="fe-button fe-button-large fe-button-clickable fe-button-full-width"
        :class="{ 'fe-button-disabled': isDisabled }"
        @click="loginSubmit"
      >
        Continue
      </button>
    </v-form>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import { FRONTEGG_STORE_KEY } from '@/plugins/fronteggCore/constants';
import mapState from '../../plugins/fronteggCore/map-state'

export default Vue.extend({
  name: "LoginWithPassword",
  data() {
    return {
      email: '',
      isDisabled: true,
      emailRules: [
        (v: string) => !!v || 'The Email is required',
        (v: string) => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Must be a valid email'
      ],
    };
  },
  methods: {
    loginSubmit(e) {
      e.preventDefault()
      // console.log("store", this[FRONTEGG_STORE_KEY])
      this[FRONTEGG_STORE_KEY].dispatch({
        type: 'auth/preLogin',
        payload: {
          email: this.email
        }
      });

      this[FRONTEGG_STORE_KEY].dispatch({
        type: 'auth/setLoginState',
        payload: {
          loading: true,
        }
      });

      this[FRONTEGG_STORE_KEY].dispatch({
        type: 'auth/setLoginState',
        payload: {
        'step': "loginWithPassword",
        'loading': false,
        }
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
