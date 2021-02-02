<template>
  <div class="fe-login-page">
    <div class="fe-login-container">
      <div class="fe-login-header">
        <img src="../assets/main-logo.svg">
      </div>
      <div class="fe-login-component">
        <LoginWithPassword />
        <SocialLogins />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import LoginWithPassword from '@/components/Login/LoginWithPassword.vue';
import SocialLogins from '@/components/Login/SocialLogins.vue';

export default Vue.extend({
  name: 'Home',
  components: {
    LoginWithPassword,
    SocialLogins,
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
