<template>
  <svg
    :width="width"
    :height="height"
    :viewBox="viewBox"
    :xmlns="xmlns"
    :class="className"
  >
    <path
      d="M 6 13.4 L 4.6 12 L 8.6 8 L 4.6 4 L 6 2.6 L 11.4 8 Z"
      :fill="fill"
      fill-rule="evenodd"
      transform="matrix(0, 1, -1, 0, 16, 0)"
    />
  </svg>
</template>

<script>
export default {
  name: "ArrowDown",
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
      default: "0 0 16 16"
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
