<template>
  <div class="fe-table__pagination table-pagination">
    <v-pagination v-model="current" :length="total" @input="changePage" />
  </div>
</template>

<script>
export default {
  name: "TeamPagination",
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    totalPages: {
      type: Number,
      default: 3,
    },
  },
  computed: {
    current: {
      get: function () {
        return this.currentPage;
      },
    },
    total() {
      return this.totalPages;
    },
  },
  methods: {
    changePage(val) {
      this.$emit("input", val);
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/pagination.scss";
</style>