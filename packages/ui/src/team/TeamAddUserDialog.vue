<template>
  <div>
    <v-form
      ref="form"
      v-model="isFormValid"
      class="fe-form"
      @keyup.native.enter="submitForm"
    >
      <label class="fe-input fe-input-full-width fe-input-in-form">
        <div class="fe-input__header">
          <div class="fe-input__label">
            {{ $t("common.name") }}
          </div>
        </div>
        <div>
          <v-text-field
            v-model="form.name"
            :rules="formRules.nameRules"
            required
            :placeholder="$t('common.enter-name')"
          />
        </div>
      </label>
      <label class="fe-input fe-input-full-width fe-input-in-form">
        <div class="fe-input__header">
          <div class="fe-input__label">
            {{ $t("common.email") }}
          </div>
        </div>
        <div>
          <v-text-field
            v-model="form.email"
            :rules="formRules.emailRules"
            required
            :placeholder="$t('common.enter-email')"
          />
        </div>
      </label>
      <v-autocomplete
        v-if="isAuthenticated"
        v-model="form.roleIds"
        class="fe-select fe-select-full-width fe-input__in-form"
        :items="avaliableRoles"
        item-value="value"
        item-text="label"
        chips
        clearable
        :label="$t('common.roles')"
        multiple
        :menu-props="{ contentClass: 'add-user-menu' }"
      >
        <template v-slot:selection="{ attrs, item, select, selected }">
          <v-chip
            v-if="item"
            v-bind="attrs"
            :input-value="selected"
            close
            @click="select"
            @click:close="removeSelectedRole(item)"
          >
            {{ item.label }}
          </v-chip>
        </template>
      </v-autocomplete>
      <div
        v-if="inviteError"
        class="fe-error-message"
      >
        {{ inviteError }}
      </div>
    </v-form>

    <v-card-actions>
      <v-btn
        :class="{ 'fe-button-disabled': loading }"
        text
        class="fe-button"
        @click="onCancel"
      >
        {{ $t("common.cancel") }}
      </v-btn>
      <v-btn
        text
        class="fe-button fe-button-large"
        :class="{
          'fe-button-disabled': !isFormValid,
          'fe-button-primary': isFormValid,
          'fe-button-loader': loading
        }"
        :loading="loading"
        :disabled="loading"
        @click.prevent="submitForm"
      >
        {{ $t("common.invite") }}
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { checkRoleAccess } from "./helpers";
import {validateEmail } from "./utils";

import { mapTeamActions } from "@frontegg/vue-core/auth";

export default Vue.extend({
  name: "TeamAddUserDialog",
  props: {
    roles: {
      type: Array
    }
  },
  data(): any {
    return {
      ...this.mapTeamState(),

      isFormValid: false,
      form: {
        name: "",
        email: "",
        roleIds: []
      },
      formRules: {
        nameRules: [
          (v: string) =>
            !!v ||
            this.$t("validation.required-field", {
              name: this.$t("common.name")
            })
        ],
        emailRules: validateEmail(),
      },
      roleValues: "",
      searchInput: ""
    };
  },
  computed: {
    user() {
      return this.fronteggAuth.user
    },
    loading() {
      return this.$data.teamState.addUserDialogState.loading
    },
    addUserDialogError() {
      return this.$data.teamState.addUserDialogState.error
    },
    isAuthenticated() {
      return this.fronteggAuth.isAuthenticated
    },

    inviteError(): any {
      if (this.addUserDialogError) {
        return this.addUserDialogError;
      } else {
        return null;
      }
    },
    avaliableRoles(): any {
      return checkRoleAccess(this.roles, this.user);
    }
  },
  methods: {
    formReset() {
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
    },
    itemCreated() {
      if (!this.inviteError) {
        this.$emit("itemCreated");
        this.formReset();
      }
    },
    async submitForm() {
      const valid = this.$refs.form.validate();
      if (valid) {
        const data = {
          callback: () => this.itemCreated(),
          ...this.form
        };
        mapTeamActions('addUser')(data);
      }
    },
    onCancel() {
      this.formReset();
      this.$emit("onCloseModal", false);
    },
    removeSelectedRole(item: string) {
      this.form.roleIds.splice(this.form.roleIds.indexOf(item), 1);
      this.form.roleIds = [...this.form.roleIds];
    },
    clear() {
    }
  }
})
</script>

<style></style>
