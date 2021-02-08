<template>
  <div class="fe-login-page">
    <spinner v-if="isLoading" />
    <v-container
      v-else
      class="fe-login-container"
    >
      <div class="fe-login-header">
        <img src="../assets/main-logo.svg">
      </div>
      <div class="fe-forgot-password-component">
        <div
          as="div"
          class="fe-form"
        >
          <form action="#">
            <div class="fe-input fe-input-full-width fe-input-in-form">
              <div class="fe-input__header">
                <div class="fe-input__label">
                  Enter your email
                </div>
              </div>
              <div class="fe-input__inner">
                <input
                  v-model="email"
                  name="email"
                  placeholder="name@example.com"
                  data-test-id="email-box"
                  class="fe-input__input"
                  type="text"
                >
              </div>
            </div>
            <button
              class="fe-button fe-button-primary fe-button-large fe-button-clickable fe-button-full-width"
              type="submit"
              data-test-id="submit-btn"
              @click="remindMe"
            >
              Remind Me
            </button>
          </form>
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
      // email: '',
    };
  },
  computed: {
    isLoading() {
      return this.forgotPasswordState.isLoading;
    },
    email() {
      return this.forgotPasswordState.email
    },
  },
  methods: {
    remindMe(e) {
      e.preventDefault()
      console.log(this.email)
      this[FRONTEGG_STORE_KEY].dispatch({
        type: "auth/setForgotPasswordState",
        payload: { email: this.email },
      });
    },
  },
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

.fe-login-header {
  display: flex;
  justify-content: center;
  margin: 1rem 0 3rem;
  align-items: center;
  overflow-x: hidden;

  > * {
    max-width: 100%;
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
</style>

<style scoped>
.v-stepper {
  box-shadow: none;
}
.v-stepper__content {
  padding: 0;
}
</style>

