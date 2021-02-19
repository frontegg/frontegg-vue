<template>
  <div class="fe-team__layout">
    <TeamTableToolbar v-model="searchValue" @onOpenModal="onOpenModal" />

    <TeamTable :page.sync="currentPage" @fetchTableData="changeOptions" @itemDeleted="fetchTableData" />

    <TeamPagination
      v-if="totalPages > 0"
      v-model="currentPage"
      :current-page.sync="currentPage"
      :total-pages.sync="totalPages"
    />

    <FModal :open-modal="openModal" v-if="openModal" :head-text="$t('auth.team.add-dialog.title')" @onCloseModal="onCloseModal" >
      <template #content>
        <TeamInviteForm @onCloseModal="onCloseModal" @itemCreated="fetchTableData" :roles="roles"/>
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

// interfaces
import { TableOptions } from "./interfaces";
import { ILoadUsers } from "@frontegg/rest-api";

export default Vue.extend({
  name: "TeamLayout",
  components: { TeamTableToolbar, TeamTable, TeamPagination, FModal, TeamInviteForm },
  data(): any {
    return {
      ...mapState(this, {
        teamState: (state: { auth: AuthState }) => state.auth.teamState,
        openModal: (state: { auth: AuthState }) => state.auth.teamState.addUserDialogState.open
      }),

      currentPage: 1,
      searchValue: "",
      options: {} as TableOptions
    };
  },
  computed: {
    totalPages(): any {
      return this.teamState.totalPages;
    },
    roles(): any {
      return this.teamState.roles;
    }
  },

  watch: {
    options: {
      deep: true,
      handler() {
        this.fetchTableData();
      }
    },
    searchValue() {
      this.fetchTableData();
    }
  },
  methods: {
    onOpenModal() {
      this?.[FRONTEGG_STORE_KEY]?.dispatch(teamActions.openAddUserDialog());
    },
    onCloseModal() {
      this?.[FRONTEGG_STORE_KEY]?.dispatch(teamActions.closeAddUserDialog());
    },
    changeOptions(options: TableOptions) {
      this.options = { ...options };
    },
    async fetchTableData() {
      const payload: ILoadUsers = {
        pageOffset: this.options.page - 1
      };
      if (this.options.sortBy.length > 0) {
        payload.sort = [
          {
            id: this.options.sortBy[0],
            desc: this.options.sortDesc[0]
          }
        ];
      }

      (payload.filter = [
        {
          id: "searchFilter",
          value: this.searchValue
        }
      ]),
        this?.[FRONTEGG_STORE_KEY]?.dispatch(teamActions.loadUsers(payload));
    }
  }
});
</script>

<style lang="scss" scoped></style>
