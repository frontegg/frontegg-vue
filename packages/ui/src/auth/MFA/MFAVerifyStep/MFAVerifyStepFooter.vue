<template>
  <v-row>
    <v-col cols="12">
      <div class="fe-dialog__footer">
        <div class="fe-grid fe-container">
          <div class="fe-grid fe-item fe-grid-xs-true">
            <button
              class="fe-button fe-button-large fe-button-clickable"
              type="button"
              @click="closeDialog"
            >
              {{ $t('common.cancel') }}
            </button>
          </div>
          <div class="fe-grid fe-item fe-grid-xs-true fe-text-align-end">
            <button
              class="fe-button fe-button-large fe-button-clickable"
              :class="!isFormValid ? 'fe-button-disabled' : ''"
              :disabled="!isFormValid"
              type="submit"
              data-test-id="disabled-btn"
            >
              {{ $t('common.verify') }}
            </button>
          </div>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "MFAVerifyStepFooter",
  props: {
    isFormValid: {
      type: Boolean
    }
  },
  data() {
    return {
      ...this.mapMfaState(),
    };
  },
  computed: {
    loading() {
      return this.$data.mfaState.loading;
    },
  },
  methods: {
    closeDialog() {
      // TODO: close dialog by ref ..
    }
  },
});
</script>

<style lang="scss">
</style>