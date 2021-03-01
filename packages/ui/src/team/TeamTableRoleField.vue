<template>
  <div class="fe-flex fe-full-width fe-flex-no-wrap roles-row">
    <div class="fe-flex roles-checked">
      <div
        v-for="(role, index) in item.roleIds"
        :key="role"
      >
        <div
          v-if="index < rolesHideLength"
          class="fe-tag fe-mr-1 fe-mb-1 fe-mt-1 fe-tag-default fe-tag-small"
        >
          {{ getRoleName(role) }}
        </div>
      </div>
      <span v-if="showTooltip">{{ textTooltip }}</span>
    </div>
    <v-menu
      :close-on-click="true"
      :close-on-content-click="false"
      bottom
      right
      content-class="roles-menu"
    >
      <template v-slot:activator="{ on, attrs }">
        <div
          class="open-fe-menu open-roles-menu"
          v-bind="attrs"
          v-on="on"
        >
          <FeIcon :params="{ iconName: 'arrow-down', width: '14', height: '14' }" />
        </div>
      </template>
      <v-card>
        <v-list>
          <v-list-item
            v-for="role in avaliableRoles"
            :key="role.id"
          >
            <v-checkbox
              v-model="myCheckedRoles"
              :label="role.label"
              :value="role.value"
              @change="onRolesChange"
            />
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import FeIcon from "@/elements/Icons/FeIcon.vue";
import { checkRoleAccess } from "./helpers";
import { mapTeamActions } from "@frontegg/vue-core/auth";

import { ITeamUserRole } from '@frontegg/rest-api';

export default Vue.extend({
  name: "TeamTableRoleField",
  components: { FeIcon },
  props: {
    item: {
      type: Object
    },
    roles: {
      type: Object as () => ITeamUserRole[]
    },
    checkMe: {
      type: Boolean
    }
  },
  data() {
    return {
      ...this.mapLoginState(),
      rolesHideLength: 3,
      myCheckedRoles: "",
    };
  },
  computed: {
    user() {
      return this.fronteggAuth.user as any;
    },
    
    showTooltip(): any {
      return this.item.roleIds.length > this.rolesHideLength;
    },
    textTooltip(): any {
      return this.item.roleIds.length - this.rolesHideLength + " more";
    },
    avaliableRoles(): any {
      return checkRoleAccess(this.roles, this.user);
    }
  },
  watch: {
    "item.roleIds": {
      deep: true,
      immediate: true,
      handler(val) {
        if (val) {
          this.myCheckedRoles = val;
        }
      }
    },
  },
  methods: {
    getRoleName(roleId: string): any {
      const roleObj = this.roles.find((role: any) => role.id === roleId);
      return roleObj ? roleObj.name : null;
    },
    onRolesChange(val: string[]) {
      mapTeamActions('updateUser')({
        id: this.item.id,
        email: this.item.email,
        name: this.item.name,
        roleIds: val
      });
    }
  }
})
</script>

<style lang="scss">
// @import "@/styles/colors.scss";
.roles-row {
  min-width: 194px;
  display: flex;
  flex-wrap: nowrap;

  .roles-checked {
    flex-grow: 1;
    display: flex; 
    flex-wrap: wrap;
    align-items: center;
  }
}
.open-roles-menu {
  padding: 0 0.875rem;
}
.roles-menu {
  box-shadow: none;
  border-radius: 0;
  transform: translateX(30px);
  .v-card {
    border-radius: 0;
  }
  .v-list {
    padding: 0;
  }
  .v-list-item {
    padding: 0;
    min-height: 1px;
    transition: all 0.5s ease;
    cursor: pointer;
    &:hover {
      background: var(--color-gray-2);
    }
  }
  .v-input {
    &--selection-controls {
      margin: 0;
      padding: 0;
      &__ripple {
        display: none;
      }
      &__input {
        margin-right: 15px;
        width: 17px;
        height: 17px;
      }
    }
    &__slot {
      margin-bottom: 0;
      padding: 0.9375rem;
      padding-right: 2rem;
    }

    .v-messages {
      display: none;
    }
    .v-icon {
      color: var(--color-gray-4);
      border-radius: 3.5px;

      &:after,
      &:before {
        border-radius: 3.5px;
      }
    }
  }

  .v-label {
    font-size: 0.875rem;
    color: var(--color-gray-9);
  }
}
</style>
