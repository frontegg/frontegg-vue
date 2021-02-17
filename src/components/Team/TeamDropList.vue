<template>
  <div class="delete-modal-holder">
    <v-menu :close-on-click="closeOnClick" bottom right>
      <template v-slot:activator="{ on, attrs }">
        <div class="open-fe-menu" v-on="on" v-bind="attrs">
          <img src="@/assets/icon-drop-menu.svg" alt="icon" />
        </div>
      </template>
      <v-list :class="'delete-modal fe-menu'">
        <v-list-item>
          <v-list-item-title
            class="fe-menu-item fe-menu-item__with-icons"
            v-if="sendEmail"
            @click="resendActivationLink"
          >
            <img src="@/assets/icon-resend.svg" alt="icon" class="fe-icon fe-menu-item__icon" />
            <span>{{ $t("auth.team.resendActivation") }}</span>
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title @click="deleteUser" class="fe-menu-item fe-menu-item__with-icons">
            <img src="@/assets/icon-delete.svg" alt="icon" class="fe-icon fe-menu-item__icon" />
            <span>{{ $t("auth.team.deleteUser") }}</span>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>
<script>
export default {
  name: "TeamDropList",
  props: {
    sendEmail: {
      type: Boolean
    }
  },
  data() {
    return {
      closeOnClick: true
    };
  },
  methods: {
    deleteUser() {
      this.$emit("deleteUser");
    },
    resendActivationLink() {
      this.$emit("resendActivationLink");
    }
  }
};
</script>
<style lang="scss">
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
