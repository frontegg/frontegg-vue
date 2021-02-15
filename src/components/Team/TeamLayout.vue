<template>
  <div class="fe-team__layout">
    <TeamTableToolbar
      v-model="searchValue"
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
      :total-pages.sync="totalPages"/>

    <FModal
      :open-modal="openModal"
      :headText="'Invite New Teammate'"
      @onCloseModal="onCloseModal"
    >
      <template #content>
        <TeamInviteForm @onCloseModal="onCloseModal" @itemCreated="fetchTableData" />
      </template>
    </FModal>
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
import FModal from "@/components/core/elements/Modal/FModal.vue";

import TeamInviteForm from "@/components/Team/TeamInviteForm.vue";

import { teamActions } from "@/plugins/fronteggAuth/Api/TeamState/index.ts";

import { TableOptions } from './interfaces';

export default Vue.extend({
  name: "TeamLayout",
  components: { TeamTableToolbar, TeamTable, TeamPagination, FModal, TeamInviteForm },
  data() {
    return {
      ...mapState(this, {
        teamState: (state: { auth: AuthState }) => state.auth.teamState,
        openModal: (state: { auth: AuthState }) => state.auth.teamState.addUserDialogState.open,
      }),

      currentPage: 1,
      searchValue: "",
      options: {} as TableOptions,
    }
  },
  computed: {
    totalPages() {
      return this.teamState.totalPages;
    },
  },
  methods: {
    onOpenModal() {
      console.log("onOpenModal");
      this?.[FRONTEGG_STORE_KEY]?.dispatch(
        teamActions.openAddUserDialog()
      );
    },
    onCloseModal() {
      console.log("onCloseModal");
      this?.[FRONTEGG_STORE_KEY]?.dispatch(
        teamActions.closeAddUserDialog()
      );
    },
    changeOptions(options: TableOptions) {
      this.options = {...options}
    },
    async fetchTableData() {
      interface Payload {
        pageOffset: number;
        sort?: [{
          id: string;
          desc: string;
        }];
        filter?: [{
          id: string;
          value: string;
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
      
      payload.filter = [{
        id: 'searchFilter',
        value: this.searchValue
      }],
      
      await this[FRONTEGG_STORE_KEY].dispatch({
        type: "auth/loadUsers",
        payload,
      });
    }
  },
  watch: {
    teamState: {
      deep: true,
      handler(newVal, oldVal) {
        console.log('newVal:', newVal);
        console.log('oldVal:', oldVal);
      }
    },
    options: {
      deep: true,
      handler() {
       this.fetchTableData();
      }
    },
    searchValue() {
      this.fetchTableData();
    }
  }
});
</script>

<style lang="scss" scoped>
</style>