<template>
  <div class="fe-page-header fe-team__header">
    <div class="fe-left">
      <div class="fe-title">
        {{pageTitle}}
        <div class="fe-subtitle">{{subTitle}}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Page-header",
  props: {
    pageTitle: {
      type: String,
      default: ''
    },
    subTitle: {
      type: String,
      default: ''
    }
  }
});
</script>

<style lang="scss" scoped></style>
