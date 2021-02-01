<template>
  <div class="fe-login-page">
  <div class="fe-login-container">
    <div class="fe-login-header"><img src="../assets/main-logo.svg"></div>
    <div class="fe-login-component">
      <div>Dont have an account? <span class="fe-login-component__back-to-sign-up-link" data-testid="email-box">Sign up.</span></div>
      <div as="div" class="fe-form">
        <form action="#">
          <div class="fe-input fe-input-full-width fe-input-in-form">
            <div class="fe-input__header">
              <div class="fe-input__label">Email</div>
            </div>
            <div class="fe-input__inner fe-input__inner-large"><input name="email" placeholder="name@example.com" data-testid="email-box" class="fe-input__input" type="email" value=""></div>
          </div>
          <span style="visibility: hidden; position: absolute;">
            <div class="fe-input fe-input-full-width fe-input-in-form fe-input-with-suffix-icon">
              <div class="fe-input__header">
                <div class="fe-input__label">Password</div>
                <button class="fe-button fe-input__label-button fe-button-clickable" type="button" test-id="forgot-password-button" tabindex="-1">Forgot Password?</button>
              </div>
              <div class="fe-input__inner fe-input__inner-large">
                <input name="password" tabindex="-1" placeholder="Enter Your Password" data-testid="password-box" class="fe-input__input" type="password" value="">
                <svg width="2rem" height="2rem" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="fe-icon fe-icon fe-icon-clickable">
                  <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7z
                    M2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27z
                    M7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2z
                    m4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"></path>
                </svg>
              </div>
            </div>
          </span>
          <button class="fe-button fe-button-disabled fe-button-large fe-button-clickable fe-button-full-width" type="submit" data-test-id="disabled-btn" data-testid="sumbit-btn" disabled="">Continue</button>
        </form>
      </div>
      <div class="fe-col fe-center">
        <div class="fe-social-login__or-container"><span>OR</span></div>
        <div>
          <button class="fe-button fe-social-login__button fe-social-login__button__google fe-button-clickable fe-button-full-width" type="button" data-test-id="googleSocialLogin-btn">
            <div class="fe-row fe-center">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" preserveAspectRatio="none" fill="white">
                  <g>
                    <path d="M 25.996094 48 C 13.3125 48 2.992188 37.683594 2.992188 25 C 2.992188 12.316406 13.3125 2 25.996094 2 C 31.742188 2 37.242188 4.128906 41.488281 7.996094 L 42.261719 8.703125 L 34.675781 16.289063 L 33.972656 15.6875 C 31.746094 13.78125 28.914063 12.730469 25.996094 12.730469 C 19.230469 12.730469 13.722656 18.234375 13.722656 25 C 13.722656 31.765625 19.230469 37.269531 25.996094 37.269531 C 30.875 37.269531 34.730469 34.777344 36.546875 30.53125 L 24.996094 30.53125 L 24.996094 20.175781 L 47.546875 20.207031 L 47.714844 21 C 48.890625 26.582031 47.949219 34.792969 43.183594 40.667969 C 39.238281 45.53125 33.457031 48 25.996094 48 Z"></path>
                  </g>
                </svg>
              </div>
              <div>Login with Google</div>
            </div>
          </button>
        </div>
        <div>
          <button class="fe-button fe-social-login__button fe-social-login__button__github fe-button-clickable fe-button-full-width" type="button" data-test-id="githubSocialLogin-btn">
            <div class="fe-row fe-center">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"></path>
                </svg>
              </div>
              <div>Login with Github</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Home',
});
</script>

<style scoped lang="scss">
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

  from {
    box-sizing: border-box;
    width: 100%;
  }
}

.fe-login-container {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  max-width: 90%;
  min-height: 300px;
  box-shadow: 0 1.4px 4.5px rgba(0, 0, 0, 0.016), 0 4.3px 12.5px rgba(0, 0, 0, 0.032),
    0 10.3px 30.1px rgba(0, 0, 0, 0.055), 0 29px 100px rgba(0, 0, 0, 0.14);
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

@media screen and (max-width: 400px) {
  .fe-login-page {
    padding-top: 10vh;
    justify-content: flex-start;

    .fe-login-container {
      box-shadow: none;
    }
  }
}
.fe-social-login {
  &__or-container {
    width: 100%;
    height: 0.8em;
    border-bottom: 1px solid var(--color-gray-4);
    text-align: center;
    margin: 2.5em 0;

    span {
      font-size: 1em;
      background-color: var(--color-white);
      padding: 1em;
      color: var(--color-gray-5);
      border: 1px solid var(--color-gray-4);
      border-radius: 2em;
    }
  }

  &__button {
    color: var(--color-white);

    div {
      div:last-of-type {
        flex-grow: 5;
        padding-right: 1.5rem;
      }
    }

    svg {
      width: 1.5rem;
      height: 1.5rem;
      margin-right: 1em;
      vertical-align: middle;
    }

    &__google {
      background-color: var(--color-google);
    }

    &__github {
      background-color: var(--color-github);
    }
  }
}
</style>
