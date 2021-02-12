<template>
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
        <template v-slot:item.createdAt="{ item }">
          <div class="datetime" v-if="item.createdAt">
            <span class="date">{{ parseDate(item.createdAt) }}</span>
            <span class="time">{{ parseTime(item.createdAt) }}</span>
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
            <span class="time">{{ parseTime(item.lastLogin) }}</span>
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
          <DeleteModal @deleteUser="deleteUser(item.id)"></DeleteModal>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "@/plugins/fronteggCore/map-state";
import { AuthState } from "@/plugins/fronteggAuth/Api";
import Spinner from "@/components/Common/Spinner.vue";
import DeleteModal from "@/components/core/elements/Modal/DeleteModal.vue";

export default Vue.extend({
  name: "TeamTable",
  components: { Spinner, DeleteModal },
  props: {
    page: {
      default: 0,
      type: Number,
    },
  },
  data() {
    return {
      ...mapState(this, {
        membersList: (state: { auth: AuthState }) => state.auth.teamState,
      }),
      options: {},
      dateOptions: {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      },
      timeOptions: {
        hour: "2-digit",
        minute: "numeric",
        hour12: true,
      },
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
      return this.membersList.pageSize;
    },
    tableItems() {
      return this.membersList.users;
    },
    loading() {
      return this.membersList.loaders.USERS;
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
    parseDate(date) {
      return new Date(date).toLocaleDateString("en-US", this.dateOptions);
    },
    parseTime(date) {
      return new Date(date).toLocaleTimeString([], this.timeOptions);
    },
    leftTime(date) {
      return (
        new Date(new Date().getTime() - new Date(date).getTime()).getUTCDate() -
        1
      );
    },
    deleteUser(id) {
      console.log('user had id ' + id + 'was removed')
    }
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
    white-space: nowrap;
    color: var(--color-black);
    font-size: 0.9rem;
  }
  .left-time {
    font-size: 0.85rem;
    color: var(--color-gray-6);
  }
}
</style>
