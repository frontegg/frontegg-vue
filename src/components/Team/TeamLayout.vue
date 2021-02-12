<template>
  <div class="fe-team__layout">
    <TeamTableToolbar
      v-model="searchFilter"
      @onOpenModal="onOpenModal"
    />
    
    <TeamTable
      @fetchTableData="changeOptions"
      :page.sync="currentPage"
    />
    <TeamPagination
      v-if="totalPages > 0"
      v-model="currentPage"
      :current-page.sync="currentPage" 
      :total-pages.sync="totalPages"  />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { mapState } from "@/plugins/fronteggCore/map-state";
import { AuthState } from "@/plugins/fronteggAuth/Api";
import { FRONTEGG_STORE_KEY } from "@/plugins/fronteggCore/constants";

import TeamTableToolbar from "@/components/Team/TeamTableToolbar.vue";
import TeamTable from "@/components/Team/TeamTable.vue";
import TeamPagination from "@/components/Team/TeamPagination.vue";

import { actions } from '@/plugins/fronteggAuth/Api/reducer.ts';


interface TableOptions {
  page: number;
  itemsPerPage: number;
  sortBy: [];
  sortDesc: [];
  groupBy: [];
  groupDesc: [];
  mustSort: boolean;
  multiSort: boolean;
}

export default Vue.extend({
  name: "TeamLayout",
  components: {TeamTableToolbar, TeamTable, TeamPagination},
  data() {
    return {
      ...mapState(this, {
        membersList: (state: { auth: AuthState }) => state.auth.teamState
      }),

      currentPage: 1,
      searchFilter: "",
      options: {} as TableOptions
    }
  },
  computed: {
    totalPages() {
      return this.membersList.totalPages;
    },
  },
  methods: {
    onOpenModal() {
      console.log('onOpenModal')
    },
    changeOptions(options: TableOptions) {
      this.options = {...options}
    },

    async fetchTableData() {
      interface Payload {
        pageOffset: number;
        sort?: [{
          id: any;
          desc: any;
        }];
        filter?: [{
          id: any;
          value: any;
        }];
      }

      const payload: Payload = {
        pageOffset: this.options.page - 1,
      }
      if(this.options.sortBy.length > 0) {
        payload.sort = [{
          id: this.options.sortBy[0],
          desc: this.options.sortDesc[0]
        }]
      }
      if(this.searchFilter) {
        payload.filter = [{
          id: 'searchFilter',
          value: this.searchFilter
        }]
      }
      console.log('payload:', payload);
      await this[FRONTEGG_STORE_KEY].dispatch({
        type: "auth/loadUsers",
        payload: {...payload}
      });
    }
  },
  watch: {
    options: {
      deep: true,
      handler() {
       this.fetchTableData();
      }
    },
    searchFilter(val) {
      if(!val) {
        // this.membersList.filter = [];
        actions.resetTeamState('filter');
        console.log('обунл', this.membersList.filter)
      }
      this.fetchTableData();
    }
  }
});
</script>

<style lang="scss" scoped>

</style>