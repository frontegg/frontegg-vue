<template>
  <svg :width="width" :height="height" :viewBox="viewBox" :xmlns="xmlns" :class="className">
    <path
      :fill="fill"
      d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
    ></path>
  </svg>
</template>

<script>
export default {
  name: "VerticalDots",
  props: {
    fill: {
      type: String,
      default: "currentColor"
    },
    width: {
      type: String,
      default: "14"
    },
    height: {
      type: String,
      default: "14"
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
