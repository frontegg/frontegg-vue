<template>
  <div>
    <div class="fe-team__table">
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
              @deleteUser="userDeleteModal(item.id)"
              :sendEmail="!item.lastLogin"
            ></TeamDropList>
          </template>
        </v-data-table>
      </div>
    </div>
    <FModal
      :open-modal="showUserDeleteModal"
      :onCloseModal="onCloseModal"
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
    userDeleteModal(id) {
      this.showUserDeleteModal = true;
      this.idUserDeleteModal = id;
      this.textUserDeleteModal = this.tableItems.find(
        (item) => item.id === id
      ).email;
    },
    onCloseModal() {
      this.showUserDeleteModal = false;
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
    deleteUser() {
      if (this.idUserDeleteModal) {
        this?.[FRONTEGG_STORE_KEY]?.dispatch(
          teamActions.deleteUser({
            userId: this.idUserDeleteModal,
          })
        );
        this.onCloseModal();
      }
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
.fe-table__thead-tr,
.v-data-table-header {
  background: var(--fe-table-header-bg);
  align-items: stretch;
  border-radius: var(--element-border-radius-sm);
}
.fe-table__container {
  position: relative;
}
.fe-table__container .spinner-icon {
  position: absolute;
  z-index: 10;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.fe-table__container .v-data-table__progress {
  display: none;
  opacity: 0;
}
.fe-table__thead-tr-th,
.v-data-table-header th {
  color: var(--fe-table-header-font-color);
  padding: var(--fe-table-header-padding);
  text-align: var(--fe-table-header-align);
  font-size: var(--fe-table-header-font-size);
  line-height: var(--fe-table-header-font-size);
  text-transform: uppercase;
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  border-top: 3px solid transparent;
  border-bottom: 3px solid transparent;
  transition: border 0.3s;
}
.fe-table__container
  .v-data-table
  .v-data-table__wrapper
  table
  thead.v-data-table-header
  tr
  th {
  display: table-cell;
  background: var(--color-gray-0);
  border-bottom: none;
  &.sortable {
    border-top: 3px solid transparent;
    border-bottom: 3px solid transparent;
  }
  &.asc {
    border-top-color: var(--color-gray-3);
    .v-icon.mdi {
      &:after {
        border-bottom-color: var(--color-primary-dark);
      }
    }
  }
  &.desc {
    border-bottom-color: var(--color-gray-3);
    .v-icon.mdi {
      &:before {
        border-top-color: var(--color-primary-dark);
      }
    }
  }
}
.v-data-table-header .v-icon.mdi {
  display: inline-flex;
  flex-direction: column;
  margin: 0 0.5rem;
  opacity: 1;
  height: 13px;
  transform: none !important;
  &:before,
  &:after {
    all: unset;
    content: "";
    position: absolute;
    border-top: 4px solid var(--color-gray-5);
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    left: 0;
  }
  &:before {
    bottom: 0;
  }
  &:after {
    top: 0;
    border-top: 0;
    border-bottom: 4px solid var(--color-gray-5);
  }
}
.fe-table-cell__description,
.v-data-table__wrapper tbody tr td:nth-child(2) {
  font-size: 0.9rem;
  color: var(--color-gray-6);
  overflow: hidden;
  white-space: pre-wrap;
  word-break: break-word;
}
.v-data-table__wrapper tbody td.text-start {
  padding: 1rem !important;
  border-bottom: 1px solid var(--color-gray-2) !important;
}
.v-data-table__wrapper tbody .datetime {
  display: flex;
  flex-direction: column;
  max-width: 150px;

  .time,
  .date {
    color: var(--color-black);
    font-size: 0.9rem;
  }
  .left-time {
    font-size: 0.85rem;
    color: var(--color-gray-6);
  }
}
</style>
