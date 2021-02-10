<template>
  <div class="fe-team__layout">
    <TeamTableToolbar
      @onSearchChange="onSearchChange"
      @onOpenModal="onOpenModal"
    />
    <TeamTable />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TeamTableToolbar from "@/components/Team/TeamTableToolbar.vue";
import TeamTable from "@/components/Team/TeamTable.vue";

export default Vue.extend({
  name: "Team-layout",
  components: {TeamTableToolbar, TeamTable},
  methods: {
    onSearchChange(val: string) {
      console.log('onSearchChange:', val);
    },
    onOpenModal() {
      console.log('onOpenModal')
    }
  },
});
</script>

<style lang="scss" scoped>

</style>