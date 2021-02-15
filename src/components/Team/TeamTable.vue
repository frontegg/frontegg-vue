<template>
  <div class="fe-team__table fe-table">
    <div class="fe-table__container">
      <div class="spinner-icon" v-if="loading">
        <spinner />
      </div>
      <v-data-table
        :headers="headers"
        :items="tableItems"
        :options.sync="options"
        :loading="loading"
        :items-per-page="pageSize"
        :fixed-header="true"
        hide-default-footer
      >
        <template v-slot:item.profileImageUrl="{ item }">
          <div class="d-flex justify-center">
            <img
              :src="item.profileImageUrl"
              alt="icon"
              class="fe-table-cell__avatar-img"
            />
          </div>
        </template>
        <template v-slot:item.roleIds="{ item }">
          <div
            class="fe-flex fe-full-width fe-flex-no-wrap"
            v-if="item.roleIds && item.roleIds.length > 0"
          >
            <div class="fe-flex">
              <div
                class="fe-tag fe-mr-1 fe-mb-1 fe-mt-1 fe-tag-default fe-tag-small"
                v-for="role in item.roleIds"
                :key="role"
              >
                {{ getRoleName(role) }}
              </div>
            </div>
          </div>
        </template>
        <template v-slot:item.createdAt="{ item }">
          <div class="datetime" v-if="item.createdAt">
            <span class="date">{{ parseDate(item.createdAt) }}</span>
            <span class="left-time"
              >{{ leftTime(item.createdAt) }} days ago</span
            >
          </div>
          <div class="fe-tag fe-tag-primary fe-tag-small" v-else>
            <span class="date">{{ $t("common.pendingApproval") }}</span>
          </div>
        </template>
        <template v-slot:item.lastLogin="{ item }">
          <div class="datetime" v-if="item.lastLogin">
            <span class="date">{{ parseDate(item.lastLogin) }}</span>
            <span class="left-time"
              >{{
                leftTime(item.lastLogin)
                  ? leftTime(item.lastLogin) + "days ago"
                  : "today"
              }}
            </span>
          </div>
          <span v-else>N/A</span>
        </template>
        <template v-slot:item.id="{ item }">
          <TeamDropList
            @deleteUser="setDeleteModal(item.id)"
            :sendEmail="!item.lastLogin"
            @resendActivationLink="resendActivationLink(item.id)"
          ></TeamDropList>
        </template>
      </v-data-table>
    </div>
    <FModal
      :open-modal="openModal"
      @onCloseModal="onCloseModal"
      :headText="'Delete team member'"
    >
      <template #content>
        <div class="fe-dialog-body">
          <span
            >You are about to remove {{ textUserDeleteModal }} from this
            account. Are you sure?</span
          >
        </div>
        <v-card-actions>
          <v-btn
            :class="{ 'fe-button-disabled': loading }"
            text
            @click="onCloseModal"
            class="fe-button"
          >
            {{ $t("common.cancel") }}
          </v-btn>
          <v-btn
            text
            class="fe-button fe-button-large fe-button-danger"
            @click="deleteUser"
            :loading="loadingDelete"
          >
            {{ $t("common.delete") }}
          </v-btn>
        </v-card-actions>
      </template>
    </FModal>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "@/plugins/fronteggCore/map-state";
import { AuthState } from "@/plugins/fronteggAuth/Api";
import Spinner from "@/components/Common/Spinner.vue";
import TeamDropList from "./TeamDropList.vue";
import FModal from "@/components/core/elements/Modal/FModal.vue";

import { teamActions } from "@/plugins/fronteggAuth/Api/TeamState/index.ts";

import { FRONTEGG_STORE_KEY } from "@/plugins/fronteggCore/constants";

import { TableOptions } from "./interfaces";

export default Vue.extend({
  name: "TeamTable",
  components: { Spinner, TeamDropList, FModal },
  props: {
    page: {
      default: 0,
      type: Number,
    },
  },
  data() {
    return {
      ...mapState(this, {
        teamState: (state: { auth: AuthState }) => state.auth.teamState,
        openModal: (state: { auth: AuthState }) =>
          state.auth.teamState.deleteUserDialogState.open,
        loadingDelete: (state: { auth: AuthState }) =>
          state.auth.teamState.deleteUserDialogState.loading,
      }),
      showUserDeleteModal: false,
      textUserDeleteModal: "",
      idUserDeleteModal: null,
      options: {} as TableOptions,
      headers: [
        {
          text: "",
          sortable: false,
          value: "profileImageUrl",
        },
        {
          text: "Name",
          sortable: true,
          value: "name",
        },
        {
          text: "Email",
          sortable: true,
          value: "email",
        },
        {
          text: "Roles",
          sortable: false,
          value: "roleIds",
        },
        {
          text: "Joined Team",
          sortable: true,
          value: "createdAt",
        },
        {
          text: "Last Login",
          sortable: true,
          value: "lastLogin",
        },
        {
          text: "",
          sortable: false,
          value: "id",
        },
      ],
    };
  },
  computed: {
    pageSize() {
      return this.teamState.pageSize;
    },
    tableItems() {
      return this.teamState.users;
    },
    roles() {
      return this.teamState.roles;
    },
    loading() {
      return this.teamState.loaders.USERS;
    },
  },
  watch: {
    options: {
      handler() {
        this.$emit("fetchTableData", this.options);
      },
      deep: true,
    },
    page(val) {
      this.options.page = val;
    },
  },
  methods: {
    onOpenModal() {
      console.log("onOpenModal");
      this?.[FRONTEGG_STORE_KEY]?.dispatch(teamActions.openDeleteUserDialog());
    },
    onCloseModal() {
      console.log("onCloseModal");
      this?.[FRONTEGG_STORE_KEY]?.dispatch(teamActions.closeDeleteUserDialog());
    },
    deleteUser() {
      if (this.idUserDeleteModal) {
        this?.[FRONTEGG_STORE_KEY]?.dispatch(
          teamActions.deleteUser({
            userId: this.idUserDeleteModal,
          })
        );
      }
    },
    setDeleteModal(id) {
      this.onOpenModal();
      this.idUserDeleteModal = id;
      this.textUserDeleteModal = this.tableItems.find(
        (item) => item.id === id
      ).email;
    },
    getRoleName(roleId: string) {
      const roleObj = this.roles.find((i) => i.id === roleId);
      return roleObj ? roleObj.name : null;
    },
    parseDate(date: string) {
      return this.$moment(date).format("LLLL");
    },
    leftTime(date: string) {
      return (
        new Date(new Date().getTime() - new Date(date).getTime()).getUTCDate() -
        1
      );
    },
    resendActivationLink(id: string) {
      this?.[FRONTEGG_STORE_KEY]?.dispatch(
        teamActions.resendActivationLink({
          userId: id,
        })
      );
      console.log('resend activation link ')
    },
  },
});
</script>

<style lang="scss">
@import "@/styles/FeTable.scss";
</style>
