<template>
  <div class="fe-flex fe-full-width fe-flex-no-wrap">
    <div class="fe-flex">
      <div v-for="(role, index) in item.roleIds" :key="role">
        <div class="fe-tag fe-mr-1 fe-mb-1 fe-mt-1 fe-tag-default fe-tag-small" v-if="index < rolesHideLength">
          {{ getRoleName(role) }}
        </div>
      </div>
      <span v-if="showTooltip">{{ textTooltip }}</span>
    </div>
    <v-select
      v-model="myCheckedRoles"
      :items="rolesSet"
      multiple
      class="roles-select"
      :menu-props="{ top: true, right: true, offsetY: true, contentClass: 'roles-menu' }"
    >
      <template v-slot:selection="{ item, index }">
        <v-chip v-if="index < rolesHideLength" class="fe-tag">
          <span>{{ item }}</span>
        </v-chip>
        <span
          v-if="index === rolesHideLength - 1 && myCheckedRoles.length - rolesHideLength > 0"
          class="grey--text caption"
        >
          +{{ myCheckedRoles.length - rolesHideLength }} more
        </span>
      </template>
    </v-select>
  </div>
</template>

<script lang="ts">
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
    rolesSet(): any {
      return this.roles.map((role: any) => role.name);
    },
  },
  methods: {
    getRoleName(roleId: string): any {
      console.log('this.roles:', this.roles);
      const roleObj = this.roles.find((role: any) => role.id === roleId);
      return roleObj ? roleObj.name : null;
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
