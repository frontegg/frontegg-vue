<template>
  <PageHeader
    class="team-header"
    :pageTitle="pageTitle"
    :subTitle="subTitle"
  />
</template>

<script lang="ts">
import Vue from "vue";
import PageHeader from "@/components/PageHeader.vue";

export default Vue.extend({
  name: "TeamHeader",
  components: { PageHeader },
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

<style lang="scss" scoped>
</style>
