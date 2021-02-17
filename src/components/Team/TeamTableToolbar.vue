<template>
  <div class="fe-team__table-toolbar">
    <div class="fe-grid fe-container">
      <div class="fe-grid fe-item fe-grid-xs-6 fe-grid-md-3">
        <div class="fe-input fe-input-full-width fe-input-with-suffix-icon">
          <div class="fe-input__inner">
            <input
              v-model="inputField"
              :placeholder="$t('auth.team.search-users')"
              class="fe-input__input"
              type="text"
            >
            <FeIcon :params="{ iconName:'search' }"/>
          </div>
        </div>
      </div>
      <div class="fe-grid fe-item fe-grid-xs-6 fe-grid-md-9 fe-text-align-end">
        <button
          class="fe-button fe-button-primary fe-button-large fe-button-clickable btn-invite"
          type="button"
          @click="onModalOpenClick"
        >
          {{ $t("auth.team.invite-user") }}
          <FeIcon :params="{ iconName:'invite' }"/>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import debounce from "lodash/debounce";
import FeIcon from "@/components/core/elements/Icons/FeIcon";

export default Vue.extend({
  name: "TeamTableToolbar",
  components: {
    FeIcon
  },
  data() {
    return {
      inputField: ""
    };
  },
  watch: {
    inputField: debounce(function(val) {
      this.$emit("input", val);
    }, 400)
  },
  methods: {
    onModalOpenClick() {
      this.$emit("onOpenModal");
    }
  }
});
</script>

<style lang="scss" scoped>
.btn-invite {
  img {
    width: 13px;
    height: 13px;
  }
}
</style>
