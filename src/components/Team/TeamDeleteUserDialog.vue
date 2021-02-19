<template>
  <div class="delete-modal-holder">
    <v-menu
      :close-on-click="closeOnClick"
      bottom
      right
    >
      <template v-slot:activator="{ on, attrs }">
        <div
          class="open-fe-menu "
          v-bind="attrs"
          v-on="on"
        >
          <FeIcon :params="{ iconName: 'vertical-dots' }" />
        </div>
      </template>
      <v-list :class="'delete-modal fe-menu'">
        <v-list-item>
          <v-list-item-title
            v-if="sendEmail"
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
        <v-list-item>
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
<script>
import FeIcon from "@/components/core/elements/Icons/FeIcon";
export default {
  name: "TeamDeleteUserDialog",
  components: {
    FeIcon
  },
  props: {
    sendEmail: {
      type: Boolean
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      closeOnClick: true
    };
  },
  methods: {
    deleteUser() {
      if (!this.disable) {
        this.$emit("deleteUser");
      }
    },
    resendActivationLink() {
      this.$emit("resendActivationLink");
    }
  }
};
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
