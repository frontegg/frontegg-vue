<template>
  <div class="fe-team__page">
    <div style="position: absolute; justify-content: flex-end; right: 1rem; top: 1rem;">
      <router-link
        class="fe-button fe-button-primary fe-button-large fe-button-clickable"
        tag="button"
        to="/account/login"
      >
        login
      </router-link>
    </div>
    <PageHeader
      :page-title="$t('auth.team.title')"
      :sub-title="subTitle"
    />
    <TeamLayout />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import PageHeader from "@/components/PageHeader.vue";
import TeamLayout from "@/components/Team/TeamLayout.vue";

import { mapState } from "@/plugins/fronteggCore/map-state";
import { AuthState } from "@/plugins/fronteggAuth/Api";

export default Vue.extend({
  name: "TeamView",
  components: { PageHeader, TeamLayout },
  data(): any {
    return {
      ...mapState(this, {
        totalItems: (state: { auth: AuthState }) => state.auth.teamState.totalItems,
      }),
    }
  },
  computed: {
    subTitle() {
      return this.$t('auth.team.subtitle', {totalItems: this.totalItems})
    }
  }
});
</script>

<style lang="scss" scoped></style>
