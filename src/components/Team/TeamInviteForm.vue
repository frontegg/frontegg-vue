<template>
  <v-form class="fe-form">
    <div class="fe-input fe-input-full-width fe-input-in-form">
      <div class="fe-input__header">
        <div class="fe-input__label">Name</div>
      </div>
      <div :class="{ 'input-error': false }">
        <v-text-field
          name="name"
          v-model="name"
          :rules="rules.name"
          placeholder="Enter name"
        />
        <div class="fe-input__error" v-if="false">The Name is required</div>
      </div>
    </div>
    <div class="fe-input fe-input-full-width fe-input-in-form">
      <div class="fe-input__header">
        <div class="fe-input__label">Email</div>
      </div>
      <div :class="{ 'input-error': false }">
        <v-text-field
          name="email"
          v-model="name"
          :rules="rules.email"
          placeholder="Enter email"
        />
        <div class="fe-input__error" v-if="false">The Email is required</div>
      </div>
    </div>
    <div class="fe-dialog__footer">
      <div class="fe-grid fe-container">
        <div class="fe-grid fe-item fe-grid-xs-true">
          <FButton>Cancel</FButton>
         
        </div>
        <div class="fe-grid fe-item fe-grid-xs-true fe-text-align-end">
          <FButton>Invite</FButton>

          
        </div>
      </div>
    </div>
  </v-form>
</template>

<script lang="ts">
import FButton from "@/components/core/elements/Modal/FModal.vue";

export default {
  name: "TeamInviteForm",
  components: {FButton},
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
};
</script>