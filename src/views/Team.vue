<template>
  <div class="fe-team__page">
    <div style="position: absolute; justify-content: flex-end; right: 1rem; top: 1rem;">
      <router-link
        class="fe-button fe-button-primary fe-button-large fe-button-clickable"
        tag="button"
        to="/login"
      >
        login
      </router-link>
    </div>
    <PageHeader
      page-title="Team Management"
      sub-title="Total of 0 team members"
    />

    <TeamLayout />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import PageHeader from "@/components/PageHeader.vue";
import TeamLayout from "@/components/Team/TeamLayout.vue"

export default Vue.extend({
  name: "TeamView",
  components: { PageHeader, TeamLayout }
});
</script>

<style lang="scss" scoped></style>
