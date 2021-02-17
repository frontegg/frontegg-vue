<template>
  <component
    :is="'icon-' + iconName"
    :fill="fill"
    :width="width"
    :height="height"
    :view-box="viewBox"
    :xmlns="xmlns"
    :class="className"
  />
</template>

<script lang="ts">
import Delete from "./svgs/Delete";
import VerticalDots from "./svgs/VerticalDots";
import Invite from "./svgs/Invite";
import Resend from "./svgs/Resend";
import Search from "./svgs/Search";
import Google from "./svgs/Google";
import Github from "./svgs/Github";
export default {
  name: "FeIcon",
  components: {
    "icon-delete": Delete,
    "icon-search": Search,
    "icon-invite": Invite,
    "icon-resend": Resend,
    "icon-google": Google,
    "icon-github": Github,
    "icon-vertical-dots": VerticalDots
  },
  props: {
    iconName: {
      type: String
    },
    fill: {
      type: String
    },
    width: {
      type: String
    },
    height: {
      type: String
    },
    viewBox: {
      type: String
    },
    xmlns: {
      type: String
    },
    className: {
      type: Array
    }
  }
};
</script>
