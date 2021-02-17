<template>
  <svg :width="width" :height="height" :viewBox="viewBox" :xmlns="xmlns" :class="className">
    <path
      :fill="fill"
      d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"
    ></path>
  </svg>
</template>

<script>
export default {
  name: "Delete",
  props: {
    fill: {
      type: String,
      default: "currentColor"
    },
    width: {
      type: String,
      default: "1rem"
    },
    height: {
      type: String,
      default: "1rem"
    },
    viewBox: {
      type: String,
      default: "0 0 24 24"
    },
    xmlns: {
      type: String,
      default: "http://www.w3.org/2000/svg"
    },
    className: {
      type: Array
    }
  }
};
</script>
