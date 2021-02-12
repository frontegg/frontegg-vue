<template>
  <div class="delete-modal-holder">
    <v-menu :close-on-click="closeOnClick" bottom>
      <template v-slot:activator="{ on, attrs }">
        <svg
          v-on="on"
          v-bind="attrs"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          class="fe-icon"
        >
          <path
            fill="currentColor"
            d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
          ></path>
        </svg>
      </template>
      <v-list :class="'delete-modal'">
        <v-list-item>
          <v-list-item-title @click="deleteUser">
            <svg
              width="1rem"
              height="1rem"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              class="fe-icon fe-color-danger"
            >
              <path
                fill="currentColor"
                d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"
              ></path>
            </svg>
            <span class="ml-3">{{ $t("auth.team.deleteUser") }}</span>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>
<script>
export default {
  name: "DeleteModal",
  data() {
    return {
      closeOnClick: true,
    };
  },
  methods: {
    deleteUser() {
      this.$emit("deleteUser");
    },
  },
};
</script>
<style lang="scss">
.delete-modal-holder {
  position: relative;
}
.delete-modal {
  cursor: pointer;
  padding: var(--element-padding);
  &:hover {
    background: var(--color-gray-2);
  }
  .v-list-item {
    padding: 0;
    min-height: 1px;
    &__title {
      display: flex;
      align-items: center;
    }
  }
}
</style>