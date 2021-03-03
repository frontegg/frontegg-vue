<script lang="ts">
import Vue from 'vue';
// Uncomment import and local "components" registration if library is not registered globally.
// import { FronteggCoreSample } from '@/entry.esm';

export default Vue.extend({
  name: 'ServeDev',
  // components: {
  //  FronteggCoreSample,
  // }
});
</script>

<template>
  <div id="app">
    <frontegg-core-sample />
  </div>
</template>
