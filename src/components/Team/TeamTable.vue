<template>
  <div class="fe-team__table fe-table">
    <div class="fe-table__container">
      <div
        v-if="loading"
        class="spinner-icon"
      >
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
        <template v-slot:[`item.profileImageUrl`]="{ item }">
          <div class="d-flex justify-center">
            <img
              :src="item.profileImageUrl"
              alt="icon"
              class="fe-table-cell__avatar-img"
            >
          </div>
        </template>
        <template v-slot:[`item.roleIds`]="{ item }">
          <div
            v-if="item.roleIds && item.roleIds.length > 0"
            class="fe-flex fe-full-width fe-flex-no-wrap"
          >
            <div class="fe-flex">
              <div
                v-for="role in item.roleIds"
                :key="role"
                class="fe-tag fe-mr-1 fe-mb-1 fe-mt-1 fe-tag-default fe-tag-small"
              >
                {{ getRoleName(role) }}
              </div>
            </div>
          </div>
        </template>
        <template v-slot:[`item.createdAt`]="{ item }">
          
          <div
            v-if="item.lastLogin && item.createdAt"
            class="datetime"
          >
            <span class="date">{{
              item.createdAt ? $moment(item.createdAt).format("LLLL") : "N/A"
            }}</span>
            <span class="left-time">{{
              item.createdAt ? $moment(item.createdAt).fromNow() : "N/A"
            }}</span>
          </div>
          <div
            v-else
            class="fe-tag fe-tag-primary fe-tag-small"
          >
            <span class="date">{{ $t("common.pendingApproval") }}</span>
          </div>
        </template>
        <template v-slot:[`item.lastLogin`]="{ item }">
          <div class="datetime">
            <span class="date">{{
              item.lastLogin ? $moment(item.lastLogin).format("LLLL") : "N/A"
            }}</span>
            <span
              v-if="item.lastLogin"
              class="left-time"
            >{{
              item.lastLogin ? $moment(item.lastLogin).fromNow() : "N/A"
            }}</span>
          </div>
        </template>
        <template v-slot:[`item.id`]="{ item }">
          <TeamDropList
            :send-email="!item.lastLogin"
            @deleteUser="setDeleteModal(item.id, item.email)"
            @resendActivationLink="resendActivationLink(item.id)"
          />
        </template>
      </v-data-table>
    </div>

    <FModal
      :open-modal="openModal"
      :head-text="$t('auth.team.deleteDialog.title')"
      @onCloseModal="onCloseModal"
    >
      <template #content>
        <div class="fe-dialog-body">
          <span>{{
            $t("auth.team.deleteDialog.message", {
              email: textUserDeleteModal,
            })
          }}</span>
        </div>
        <v-card-actions>
          <v-btn
            :class="{ 'fe-button-disabled': loading }"
            text
            class="fe-button"
            @click="onCloseModal"
          >
            {{ $t("common.cancel") }}
          </v-btn>
          <v-btn
            text
            class="fe-button fe-button-large fe-button-danger"
            :loading="loadingDelete"
            @click="deleteUser"
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
  data(): any {
    return {
      ...mapState(this, {
        teamState: (state: { auth: AuthState }) => state.auth.teamState,
        openModal: (state: { auth: AuthState }) =>
          state.auth.teamState.deleteUserDialogState.open,
        loadingDelete: (state: { auth: AuthState }) =>
          state.auth.teamState.deleteUserDialogState.loading,
      }),
      textUserDeleteModal: "",
      idUserDeleteModal: "",
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
    pageSize(): any {
      return this.teamState.pageSize;
    },
    tableItems(): any {
      return this.teamState.users;
    },
    roles(): any {
      return this.teamState.roles;
    },
    loading(): any {
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
      this?.[FRONTEGG_STORE_KEY]?.dispatch(teamActions.openDeleteUserDialog());
    },
    onCloseModal() {
      this?.[FRONTEGG_STORE_KEY]?.dispatch(teamActions.closeDeleteUserDialog());
    },
    deleteUser() {
      if (this.idUserDeleteModal) {
        const data = {
          callback: () => this.$emit("itemDeleted"),
          userId: this.idUserDeleteModal,
        };
        this?.[FRONTEGG_STORE_KEY]?.dispatch(teamActions.deleteUser(data));
      }
    },
    setDeleteModal(id: string, email: string) {
      this.onOpenModal();
      this.idUserDeleteModal = id;
      this.textUserDeleteModal = email;
    },
    getRoleName(roleId: string) {
      const roleObj = this.roles.find((i: { id: string }) => i.id === roleId);
      return roleObj ? roleObj.name : null;
    },
    resendActivationLink(id: string) {
      this?.[FRONTEGG_STORE_KEY]?.dispatch(
        teamActions.resendActivationLink({
          userId: id,
        })
      );
    },
  },
});
</script>

<style lang="scss">
@import "@/styles/FeTable.scss";
</style>
