<template>
  <div class="fe-team__table">
    <div class="fe-table__container">
      <v-data-table
        :headers="headers"
        :items="tableItems"
        :options.sync="options"
        :loading="loading"
        :server-items-length="totalItems"
        :items-per-page="pageSize"
        hide-default-footer
      />
      <v-pagination
        v-if="totalPages > 0"
        v-model="options.page"
        :length="totalPages"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { mapState } from "@/plugins/fronteggCore/map-state";
import { AuthState } from "@/plugins/fronteggAuth/Api";
import { FRONTEGG_STORE_KEY } from "@/plugins/fronteggCore/constants";

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

export default {
  data() {
    return {
      ...mapState(this, {
        membersList: (state: { auth: AuthState }) => state.auth.teamState
      }),

      options: {} as TableOptions,
      headers: [
        {
          text: "Name",
          sortable: true,
          value: "name"
        },
        {
          text: "Email",
          sortable: true,
          value: "email"
        },
        {
          text: "Roles",
          sortable: false,
          value: "roleIds"
        },
        {
          text: "Joined Team",
          sortable: true,
          value: "createdAt"
        },
        {
          text: "Last Login",
          sortable: true,
          value: "lastLogin"
        }
      ]
    };
  },
  computed: {
    pageSize() {
      return this.membersList.pageSize;
    },
    totalPages() {
      return this.membersList.totalPages;
    },
    tableItems() {
      return this.membersList.users;
    },
    totalItems() {
      return this.membersList.totalItems ? this.membersList.totalItems : 0;
    },
    loading() {
      return this.membersList.loaders.USERS
    }
  },
  watch: {
    options: {
      handler() {
        this.fetchTableData();
      },
      deep: true
    }
  },
  methods: {
    async fetchTableData() {
      interface Payload {
        pageOffset: number;
        sort?: [{
          id: any;
          desc: any;
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
      await this[FRONTEGG_STORE_KEY].dispatch({
        type: "auth/loadUsers",
        payload: {...payload}
      });
    }
  }
};
</script>
