<template>
  <div class="fe-flex fe-full-width fe-flex-no-wrap">
    <div class="fe-flex">
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
      bottom
      right
    >
      <template v-slot:activator="{ on, attrs }">
        <div
          class="open-fe-menu"
          v-bind="attrs"
          v-on="on"
        >
          <svg
            width="2rem"
            height="2rem"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            class="fe-icon"
          ><path
            d="M 6 13.4 L 4.6 12 L 8.6 8 L 4.6 4 L 6 2.6 L 11.4 8 Z"
            fill="currentColor"
            fill-rule="evenodd"
            transform="matrix(0, 1, -1, 0, 16, 0)"
          /></svg>
        </div>
      </template>
      <v-card>
        <v-list>
          <v-list-item
            v-for="role in roles"
            :key="role.id"
          >
            <v-checkbox      
              v-model="myCheckedRoles"  
              :label="role.name"
              :value="role.id"
              @change="onRolesChange"
            />
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>

    <!-- <v-select
      :menu-props="{ top: true, right: true, offsetY: true, contentClass: 'roles-menu' }"
      v-model="myCheckedRoles"
      @change="onSelectChange"
      class="roles-select"
      item-text="name"
      item-value="id"
      :items="roles"
      multiple
    >
      <template v-slot:selection="{  }">
        <v-chip v-if="index < rolesHideLength" class="fe-tag">
          <span>{{ item.name }}</span>
        </v-chip>
        <span
          v-if="index === rolesHideLength - 1 && myCheckedRoles.length - rolesHideLength > 0"
          class="grey--text caption"
        >
          +{{ myCheckedRoles.length - rolesHideLength }} more
        </span> 
      </template>
    </v-select>  -->
  </div>
</template>

<script lang="ts">
  import { teamActions } from "@/plugins/fronteggAuth/Api/TeamState/index.ts";
  import { FRONTEGG_STORE_KEY } from "@/plugins/fronteggCore/constants";

  export default {
    name: "TeamTableRoleField",
    props: {
      item: {
        type: Object
      },
      roles: {
        type: Array
      },
      checkMe: {
        type: Boolean
      }
    },
    data() {
      return {
        rolesHideLength: 3,
        myCheckedRoles: '',
      };
    },
    computed: {
      showTooltip(): any {
        return this.item.roleIds.length > this.rolesHideLength;
      },
      textTooltip(): any {
        return this.item.roleIds.length - this.rolesHideLength + " more";
      },
    },
    watch: {
      "item.roleIds": {
        deep: true,
        immediate: true,
        handler(val) {
          if(val) {
            this.myCheckedRoles = val;
          }
        }
      }
    },
    methods: {
      getRoleName(roleId: string): any {
        const roleObj = this.roles.find((role: any) => role.id === roleId);
        return roleObj ? roleObj.name : null;
      },
      onRolesChange(val: string[]) {
        this?.[FRONTEGG_STORE_KEY]?.dispatch(teamActions.updateUser({
          id: this.item.id,
          email: this.item.email, 
          name: this.item.name,
          roleIds: val
        }));
      }
    }
  };
</script>

<style lang="scss">
.roles-select {
  .v-input__slot {
    &:before,
    &:after {
      display: none;
    }
  }
  .theme--light.v-chip:not(.v-chip--active) {
    background: var(--color-gray-1);
  }
  .fe-tag {
    padding: 0.875rem;
    height: 1rem;
    font-size: 0.875rem;
    line-height: 1.1;
    color: #424242;
    &:before {
      display: none;
    }
  }
  .v-icon {
    width: 15px;
    height: 15px;
    cursor: pointer;

    &:before,
    &:after {
      all: unset;
      content: "";
      position: absolute;
      border-bottom: 2px solid var(--color-gray-8);
      width: 8px;
      left: 2px;
      border-radius: 50px;
    }

    &:before {
      transform: rotate(45deg);
    }

    &:after {
      transform: rotate(-45deg);
      left: 6px;
    }
  }
}
</style>
