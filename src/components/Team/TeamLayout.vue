<template>
  <div class="fe-team__layout">
    <TeamTableToolbar
      @onSearchChange="onSearchChange"
      @onOpenModal="onOpenModal"
    />
    <TeamTable />
    <TeamPagination 
      :current-page="currentPage" 
      :total-pages="totalPages" 
      @changePage="changePage" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TeamTableToolbar from "@/components/Team/TeamTableToolbar.vue";
import TeamTable from "@/components/Team/TeamTable.vue";
import TeamPagination from "@/components/Team/TeamPagination.vue";

export default Vue.extend({
  name: "TeamLayout",
  components: {TeamTableToolbar, TeamTable, TeamPagination},
  data() {
    return {
      currentPage: 2,
      totalPages: 8,
    }
  },
  methods: {
    onSearchChange(val: string) {
      console.log('onSearchChange:', val);
    },
    onOpenModal() {
      console.log('onOpenModal')
    },
    changePage(val: number) {
      console.log('Current page:',val)
    }
  },
});
</script>

<style lang="scss" scoped>

</style>