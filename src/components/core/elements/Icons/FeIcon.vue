<template>
  <component
    :is="'icon-' + params.iconName"
    :fill="params.fill"
    :width="params.width"
    :height="params.height"
    :view-box="params.viewBox"
    :xmlns="params.xmlns"
    :class="params.className"
    class="fe-icon"
  />
</template>

<script lang="ts">
import { PropType } from 'vue'
import { IconProps } from './interfaces'

import Delete from "./svgs/Delete.vue";
import VerticalDots from "./svgs/VerticalDots.vue";
import Invite from "./svgs/Invite.vue";
import Resend from "./svgs/Resend.vue";
import Search from "./svgs/Search.vue";
import Google from "./svgs/Google.vue";
import Github from "./svgs/Github.vue";

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
    params: {
      type: Object as PropType<IconProps>,
    },
  }
};
</script>
