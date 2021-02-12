<template>
  <div class="fe-team__table-toolbar">
    <div class="fe-grid fe-container">
      <div class="fe-grid fe-item fe-grid-xs-6 fe-grid-md-3">
        <div class="fe-input fe-input-full-width fe-input-with-suffix-icon">
          <div class="fe-input__inner">
            <input
              placeholder="Search by any text"
              class="fe-input__input"
              type="text"
              v-model="inputField"
            >
            <svg
              width="2rem"
              height="2rem"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              class="fe-icon fe-icon fe-icon-clickable"
            >
              <path
                fill="currentColor"
                d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div class="fe-grid fe-item fe-grid-xs-6 fe-grid-md-9 fe-text-align-end">
        <button
          class="fe-button fe-button-primary fe-button-large fe-button-clickable"
          type="button"
          @click="onModalOpenClick"
        >
          Invite User
          <svg
            width="2rem"
            height="2rem"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            class="fe-icon fe-ml-1"
          >
            <path
              fill="currentColor"
              d="M 12 3 A 4 4 0 0 0 8 7 A 4 4 0 0 0 12 11 A 4 4 0 0 0 16 7 A 4 4 0 0 0 12 3 z M 18 12 C 14.7 12 12 14.7 12 18 C 12 21.3 14.7 24 18 24 C 21.3 24 24 21.3 24 18 C 24 14.7 21.3 12 18 12 z M 11.050781 14.046875 C 7.8907812 14.308875 3 15.796 3 18.5 L 3 21 L 10.587891 21 C 10.211891 20.073 10 19.062 10 18 C 10 16.56 10.384781 15.213875 11.050781 14.046875 z M 17 15 L 19 15 L 19 17 L 21 17 L 21 19 L 19 19 L 19 21 L 17 21 L 17 19 L 15 19 L 15 17 L 17 17 L 17 15 z"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "TeamTableToolbar",
  data() {
    return {
      inputField: ""
    }
  },
  watch: {
    inputField(val) {
      this.$emit("input", val);
    }
  },
  methods: {
    onModalOpenClick() {
      this.$emit("onOpenModal");
    }
  }
});
</script>

<style lang="scss" scoped></style>
