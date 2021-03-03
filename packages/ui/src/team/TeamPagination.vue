<template>
  <div class="fe-table__pagination table-pagination">
    <v-pagination
      v-model="current"
      :length="total"
    />
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
.fe-pagination, .table-pagination .v-pagination {
  height: 3rem;
  min-height: 3rem;
  text-align: center;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: row;
  background: var(--color-gray-0);

  .fe-button, .v-pagination__navigation {
    box-shadow: none;
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
    padding: 0;
    color: var(--color-gray-5);
    background: var(--color-gray-0);
    border: 0;
    margin: 0 0.5rem;
    justify-content: center;
    align-items: center;
    display: flex;

    &.fe-button-disabled, &--disabled {
      opacity: 0.45;
      background: transparent;
    }

    svg {
      width: 1.2rem;
      height: 1.2rem;
    }
    .v-icon {
      color: var(--color-gray-5);
    }
  }

  &-option, .v-pagination__item {
    outline: none;
    padding: 0;
    min-width: 0;
    margin: 0.25rem;
    font-size: 0.9rem;
    width: 2rem;
    height: 2rem;
    text-align: center;
    line-height: 2rem;
    box-shadow: none;
    background: none;
    cursor: pointer;
    border-radius: 50%;

    &:hover {
      background: var(--color-gray-2);
    }

    &.selected-option, &--active {
      font-weight: bold;
      background: var(--color-primary-lighter) !important;
      color: var(--color-primary) !important;
    }
  }

  .page-separator {
    font-size: 0.8rem;
    height: 0.5rem;
    line-height: 1px;
    color: var(--color-gray-5);
    letter-spacing: 1.2px;
    font-weight: bold;
  }
}
</style>
