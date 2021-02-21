<template>
  <div>
    <v-form
      ref="form"
      v-model="isFormValid"
      class="fe-form"
      @keyup.native.enter="submitForm"
    >
      <div class="fe-input fe-input-full-width fe-input-in-form">
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
      </div>
      <div class="fe-input fe-input-full-width fe-input-in-form">
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
      </div>
      <v-autocomplete
        v-if="isAuthenticated"
        v-model="roleValues"
        class="fe-select fe-select-full-width fe-input__in-form"
        :items="rolesSet"
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
            {{ item }}
          </v-chip>
        </template>
      </v-autocomplete>
      <div v-if="inviteError" class="fe-error-message">
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
          'fe-button-primary': isFormValid
        }"
        :loading="loading"
        @click.prevent="submitForm"
      >
        {{ $t("common.invite") }}
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script lang="ts">
import { mapState } from "@/plugins/fronteggCore/map-state";
import { AuthState } from "@/plugins/fronteggAuth/Api";
import { teamActions } from "@/plugins/fronteggAuth/Api/TeamState/index.ts";
import { FRONTEGG_STORE_KEY } from "@/plugins/fronteggCore/constants";

export default {
  name: "TeamAddUserDialog",
  props: {
    roles: {
      type: Array
    }
  },
  data(): any {
    return {
      ...mapState(this, {
        loading: (state: { auth: AuthState }) => state.auth.teamState.addUserDialogState.loading,
        teamState: (state: { auth: AuthState }) => state.auth.teamState.addUserDialogState.error,
        isAuthenticated: (state: { auth: AuthState }) => state.auth.isAuthenticated
      }),
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
        emailRules: [
          (v: string) =>
            !!v ||
            this.$t("validation.required-field", {
              name: this.$t("common.email")
            }),
          (v: string) =>
            !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || this.$t("validation.must-be-a-valid-email")
        ]
      },
      roleValues: "",
      searchInput: ""
    };
  },
  computed: {
    inviteError(): any {
      if (this.teamState) {
        return this.teamState;
      } else {
        return null;
      }
    },
    rolesSet(): any {
      return this.roles.map((role: any) => role.name);
    }
  },
  watch: {
    roleValues() {
      this.form.roleIds = this.roleValues
        .flatMap((r: any) => this.roles.filter((role: any) => r === role.name))
        .map((role: any) => role.id);
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
        this?.[FRONTEGG_STORE_KEY]?.dispatch(teamActions.addUser(data));
      }
    },
    onCancel() {
      this.formReset();
      this.$emit("onCloseModal", false);
    },
    removeSelectedRole(item: string) {
      this.roleValues.splice(this.roleValues.indexOf(item), 1);
      this.roleValues = [...this.roleValues];
    },
    clear() {
      console.log(1);
    }
  }
};
</script>

<style></style>
