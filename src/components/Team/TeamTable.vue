<template>
  <div class="fe-team__table">
    <div class="fe-table__container">
      <v-data-table
        :headers="headers"
        :items="tableItems"
        :options.sync="options"
        :loading="loading"
        
        :items-per-page="pageSize"
        hide-default-footer
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "@/plugins/fronteggCore/map-state";
import { AuthState } from "@/plugins/fronteggAuth/Api";

export default Vue.extend({
  props: {
    page: {
      default: 0,
      type: Number
    }
  },
  data() {
    return {
      ...mapState(this, {
        membersList: (state: { auth: AuthState }) => state.auth.teamState
      }),

      options: {},
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
    tableItems() {
      return this.membersList.users;
    },
    loading() {
      return this.membersList.loaders.USERS
    }
  },
  watch: {
    options: {
      handler() {
        this.$emit('fetchTableData', this.options)
      },
      deep: true
    },
    page(val) {
      this.options.page = val;
    }
  }
})
</script>
