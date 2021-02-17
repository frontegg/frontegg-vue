<template>
  <div class="fe-table__pagination table-pagination">
    <v-pagination v-model="current" :length="total" />
  </div>
</template>

<script>
export default {
  name: "TeamPagination",
  props: {
    currentPage: {
      type: Number
    },
    totalPages: {
      type: Number
    }
  },
  computed: {
    current: {
      get() {
        return this.currentPage;
      },
      set(val) {
        this.$emit("input", val);
      }
    },
    total() {
      return this.totalPages;
    }
  },
  methods: {
    changePage(val) {
      this.$emit("input", val);
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/pagination.scss";
</style>
