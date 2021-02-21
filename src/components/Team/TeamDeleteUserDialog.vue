<template>
  <div class="delete-modal-holder">
    <v-menu
      :close-on-click="true"
      bottom
      right
    >
      <template v-slot:activator="{ on, attrs }">
        <div
          class="open-fe-menu "
          v-bind="attrs"
          v-on="on"
        >
          <spinner v-if="loading === item.id " />
          <FeIcon
            v-else
            :params="{ iconName: 'vertical-dots' }"
          />
        </div>
      </template>
      <v-list :class="'delete-modal fe-menu'">
        <v-list-item v-if="sendEmail">
          <v-list-item-title
            class="fe-menu-item fe-menu-item__with-icons"
            @click="resendActivationLink"
          >
            <FeIcon
              :params="{
                iconName: 'resend',
                className: ['fe-menu-item__icon']
              }"
            />
            <span>{{ $t("auth.team.resendActivation") }}</span>
          </v-list-item-title>
        </v-list-item>
        <v-list-item v-if="!disable">
          <v-list-item-title
            class="fe-menu-item fe-menu-item__with-icons"
            @click="deleteUser"
          >
            <FeIcon
              :params="{
                iconName: 'delete',
                className: ['fe-color-danger', 'fe-menu-item__icon']
              }"
            />
            <span>{{ $t("auth.team.deleteUser") }}</span>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import FeIcon from "@/components/core/elements/Icons/FeIcon";
import Spinner from "@/components/Common/Spinner.vue";

import { mapState } from "@/plugins/fronteggCore/map-state";
import { AuthState } from "@/plugins/fronteggAuth/Api";

export default Vue.extend({
  name: "TeamDeleteUserDialog",
  components: {
    FeIcon,
    Spinner
  },
  props: {
    item: {
      default: () => {},
      type: Object
    },
    sendEmail: {
      type: Boolean
    }
  },
  data(): any {
    return {
      ...mapState(this, {
        loading: (state: { auth: AuthState }) => 
          state.auth.teamState.loaders.RESEND_ACTIVATE_LINK || 
          state.auth.teamState.loaders.UPDATE_USER || 
          state.auth.teamState.loaders.DELETE_USER,
        loginState: (state: { auth: AuthState }) => state.auth.loginState
      }),
    };
  },
  computed: {
    disable(): any {
      return this.item.email === this.loginState.email
    }
  },
  methods: {
    deleteUser() {
      if (!this.disable) {
        this.$emit("deleteUser", this.item.id, this.item.email);
      }
    },
    resendActivationLink() {
      this.$emit("resendActivationLink", this.item.id);
    }
  }
});
</script>

<style lang="scss">
.open-fe-menu {
  display: flex;
  align-items: center;
  justify-content: center;
}
.delete-modal-holder {
  position: relative;
}
.delete-modal {
  cursor: pointer;
  padding: 0;
  .v-list-item {
    min-height: 1px;
    padding: 0;
  }
}
</style>
