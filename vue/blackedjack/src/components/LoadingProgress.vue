<template>
  <div class="root">
    <div class="outer"/>
    <div class="inner">
      <div class="indicator" :style="indicatorStyle"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'LoadingProgress',
  props: {
    value: {
      required: true,
      type: Number,
      validator: value => typeof value === 'number' && !isNaN(value)
    }
  },
  computed: {
    indicatorStyle () {
      const normalizedValue = Math.max(0.0, Math.min(this.value, 1.0));
      const percentValue = Math.round(100 * normalizedValue);
      return { width: `${percentValue}%`};
    }
  }
});
</script>

<style scoped>
  .root {
    height: 2rem;
    display: grid;
    grid-template: .2rem 1fr .2rem / .2rem 1fr .2rem;
  }
  .outer {
    grid-row-start: 1;
    grid-row-end: 4;
    grid-column-start: 1;
    grid-column-end: 4;
    background: linear-gradient(90deg, rgb(241,209,152) 0%, rgb(249,228,195) 22%, rgb(211,164,92) 55%, rgb(183,134,60) 70%, rgb(231,185,113) 100%);
    border-radius: .5rem;
    box-shadow: .2rem .2rem .3rem 0 rgba(0, 0, 0, 0.6);
  }
  .inner {
    background-color: #ce9f54;
    grid-row: 2;
    grid-column: 2;
    border-radius: .3rem;
    box-shadow: .1rem .1rem .2rem 0 rgba(0, 0, 0, 0.6) inset, -.1rem -.1rem .2rem 0 rgba(0, 0, 0, 0.6) inset;
    display: grid;
    grid-template: .2rem 1fr .2rem / .2rem 1fr .2rem;
  }
  .indicator {
    grid-row: 2;
    grid-column: 2;
    background: linear-gradient(0deg, rgba(78,70,143,1) 0%, rgba(53,45,119,0.9176393072289156) 30%, rgba(169,139,203,1) 70%, rgba(78,70,143,1) 100%, rgba(231,185,113,1) 100%);
    border-radius: .2rem;
    transition: width .3s ease;
  }
  .text { color: #58401B }
</style>