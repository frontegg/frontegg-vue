<template>
  <div class="fe-col fe-center">
    <div class="fe-social-login__or-container">
      <span>OR</span>
    </div>
    <div>
      <button
        class="fe-button fe-social-login__button fe-social-login__button__google fe-button-clickable fe-button-full-width"
        type="button"
        data-test-id="googleSocialLogin-btn"
      >
        <div class="fe-row fe-center">
          <div>
            <FeIcon :params="{iconName:'google'}" />
          </div>
          <div>Login with Google</div>
        </div>
      </button>
    </div>
    <div>
      <button
        class="fe-button fe-social-login__button fe-social-login__button__github fe-button-clickable fe-button-full-width"
        type="button"
        data-test-id="githubSocialLogin-btn"
      >
        <div class="fe-row fe-center">
          <div>
            <FeIcon :params="{iconName:'github'}" />
          </div>
          <div>Login with Github</div>
        </div>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import FeIcon from "@/components/core/elements/Icons/FeIcon";

export default Vue.extend({
  name: "SocialLogins",
  components: {
    FeIcon
  },
  data() {
    return {};
  },
  methods: {}
});
</script>

<style lang="scss">
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
