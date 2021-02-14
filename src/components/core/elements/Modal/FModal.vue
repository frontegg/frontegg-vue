<template>
  <div data-app>
    <v-dialog
      v-model="openModal"
      persistent
      transition="dialog-top-transition"
      max-width="600px"
      :content-class="'fe-modal'"
    >
      <v-card>
        <v-card-title>
          <span class="headline"> {{ headText }} </span>
          <v-btn icon dark @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>


        <slot name="content"></slot>

      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
export default {
  name: "TeamInviteModal",
  props: {
    openModal: {
      type: Boolean,
      default: false,
    },
    headText: {
      type: String,
      default: "Modal",
    },
  },
  methods: {
    close() {
      this.$emit("onCloseModal", false);
    }
  }
};
</script>

<style lang="scss" >
@import "./FeModal.scss";
</style>