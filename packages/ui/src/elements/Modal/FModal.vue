<template>
  <div data-app>
    <v-dialog
      v-model="openModal"
      max-width="600px"
      :content-class="'fe-modal'"
      persistent
    >
      <v-card>
        <v-card-title>
          <span class="headline"> {{ headText }} </span>
          <v-btn
            icon
            dark
            @click="close"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <slot name="content" />
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "FModal",
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
    close(): void {
      this.$emit("onCloseModal", false);
    }
  }
})

</script>

<style lang="scss" >
  .v-overlay__scrim {
  background-color: var(--color-black-10);
}

$dark: #333;
$gray: #6c757d;
$gray-1: #666666;
$gray-2: #ccc;
$gray-3: #808080;
$gray-4: #E6E6E6;
$gray-5: #E0EBFD;

.fe-modal.v-dialog {
  font-family: "Nunito Sans", Helvetica Neue, Arial, Helvetica, sans-serif;
  align-self: flex-start;


  .v-card {
    &__title {
      display: flex;
      justify-content: space-between;
      color: var(--color-gray-8);
      padding: 0 2rem;
      height: 4.5rem;
      border-bottom: 1px solid var(--element-divider-color);
    }

    &__actions {
      padding: 1.5rem 2rem;
      justify-content: space-between;
      background: var(--color-gray-0);
    }

    .v-btn--icon {
      width: fit-content;

      .v-icon {
        cursor: pointer;
        border: 0;
        background: transparent;
        font-size: 18px;
        font-weight: 700;
        line-height: 1;
        color: var(--color-black);
        text-shadow: 0 1px 0 var(--color-white);
        filter: alpha(opacity=20);
        opacity: 0.2;
        text-decoration: none;
        outline: none;

        &:before {
          font-weight: 700;
        }

        &:hover {
          opacity: 1;

        }
      }
    }
  }

  .headline {
    font-size: 1.1rem !important;
    line-height: 1.5rem;
    font-weight: 700;
    font-family: inherit !important;
  }

  .v-btn.fe-button {
    text-transform: none;

    &.fe-button-disabled {
      color: var(--color-gray-6)
    }

    &.fe-button-primary {
      color: var(--color-white)
    }

    &.fe-button-danger {
      color: var(--color-red-5)
    }
  }

  .fe-form {
    padding: 2rem;

    .fe-input__label {
      color: $gray;
    }

    .v-input {
      padding: 0;

      .v-text-field__details {
        min-height: 0px;
      }

      &__slot {
        margin-bottom: 0;

        &:before,
        &:after {
          display: none;
        }
      }
    }

    .v-menu__content {
      top: 44px !important;
      width: 100% !important;
      min-width: 1px !important;
      right: 0;
      max-width: 100%;
    }

    .v-select {

      .v-input__prepend-outer {
        display: none;
      }

      .v-input__icon--append {
        position: relative;
        padding: 8px;
        width: fit-content;

        .v-icon {
          width: 18px;
          height: 18px;
          cursor: pointer;

          &:before,
          &:after {
            all: unset;
            content: '';
            position: absolute;
            border-bottom: 3px solid var(--color-gray-4);
            width: 10px;
            left: 2px;
            border-radius: 50px;
          }

          &:before {
            transform: rotate(45deg);
          }

          &:after {
            transform: rotate(-45deg);
            left: 8px;
          }
        }

        &:before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          border-left: 1px solid var(--color-gray-4);
        }
      }

      .mdi-close {
        width: 15px;
        height: 15px;

        &:before,
        &:after {
          all: unset;
          content: '';
          position: absolute;
          border-bottom: 3px solid var(--color-gray-4);
          width: 100%;
          transform: rotate(45deg);
          left: 0;
          border-radius: 50px;
        }

        &:after {
          transform: rotate(-45deg);
        }
      }

      .v-input__slot {
        padding: 0;
        box-shadow: none;
        height: fit-content;
        min-height: 1px;
      }

      .v-text-field__details {
        display: none;
      }

      &--is-menu-active {
        .v-label {
          opacity: 0;
        }

        .v-select__slot {
          border: 2px solid var(--color-blue-7);
        }

        .mdi-close {

          &:before,
          &:after {
            border-color: $dark;
          }
        }

        .v-input__icon--append .v-icon {

          &:before,
          &:after {
            border-color: $gray-1;
          }
        }
      }

      &__slot {
        align-items: center;
        background-color: var(--color-white);
        border-radius: 4px;
        border: 1px solid $gray-2;
        min-height: 38px;
        position: relative;
        color: $dark;
        font-size: 0.875rem;

        .v-input__append-inner {
          align-self: center;
        }
      }

      .v-label {
        top: 50%;
        transform: translateY(-50%);
        left: 10px !important;
      }

      .v-label,
      .v-list-item__title {
        color: $gray-3;
        font-size: 0.875rem;
        font-weight: 400;
      }

      .v-chip {
        margin: 0;
        background-color: $gray-4;
        border-radius: 2px;
        display: flex;
        margin: 2px;
        min-width: 0px;
        font-size: 0.72rem;
        height: auto;
        padding: 3px 3px 3px 6px;

        &>* {
          line-height: 1.2;

        }

        &__content {
          display: inline-flex;
          align-items: center;
        }

        &__close {
          width: 10px;
          height: 10px;
          margin: 0 4px;

          &:after,
          &:before {
            all: unset;
            content: '';
            border-bottom: 2px solid $gray;
            width: 100%;
            position: absolute;
            border-radius: 5px;
            transform: rotate(45deg);
            left: 0;
          }

          &:after {
            transform: rotate(-45deg);
          }
        }
      }

      &__selections {
        padding: 2px 8px;
        min-height: 1px;
        min-height: 30px;

        input {
          height: 100%;
          display: inline-block;
        }
      }
    }

    .v-messages {
      display: none;

      &.error--text {
        display: block;
        margin-top: 5px;
      }
    }

    .v-text-field__slot {
      overflow: hidden;
      display: inline-flex;
      position: relative;
      vertical-align: middle;
      align-items: center;
      font-family: var(--element-font-family);
      font-size: var(--element-font-size);
      height: var(--element-height);
      width: 100%;
      border-radius: var(--element-border-radius-sm);
      background-color: var(--color-white);
      color: var(--color-gray-8);
      border: 1px solid var(--element-border-color);
      --size-height: var(--element-height-lg);
      --size-font-size: var(--element-font-size-lg);
      height: var(--size-height);
      font-size: 14px;

      &:hover {
        border-color: var(--color-gray-5);
      }
  
      &:focus-within {
        border-color: var(--theme-color);
      }
    }

    .input-error .v-text-field__slot,
    .v-input.error--text .v-text-field__slot {
      border-color: var(--color-danger);
      color: var(--color-danger);
    }
    

    .v-input.error--text {
      input {
        color: var(--color-danger);

        &::placeholder {
          color: var(--color-danger);
        }
      }
    }

    .v-messages {
      &__message {
        line-height: inherit;
        color: var(--color-danger);
        font-size: var(--element-font-size-sm);
      }
    }

    input {
      padding: 0 var(--element-padding);
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      background-color: inherit;
      font-family: inherit;
      color: inherit;
      font-family: Lato, "Helvetica Neue", Arial, Helvetica, sans-serif;
    }
  }

}

.add-user-menu.v-menu__content {
  .v-list {
    padding: 0;
  }

  .v-list-item {
    padding: 0;
    min-height: 1px;
    font-size: 0.85rem;

    &__action {
      display: none;
    }

    &__title {
      font-size: 0.875rem;
      color: $gray;
    }

    &__content {
      padding: 10px !important;

      &:hover {
        background: $gray-5;
      }
    }

  }

}

.fe-dialog {
  position: relative;
  width: auto;
  margin: 10px;

  &-wrap {
    position: fixed;
    overflow: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1050;
    -webkit-overflow-scrolling: touch;
    outline: 0;
  }

  &-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 4.5rem;
    border-radius: var(--element-border-radius-sm) var(--element-border-radius-sm) 0 0;
    background: var(--color-white);
    color: var(--color-gray-8);
    border-bottom: 1px solid var(--element-divider-color);
    padding: 0 2rem;
  }

  &-title {
    margin: 0;
    font-size: 1.1rem;
    line-height: 1.5rem;
    font-weight: bold;
  }

  &-content {
    overflow: hidden;
    position: relative;
    background-color: var(--color-white);
    border: none;
    border-radius: var(--element-border-radius-sm);
    background-clip: padding-box;
    box-shadow: 0 2rem 3rem -1rem rgba(0, 0, 0, 0.1);
  }

  &-body {
    padding: 2rem;
  }

  &__footer {
    width: calc(100% + 4rem);
    margin: 2rem -2rem -2rem;
    padding: 1.5rem 2rem;
    background: var(--color-gray-0);
  }

  &-mask {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: var(--color-black-10);
    height: 100%;
    filter: alpha(opacity=50);
    z-index: 1050;

    &-hidden {
      display: none;
    }
  }
}
</style>
