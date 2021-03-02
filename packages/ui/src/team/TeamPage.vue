<template>
  <div class="fe-team__page">
    <TeamHeader
      :page-title="$t('auth.team.title')"
      :sub-title="$t('auth.team.subtitle', {totalItems: 100})"
    />
    <TeamLayout />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import i18n from '@/i18n';

import TeamHeader from "./TeamHeader.vue";
import TeamLayout from "./TeamLayout.vue";

export default Vue.extend({
  name: "Team",
  i18n,
  components: { TeamHeader, TeamLayout },
  data() {
    return {
      subTitle: 'Total times'
    }
  },
});
</script>

<style lang="scss"></style>
