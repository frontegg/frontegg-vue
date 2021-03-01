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
      ...this.mapLoginState(),

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
    dayFormat(date: any) {
      // return date ? this.$moment(date).format('LLLL') : 'N/A';
      return date
    },
    leftTimeFormat(time: any) {
      // return time ? this.$moment(time).fromNow() : 'N/A';
      return time
    },
    onOpenModal() {
      mapTeamActions('openDeleteUserDialog');
    },
    onCloseModal() {
      mapTeamActions('closeDeleteUserDialog');
    },
    deleteUser() {
      if (this.$data.idUserDeleteModal) {
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

</style>
