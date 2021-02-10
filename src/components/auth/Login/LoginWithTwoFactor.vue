

<template>
  <v-row>
    <v-col cols="12">
      <v-form
        v-model="isFormValid"
        class="fe-form"
      >
        <div class="fe-input fe-input-full-width fe-input-in-form">
          <div class="fe-input__header">
            <div class="fe-input__label">
              {{ $t("auth.login.please-enter-the-6-digit-code") }}
            </div>
          </div>
          <div>
            <v-text-field
              v-model="code"
              name="code"
              :rules="rules.email"
              aria-autocomplete="none"
              autocomplete="off"
            />
          </div>
        </div>
        <button
          class="fe-button fe-button-disabled fe-button-large fe-button-clickable fe-button-full-width"
          type="submit"
          data-test-id="submit-btn"
          disabled=""
        >
          {{ $t("auth.login.login") }}
        </button>
        <div class="fe-note">
          <div class="fe-note-title">
            {{ $t("auth.login.disable-two-factor-title") }}
          </div>
          <div class="fe-note-description fe-recover-two-factor">
            <a test-id="recover-two-factor-button">{{
              $t("common.click-here")
            }}</a>
            &nbsp;
            {{ $t("auth.login.disable-two-factor-description") }}
          </div>
        </div>
      </v-form>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "@/plugins/fronteggCore/map-state";
import Spinner from "@/components/Common/Spinner.vue";

export default Vue.extend({
  name: "LoginSuccess",
  components: {
  },
    data() {
    return {
      ...mapState(this, {
        loginState: (state: { auth: AuthState }) => state.auth.loginState,
      }),
      isFormValid: false,
      code: '',
      rules: {
        code: [
          (v: string) => !!v || "The Password is required",
          (v: string) =>
            !v || v.length >= 6 || "Password must be at least 6 characters",
        ],
      },
    };
  },
});
</script>

<style lang="scss">
</style>