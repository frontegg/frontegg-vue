<template>
  <div class="fe-team__table fe-table">
    <div class="fe-table__container">
      <div v-if="loading" class="spinner-icon">
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
            <img :src="item.profileImageUrl" alt="icon" class="fe-table-cell__avatar-img" />
          </div>
        </template>
        <template v-slot:[`item.name`]="{ item }">
          <span class="name">
            {{ item.email === user.email ? `${item.name} ${$t('common.me')}` : item.name }}
          </span>
        </template>
        <template v-slot:[`item.roleIds`]="{ item }">
          <TeamTableRoleField :item="item" :roles="roles" :check-me="item.email === user.email" />
        </template>
        <template v-slot:[`item.createdAt`]="{ item }">
          <div v-if="item.lastLogin && item.createdAt" class="datetime">
            <span class="date">{{ dayFormat(item.createdAt) }}</span>
            <span class="left-time">{{ leftTimeFormat(item.createdAt) }}</span>
          </div>
          <div v-else class="fe-tag fe-tag-primary fe-tag-small">
            <span class="date">{{ $t('common.pendingApproval') }}</span>
          </div>
        </template>
        <template v-slot:[`item.lastLogin`]="{ item }">
          <div class="datetime">
            <span class="date">{{ dayFormat(item.lastLogin) }}</span>
            <span v-if="item.lastLogin" class="left-time">{{ leftTimeFormat(item.lastLogin) }}</span>
          </div>
        </template>
        <template v-slot:[`item.id`]="{ item }">
          <TeamDeleteUserDialog
            :send-email="!item.lastLogin"
            :item="item"
            @deleteUser="setDeleteModal"
            @resendActivationLink="resendActivationLink"
          />
        </template>
      </v-data-table>
    </div>
    <FModal :open-modal="openModal" :head-text="$t('auth.team.deleteDialog.title')" @onCloseModal="onCloseModal">
      <template #content>
        <div class="fe-dialog-body">
          <span>{{
            $t('auth.team.deleteDialog.message', {
              email: textUserDeleteModal,
            })
          }}</span>
        </div>
        <v-card-actions>
          <v-btn :class="{ 'fe-button-disabled': loading }" text class="fe-button" @click="onCloseModal">
            {{ $t('common.cancel') }}
          </v-btn>
          <v-btn text class="fe-button fe-button-large fe-button-danger" :loading="loadingDelete" @click="deleteUser">
            {{ $t('common.delete') }}
          </v-btn>
        </v-card-actions>
      </template>
    </FModal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import Spinner from '@/elements/Spinner.vue';
import TeamDeleteUserDialog from './TeamDeleteUserDialog.vue';
import TeamTableRoleField from './TeamTableRoleField.vue';
import FModal from '@/elements/Modal/FModal.vue';

import { TableOptions } from './interfaces';

import { mapTeamActions } from "@frontegg/vue-core/auth";

export default Vue.extend({
  name: 'TeamTable',
  components: {
    Spinner,
    TeamDeleteUserDialog,
    FModal,
    TeamTableRoleField
  },
  props: {
    page: {
      default: 0,
      type: Number,
    },
  },
  data(): any {
    return {
      ...this.mapTeamState(),

      textUserDeleteModal: '',
      idUserDeleteModal: '',
      options: {} as TableOptions,
      rolesIndex: 3,
    };
  },
  computed: {
    openModal() {
      return this.$data.teamState.deleteUserDialogState.open
    },
    loadingDelete() {
      return this.$data.teamState.deleteUserDialogState.loading
    },
    user() {
      return this.fronteggAuth.user
    },

    pageSize(): any {
      return this.$data.teamState.pageSize;
    },
    tableItems(): any {
      return this.$data.teamState.users;
    },
    roles(): any {
      return this.$data.teamState.roles;
    },
    loading(): any {
      return this.$data.teamState.loaders.USERS;
    },
    headers() {
      const columns = [
        {
          text: '',
          sortable: false,
          value: 'profileImageUrl',
        },
        {
          text: 'Name',
          sortable: true,
          value: 'name',
        },
        {
          text: 'Email',
          sortable: true,
          value: 'email',
        },
        {
          text: 'Joined Team',
          sortable: true,
          value: 'createdAt',
        },
        {
          text: 'Last Login',
          sortable: true,
          value: 'lastLogin',
        },
        {
          text: '',
          sortable: false,
          value: 'id',
        },
      ];
      const roleColumn = {
        text: 'Roles',
        sortable: false,
        value: 'roleIds',
      };
      if (this.roles.length > 0) {
        columns.splice(3, 0, roleColumn);
      }
      return columns;
    },
  },
  watch: {
    options: {
      handler() {
        this.$emit('fetchTableData', this.$data.options);
      },
      deep: true,
    },
    page(val) {
      this.$data.options.page = val;
    },
  },
  methods: {
    dayFormat(date: string) {
      return date ? this.$moment(date).format('LLLL') : 'N/A';
    },
    leftTimeFormat(time: string) {
      return time ? this.$moment(time).fromNow() : 'N/A';
    },
    onOpenModal: mapTeamActions('openDeleteUserDialog'),
    onCloseModal: mapTeamActions('closeDeleteUserDialog'),
    deleteUser() {
      console.log('deleteUser:', this.$data)
      if (this.$data.idUserDeleteModal) {
        console.log('this.$data.idUserDeleteModal:', this.$data.idUserDeleteModal);
        const data = {
          callback: () => this.$emit('itemDeleted'),
          userId: this.$data.idUserDeleteModal,
        };
        mapTeamActions('deleteUser')(data);
      }
    },
    setDeleteModal(id: string, email: string) {
      console.log('setDeleteModal:', 'if:', id, 'email:', email);
      this.onOpenModal();
      this.idUserDeleteModal = id;
      this.$data.textUserDeleteModal = email;
    },
    resendActivationLink(id: string) {
      mapTeamActions('resendActivationLink')({userId: id});
    },
  },
});
</script>

<style lang="scss">
.fe-table {
  --fe-table-header-bg: var(--color-gray-0);
  --fe-table-header-font-color: var(--color-blue-gray-8);
  --fe-table-header-icon-color: var(--color-gray-5);
  --fe-table-header-font-size: 0.85rem;
  --fe-table-header-align: left;
  --fe-table-header-height: 3rem;
  --fe-table-header-padding: 0 1rem;

  --fe-table-row-divider-width: 1px;
  --fe-table-row-divider-color: var(--color-gray-2);

  --fe-table-cell-padding: 0.5rem;
  --fe-table-cell-height: 3.5rem;
  --fe-table-cell-font-size: 0.85rem;
  --fe-table-cell-font-color: var(--color-blue-gray-8);

  --fe-table-elements-border-radius: 0.5rem;

  border-spacing: 0;
  width: 100%;
  max-height: 100%;
  min-height: 100%;
  height: 100%;
  overflow: hidden;
  flex: 1;
  display: flex;
  flex-direction: column;
  font-family: 'Nunito Sans';

  &.fe-team__table {
    overflow: hidden;
    height: auto;
    min-height: 1px;
  }

  &__container {
    position: relative;
    display: flex;
    height: 100%;
    width: 100%;
    flex: 1;
    flex-direction: column;
    max-height: 100vh;
    overflow: auto;

    .spinner-icon {
      position: absolute;
      z-index: 10;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    .v-data-table__progress {
      display: none;
      opacity: 0;
    }
  }

  &__table-container {
    flex: 1;
    overflow: auto;
    position: relative;
    display: flex;
    flex-direction: column;
    -webkit-overflow-scrolling: touch;

    &-loading {
      overflow: hidden;
    }
  }

  &__thead {
    position: sticky;
    top: 0;
    min-height: var(--fe-table-header-height);
    align-items: stretch;
    display: flex;
  }

  &__thead-tr,
  .v-data-table-header {
    background: var(--fe-table-header-bg);
    align-items: stretch;
    border-radius: var(--element-border-radius-sm);
  }

  &__thead-tr-th,
  .v-data-table .v-data-table__wrapper table thead.v-data-table-header tr th {
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
    transition: border 300ms;

    &__first-cell {
      padding-left: 2rem;
    }

    .fe-icon {
      height: var(--fe-table-header-font-size);
      margin: 0 0.5rem;
      width: auto;
      color: var(--fe-table-header-icon-color);
    }

    &.fe-table__thead-sortable {
      &-asc {
        border-top: 3px solid var(--color-gray-3);
      }

      &-desc {
        border-bottom: 3px solid var(--color-gray-3);
      }
    }
  }

  .v-data-table .v-data-table__wrapper table thead.v-data-table-header tr th,
  .v-data-table--fixed-header .v-data-table__wrapper table thead.v-data-table-header tr th {
    display: table-cell;
    white-space: nowrap;
    min-width: min-content;
    background: var(--color-gray-0);
    box-shadow: none;
    font-weight: 400;
    border-bottom: 3px solid transparent !important;
    border-top: 3px solid transparent !important;



    &.asc {
      border-top-color: var(--color-gray-3) !important;

      .v-icon.mdi {
        &:after {
          border-bottom-color: var(--color-primary-dark);
        }
      }
    }

    &.desc {
      border-bottom-color: var(--color-gray-3) !important;

      .v-icon.mdi {
        &:before {
          border-top-color: var(--color-primary-dark);
        }
      }
    }
  }

  &__spacer {
    flex: 1;
  }

  &__filter-button {
    padding: 0.5rem;
    box-sizing: content-box;
    transition: all 0.3s;
    border-radius: var(--fe-table-elements-border-radius);
    cursor: pointer;

    &:hover {
      color: var(--fe-table-header-font-color);
      background: var(--color-gray-2);
    }
  }

  &__active-filter {
    color: var(--color-primary-dark);
    background: var(--color-gray-2);
  }

  &__tbody {
    order: 1;
    flex: 1;

    &__loading {
      opacity: 0.8;
    }
  }

  &__tr {
    min-height: var(--fe-table-cell-height);
    border-bottom: var(--fe-table-row-divider-width) solid var(--fe-table-row-divider-color);

    &.is-expanded {
      border-bottom: var(--fe-table-row-divider-width) solid transparent;
    }
  }

  .v-data-table .v-data-table__wrapper tbody tr td {
    color: var(--fe-table-header-font-color);
    padding: var(--fe-table-cell-padding);
    font-size: var(--fe-table-cell-font-size);
  }

  &__tr-td {
    color: var(--fe-table-header-font-color);
    padding: var(--fe-table-cell-padding);
    font-size: var(--fe-table-cell-font-size);
    display: flex;
    align-items: center;
    min-height: 5rem;

    &__first-cell {
      padding-left: 2rem;
    }

    &-empty,
    &-loader {
      text-align: center;
      justify-content: center;
    }
  }

  &__expand-button.fe-button {
    height: 2rem;
    width: 2rem;
    padding: 0;

    svg {
      transition: transform 0.3s;
    }

    &.is-expanded>svg {
      transform: rotate(90deg);
    }
  }

  &__tr-expanded-content {
    transition: max-height 300ms ease-in-out, padding 200ms ease-in-out, opacity 300ms 200ms ease-in-out;
    overflow: auto;
    max-height: 0;
    opacity: 0;
    padding: 0 2rem 0 5rem;
    border-bottom: none;

    &.is-expanded {
      border-bottom: var(--fe-table-row-divider-width) solid var(--fe-table-row-divider-color);
      opacity: 1;
      max-height: 400px;
    }
  }

  &__pagination {
    height: 3rem;
    min-height: 3rem;
    text-align: center;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: row;
    background: var(--color-gray-0);

    .fe-button {
      border-radius: 50%;
      width: 2rem;
      height: 2rem;
      padding: 0;
      color: var(--color-gray-5);
      background: var(--color-gray-0);
      border: 0;
      margin: 0 0.5rem;
      justify-content: center;
      align-items: center;
      display: flex;

      &.fe-button-disabled {
        opacity: 0.45;
        background: transparent;
      }

      svg {
        width: 1.2rem;
        height: 1.2rem;
      }
    }

    &-option {
      margin: 0.25rem;
      font-size: 0.9rem;
      width: 2rem;
      height: 2rem;
      text-align: center;
      line-height: 2rem;
      cursor: pointer;
      border-radius: 50%;

      &:hover {
        background: var(--color-gray-2);
      }

      &.selected-option {
        font-weight: bold;
        background: var(--color-primary-lighter);
        color: var(--color-primary);
      }
    }

    .page-separator {
      font-size: 0.8rem;
      height: 0.5rem;
      line-height: 1px;
      color: var(--color-gray-5);
      letter-spacing: 1.2px;
      font-weight: bold;
    }
  }
}

.v-data-table-header .v-icon.mdi {
  display: inline-flex;
  flex-direction: column;
  margin: 0 0.5rem;
  opacity: 1;
  height: 12px;
  transform: none !important;

  &:before,
  &:after {
    all: unset;
    content: "";
    position: absolute;
    border-top: 4px solid var(--color-gray-5);
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
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
.v-data-table .v-data-table__wrapper tbody tr td:nth-child(2) {
  font-size: 1rem;
  color: var(--color-black);
  overflow: hidden;
  white-space: pre-wrap;
  word-break: break-word;
}

.v-data-table .v-data-table__wrapper tbody tr td:nth-child(3) {
  font-size: 0.9rem;
  color: var(--color-gray-6);

}

.v-data-table {
  height: 100%;

  .name {
    white-space: nowrap;

  }
}

.v-data-table__wrapper {
  height: 100%;
}

.v-data-table__wrapper tbody td.text-start {
  padding: 1rem !important;
  border-bottom: 1px solid var(--color-gray-2) !important;
}

.v-data-table__wrapper tbody .datetime {
  display: flex;
  flex-direction: column;
  min-width: 180px;

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
