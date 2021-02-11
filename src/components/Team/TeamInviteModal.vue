<template>
  <div 
    class="invite-modal" 
    data-app >
    <v-dialog
      v-model="openModal"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Invite New Teammate</span>
          <v-btn
              icon
              dark
              @click="close"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-card-title>
        <v-card-actions>
          <v-btn
            color="blue darken-1"
            text
            @click="close"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="close"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "TeamInviteModal",
  props: {
    openModal: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close(){
      this.$emit('onCloseModal', false)
    }
  }
};
</script>

<style lang="scss">
  .fe-popup {
    &__container {
      z-index: 10;
      border-radius: var(--fe-popup-border-radius, var(--element-border-radius-sm));
      padding: var(--fe-popup-padding, var(--element-padding-lg));
      box-shadow: var(--fe-popup-shadow, var(--popup-shadow));
      background-color: var(--fe-popup-bg, var(--color-white));

      color: var(--color-gray-9);
    }
  }
</style>