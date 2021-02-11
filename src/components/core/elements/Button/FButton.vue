<template>
  <button
    :ref="params.ref"
    :class="classNames(classes, { ['fe-icon-button']: params.iconButton, ['fe-button-transparent']: params.transparent })"
    :type="params.type"
    :test-id="params.testId"
    @click="onClick"
  >
    <slot></slot>
    {{ params.children }}
    <FeLoader v-if="params.loading" :size="params.size === 'small' ? 18 : 24" />
  </button>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { ButtonProps } from './interfaces'
import { ClassNameGenerator } from '@/styles/';
import classNames from 'classnames';

export default Vue.extend({
  name: 'FButton' as string,
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
  mounted() {
    this.classes =  ClassNameGenerator.generate({
      className: this.params.class,
      prefixCls: this.params.prefixCls,
      size: this.params.prefixCls,
      theme: this.params.disabled ? 'disabled' : this.params.variant,
      isClickable: true,
      isFullWidth: this.params.fullWidth,
      isLoading: this.params.loading,
    });
  },
  methods: {
    onClick() {
      this.$emit('click')
    },
  },
});
</script>

<style lang="scss">
  @import './FeButton.scss';
</style>