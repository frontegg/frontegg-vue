<template>
  <div class="about">
    <Test>Test component</Test>
  </div>
</template>


<script lang="ts">
import Vue from 'vue';
import Test from '@/components/Test.vue';

export default Vue.extend({
  name: 'Home',
  components: {
    Test,
  },
});
</script>
