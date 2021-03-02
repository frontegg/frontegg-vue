<template>
  <div class="fe-input fe-input-full-width fe-input-in-form">
    <div class="fe-input__header">
      <div class="fe-input__label">
        {{ $t('auth.mfa.disable.enter-generated-code') }}
      </div>
    </div>
    <v-text-field
      :rules="rules.code"
      name="token"
      :disabled="loading"
      placeholder="Ex. 1 2 3 4 5 6"
      :outlined="true"
      aria-autocomplete="false"
      auto-complete="off"
      @input="updateValue($event)"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { AuthState } from "@/plugins/fronteggAuth/Api";
import { mapState } from "@/plugins/fronteggCore/map-state";

export default Vue.extend({
  name: "MFADisableDialogForm",
  props: {
    value: {
      type: String,
    },
  },
  data() {
    return {
      ...this.mapMfaState(),
      rules: {
        code: [
          (v: string) =>
            !!v || this.$t("validation.required-field", { name: "code" }),
          (v: string) =>
            !v ||
            v.length === 6 ||
            this.$t("validation.min-length", { name: "code", limit: 6 }),
        ],
      },
    };
  },
  computed: {
    loading() {
      return this.$data.mfaState.loading;
    },
  },
  methods: {
    updateValue(value: any) {
      this.$emit("input", value);
    },
  },
});
</script>
