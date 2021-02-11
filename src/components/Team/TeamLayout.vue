<template>
  <div class="fe-team__layout">
    <TeamTableToolbar
      @onSearchChange="onSearchChange"
      @onOpenModal="onOpenModal"
    />
    <TeamTable />
    <TeamPagination
      :current-page="currentPage"
      :total-pages="totalPages"
      @changePage="changePage"
    />
    <FModal
      :open-modal="openModal"
      :btnLeftText="'Cancel'"
      :btnRightText="'Invite'"
      :headText="'Invite New Teammate'"
      @onCloseModal="onCloseModal"
    >
      <template v-slot:content>
        <v-form  class="fe-form">
          <div class="fe-input__header">
            <div class="fe-input__label">
              Name
            </div>
          </div>
          <div>
            <v-text-field
              name="name"
              placeholder="Enter name"
            />
          </div>
          <div class="fe-input__header">
            <div class="fe-input__label">
              Email
            </div>
          </div>
          <div>
            <v-text-field
              name="email"
              placeholder="Enter email"
            />
          </div>
        </v-form>
      </template>
    </FModal>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TeamTableToolbar from "@/components/Team/TeamTableToolbar.vue";
import TeamTable from "@/components/Team/TeamTable.vue";
import TeamPagination from "@/components/Team/TeamPagination.vue";
import FModal from "@/components/core/elements/Modal/FModal.vue";

export default Vue.extend({
  name: "TeamLayout",
  components: { TeamTableToolbar, TeamTable, TeamPagination, FModal },
  data() {
    return {
      currentPage: 2,
      totalPages: 8,
      openModal: false,
    };
  },
  methods: {
    onSearchChange(val: string) {
      console.log("onSearchChange:", val);
    },
    onOpenModal() {
      console.log("onOpenModal");
      this.openModal = true;
    },
    onCloseModal() {
      console.log("onCloseModal");
      this.openModal = false;
    },
    changePage(val: number) {
      console.log("Current page:", val);
    },
  },
});
</script>

<style lang="scss" scoped>
</style>