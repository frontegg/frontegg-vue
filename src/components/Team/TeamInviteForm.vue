<template>
  <div>
    <v-form class="fe-form" @keyup.native.enter="submitForm" ref="form" v-model="isFormValid" lazy-validation>
      <div class="fe-input fe-input-full-width fe-input-in-form">
        <div class="fe-input__header">
          <div class="fe-input__label">{{ $t("common.name") }}</div>
        </div>
        <div :class="{ 'input-error': error.name }">
          <v-text-field
            v-model="form.name"
            :rules="formRules.nameRules"
            required
            :placeholder="$t('common.enter-name')"
          />
        </div>
      </div>

      <div class="fe-input fe-input-full-width fe-input-in-form">
        <div class="fe-input__header">
          <div class="fe-input__label">{{ $t("common.email") }}</div>
        </div>
        <div :class="{ 'input-error': error.email }">
          <v-text-field
            v-model="form.email"
            :rules="formRules.emailRules"
            required
            :placeholder="$t('common.enter-email')"
          />
        </div>
      </div>
    </v-form>
    <v-card-actions>
      <v-btn :class="{ 'fe-button-disabled': loading }" text @click="onCancel" class="fe-button">
        {{ $t("common.cancel") }}
      </v-btn>
      <v-btn
        text
        class="fe-button fe-button-large"
        :class="{ 'fe-button-disabled': !isFormValid }"
        :loading="loading"
        @click.prevent="submitForm"
      >
        {{ $t("common.invite") }}
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script lang="ts">
import { mapState } from "@/plugins/fronteggCore/map-state";
import { AuthState } from "@/plugins/fronteggAuth/Api";

import { teamActions } from "@/plugins/fronteggAuth/Api/TeamState/index.ts";

import { FRONTEGG_STORE_KEY } from "@/plugins/fronteggCore/constants";

export default {
  data() {
    return {
      ...mapState(this, {
        loading: (state: { auth: AuthState }) => state.auth.teamState.addUserDialogState.loading
      }),

      isFormValid: false,
      error: {
        name: false,
        email: false
      },
      form: {
        name: "",
        email: "",
        roleIds: []
      },
      formRules: {
        nameRules: [v => !!v || this.$t("validation.required-field", { name: this.$t("common.name") })],
        emailRules: [
          v => !!v || this.$t("validation.required-field", { name: this.$t("common.email") }),
          v => /.+@.+\..+/.test(v) || this.$t("validation.must-be-a-valid-email")
        ]
      }
    };
  },
  methods: {
    submitForm() {
      console.log("clcik");
      const valid = this.$refs.form.validate();
      if (valid) {
        this?.[FRONTEGG_STORE_KEY]?.dispatch(teamActions.addUser(this.form));
      }
    },
    onCancel() {
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
      this.$emit("onCloseModal", false);
    }
  }
};
</script>

<style></style>
