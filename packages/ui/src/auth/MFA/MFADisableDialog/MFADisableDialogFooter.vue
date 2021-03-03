<template>  
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
        <FButton
          :params="{
            type: 'submit',
            fullWidth: false,
            variant:'danger',
            disabled: !isFormValid,
            loading: isLoading,
            'data-test-id': 'disabled-btn'
          }"
        >
          {{ $t('common.disable') }}
        </FButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { AuthState } from '@/plugins/fronteggAuth/Api';
import { mapState } from '@/plugins/fronteggCore/map-state'
import FButton from '@/components/core/elements/Button/FButton.vue'
export default Vue.extend({
  name: "MFADisableDialogFooter",
  components: {
    FButton,
  },
  props: {
    isFormValid: {
      type: Boolean
    }
  },
  data() {
    return {
      ...this.mapMfaState(),
    }
  },
  computed: {
    isLoading() {
      return this.$data.mfaState.loading;
    }
  },
  methods: {
    closeDialog() {
      this.$emit('close-dialog');
    }
  }
});
</script>

<style scoped lang="scss">
 .fe-dialog__footer .fe-button-danger {
   min-width: 72px;
 }
</style>