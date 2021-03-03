<template>
  <svg
    :width="width"
    :height="height"
    :viewBox="viewBox"
    :xmlns="xmlns"
    :class="className"
  >
    <path
      :fill="fill"
      d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
    />
  </svg>
</template>

<script>
export default {
  name: "Resend",
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
