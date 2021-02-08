<template>
  <div class="home">
    <img
      alt="Vue logo"
      src="../assets/logo.png"
    >
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

export default Vue.extend({
  name: 'Home',
  components: {
    HelloWorld,
  },
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
