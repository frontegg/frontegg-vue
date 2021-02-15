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
              <div class="fe-input__label">{{ $t("common.name") }}</div>
            </div>
            <div>
              <v-text-field
                name="name"
                v-model="name"
                :rules="rules.name"
                :placeholder="$t('common.enter-name')"
              />
            </div>
          </div>
          <div class="fe-input fe-input-full-width fe-input-in-form">
            <div class="fe-input__header">
              <div class="fe-input__label">{{ $t("common.email") }}</div>
            </div>
            <div>
              <v-text-field
                name="email"
                v-model="email"
                :rules="rules.email"
                :placeholder="$t('common.enter-email')"
              />
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
            :class="{
              'fe-button-disabled': !isFormValid && inviteForm,
              'fe-button-primary': isFormValid || !inviteForm,
            }"
            @click.prevent="rightBtnClick"
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
      rules: {
        email: [
          (v: string) => !!v || "The Email is required",
          (v: string) =>
            !v ||
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
            "Must be a valid email",
        ],
        name: [(v: string) => !!v || "The Name is required"],
      },
    };
  },
  methods: {
    close() {
      this.$emit("onCloseModal", false);
      this.clearFields();
    },
    inviteSubmit() {
      if (this.isFormValid) {
        this.close();
      }
    },
    clearFields() {
      this.name = "";
      this.email = "";
    },
    rightBtnClick() {
      if (this.inviteForm) {
        this.inviteSubmit();
      } else {
        this.close();
      }
    },
  },
};
</script>

<style lang="scss" >
@import "./FeModal.scss";
</style>