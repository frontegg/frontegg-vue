<template>
  <div class="fe-team__layout">
    <TeamTableToolbar
      @onSearchChange="onSearchChange"
      @onOpenModal="onOpenModal"
    />
    <TeamTable2 />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TeamTableToolbar from "@/components/Team/TeamTableToolbar.vue";
import TeamTable2 from "@/components/Team/TeamTable2.vue";

export default Vue.extend({
  name: "TeamLayout",
  components: {TeamTableToolbar, TeamTable2},
  methods: {
    onSearchChange(val: string) {
      console.log('onSearchChange:', val);
    },
    onOpenModal() {
      console.log('onOpenModal')
    }
  },
});
</script>

<style lang="scss" scoped>

</style>