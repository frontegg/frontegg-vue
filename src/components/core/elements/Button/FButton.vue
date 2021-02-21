<template>
  <button
    :ref="params.ref"
    :class="classNames(classes, { ['fe-icon-button']: params.iconButton, ['fe-button-transparent']: params.transparent })"
    :type="params.type"
    :test-id="params.testId"
    @click="onClick($event)"
  >
    <Spinner v-if="params.loading" />
    <slot v-else />
  </button>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { ButtonProps } from './interfaces'
import { ClassNameGenerator } from '@/styles/';
import classNames from 'classnames';
import Spinner from "@/components/Common/Spinner.vue";
const prefixCls = 'fe-button';

export default Vue.extend({
  name: 'FButton' as string,
  components: {
    Spinner,
  },
  props: {
    params: {
      type: Object as PropType<ButtonProps>,
    },
  },
  data() {
    return {
      classes: '',
      classNames,
    }
  },
  watch: {
    params() {
      this.updateClasses();
    },
  },
  mounted() {
    this.updateClasses();
  },
  methods: {
    onClick(event) {
      this.$emit('click', event)
    },
    updateClasses() {
      this.classes = ClassNameGenerator.generate({
        className: this.params.class,
        prefixCls: prefixCls,
        size: this.params.size,
        theme: this.params.disabled ? 'disabled' : this.params.variant,
        isClickable: true,
        isFullWidth: this.params.fullWidth,
        isLoading: this.params.loading,
      });
    },
  },
});
</script>

<style lang="scss">
  @import './FeButton.scss';
  .fe-button-loader>:not(.fe-loader) {
    visibility: visible;
  }
</style>