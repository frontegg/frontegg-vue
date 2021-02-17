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