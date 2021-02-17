<template>
  <v-row>
    <v-col cols="12">
      <div class='fe-dialog__footer'>
        <div class='fe-flex-spacer' />
        <button class="fe-button fe-button-primary fe-button-large fe-button-clickable"  @click="onClose">
          {{ $t('common.done') }}
        </button>
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "MFARecoveryCodeStepFooter",
  methods: {
    onClose() {
      // close modal
    }
  }
});
</script>

<style lang="scss">

</style>

