<template>
  <div class="fe-team__layout">
    <TeamTableToolbar
      v-model="searchValue"
      @onOpenModal="onOpenModal"
    />

    <TeamTable
      :page.sync="currentPage"
      @fetchTableData="changeOptions"
      @itemDeleted="fetchTableData"
    />

    <TeamPagination
      v-if="totalPages > 0"
      v-model="currentPage"
      :current-page.sync="currentPage"
      :total-pages.sync="totalPages"
    />

    <FModal
      v-if="openModal"
      :open-modal="openModal"
      :head-text="$t('auth.team.add-dialog.title')"
      @onCloseModal="onCloseModal"
    >
      <template #content>
        <TeamAddUserDialog
          :roles="roles"
          @onCloseModal="onCloseModal"
          @itemCreated="fetchTableData"
        />
      </template>
    </FModal>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapTeamActions } from "@frontegg/vue-core/auth";

import TeamTableToolbar from "./TeamTableToolbar.vue";
import TeamTable from "./TeamTable.vue";
import TeamPagination from "./TeamPagination.vue";
import FModal from '@/elements/Modal/FModal.vue';
import TeamAddUserDialog from "./TeamAddUserDialog.vue";

import { ILoadUsers } from "@frontegg/rest-api";
import { TableOptions } from "./interfaces";


export default Vue.extend({
  name: "TeamLayout",
  components: {
      TeamTableToolbar,
      TeamTable,
      TeamPagination,
      FModal,
      TeamAddUserDialog
    },
  data(): any {
    return {
      ...this.mapTeamState(),
      currentPage: 1,
      searchValue: "",
      options: {} as TableOptions
    };
  },
  computed: {
    openModal() {
      return this.$data.teamState.addUserDialogState.open
    },
    pageOffset() {
      return this.$data.teamState.pageOffse
    },

    totalPages() {
      return this.$data.teamState.totalPages;
    },
    roles(){
      return this.$data.teamState.roles;
    }
  },
  watch: {
    options: {
      deep: true,
      handler(): any {
        this.fetchTableData();
      }
    },
    "options.page"(val) {
      this.$data.currentPage = val;
    },
    searchValue(): any {
      this.fetchTableData();
    }
  },
  mounted() {
  },
  methods: {
    onOpenModal: mapTeamActions('openAddUserDialog'),
    onCloseModal: mapTeamActions('closeAddUserDialog'),
    changeOptions(options: TableOptions) {
      this.$data.options = { ...options };
    },
    fetchTableData() {
      const payload: ILoadUsers = {
        pageOffset: this.$data.options.page - 1,
        sort: [],
        filter: []
      };
      if (this.$data.options.sortBy.length > 0) {
        payload.sort = [
          {
            id: this.$data.options.sortBy[0],
            desc: this.$data.options.sortDesc[0]
          }
        ];
      }

      if(this.$data.searchValue) {
        payload.filter = [
          {
            id: "searchFilter",
            value: this.$data.searchValue
          }
        ];
      }

      mapTeamActions('loadUsers')(payload);
    }
  }
});
</script>

<style lang="scss" scoped></style>
