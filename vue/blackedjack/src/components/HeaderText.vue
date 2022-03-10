<template>
  <div class="header" v-text="value"/>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'HeaderText',
  props: {
    value: {
      required: true,
      type: String
    }
  }
});
</script>

<style scoped>
  .header {
    font-family: 'Ruslan Display', cursive;
    font-size: 3rem;
    text-align: center;
  }
</style>