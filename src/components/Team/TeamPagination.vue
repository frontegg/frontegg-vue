<template>
  <div class="table-pagination">
    <v-pagination 
      v-model="current" 
      :length="total" 
      @input="changePage"
    />
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
  data() {
    return {
      current: this.currentPage,
      total: this.totalPages
    }
  },
  methods: {
    changePage(val) {
      this.$emit('input', val)
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/pagination.scss";
</style>