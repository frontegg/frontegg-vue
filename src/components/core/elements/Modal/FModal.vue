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
        <v-form class="fe-form" v-model="isFormValid" v-if="inviteForm">
          <div class="fe-input fe-input-full-width fe-input-in-form">
            <div class="fe-input__header">
              <div class="fe-input__label"> {{ $t('common.name') }}</div>
            </div>
            <div :class="{ 'input-error': error.name }">
              <v-text-field
                name="name"
                v-model="name"
                :rules="rules.name"
                :placeholder="$t('common.enter-name')"
              />
              <div class="fe-input__error" v-if="error.name">
                The Name is required
              </div>
            </div>
          </div>
          <div class="fe-input fe-input-full-width fe-input-in-form">
            <div class="fe-input__header">
              <div class="fe-input__label">{{ $t('common.email') }}</div>
            </div>
            <div :class="{ 'input-error': error.email }">
              <v-text-field
                name="email"
                v-model="email"
                :rules="rules.email"
                :placeholder="$t('common.enter-email')"
              />
              <div class="fe-input__error" v-if="error.email">
                The Email is required
              </div>
            </div>
          </div>
        </v-form>
        <v-card-actions>
          <v-btn text @click="close" class="fe-button">
            {{ btnLeftText }}
          </v-btn>
           <v-btn
            text
            class="fe-button fe-button-large"
            v-if="inviteForm"
            :class="{'fe-button-disabled': !isFormValid}"
            @click.prevent="inviteSubmit "
          >
            {{ btnRightText }}
          </v-btn>
          <v-btn
            text
            @click="close"
            class="fe-button fe-button-large"
            v-else
          >
            {{ btnRightText }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
export default {
  name: "TeamInviteModal",
  props: {
    inviteForm: {
      type: Boolean,
      default: false,
    },
    openModal: {
      type: Boolean,
      default: false,
    },
    btnLeftText: {
      type: String,
      default: "Close",
    },
    btnRightText: {
      type: String,
      default: "Save",
    },
    headText: {
      type: String,
      default: "Modal",
    },
  },
  data() {
    return {
      isFormValid: false,
      email: "",
      name: "",
      error: {
        email: false,
        name: false,
      },
      rules: {
        email: [
          (v: string) => !!v || false,
          (v: string) =>
            !v ||
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
            false,
        ],
        name: [(v: string) => !!v || "The Name is required"],
      },
    };
  },
  methods: {
    close() {
      this.$emit("onCloseModal", false);
      this.clearFields()
    },
    inviteSubmit() {
      if(this.isFormValid) {
        this.close();
      } else {
        !this.name ? this.error.name = true : 0
        !this.email ? this.error.email = true : 0
      }
    },
    clearFields() {
      this.error.name = false
      this.error.email = false
      this.name = ''
      this.email = ''
    }
  },
};
</script>

<style lang="scss" >
@import "./FeModal.scss";
</style>