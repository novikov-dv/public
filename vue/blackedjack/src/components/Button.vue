<template>
  <div class="button" @click="$emit('click')">
    <div class="outer">
      <div class="inner">
        <div class="text-shadow" v-text="value"/>
        <div class="text" v-text="value"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Button',
  props: {
    value: {
      required: true,
      type: String,
      validator: value => typeof value === 'string' && !!value
    }
  }
});
</script>

<style scoped>
  .button {
    height: 2rem;
    cursor: pointer;
  }
  .outer {
    background: linear-gradient(90deg, rgb(241,209,152) 0%, rgb(249,228,195) 22%, rgb(211,164,92) 55%, rgb(183,134,60) 70%, rgb(231,185,113) 100%);
    border-radius: .5rem;
    box-shadow: .2rem .2rem .3rem 0 rgba(0, 0, 0, 0.6);
    padding: .2rem;
    transition: transform .3s ease;
  }
  .outer:hover {
    transform: scale(1.2);
  }
  .inner {
    background-color: #ce9f54;
    border-radius: .3rem;
    box-shadow: .1rem .1rem .2rem 0 rgba(0, 0, 0, 0.6) inset, -.1rem -.1rem .2rem 0 rgba(0, 0, 0, 0.6) inset;
    padding: .3rem .6rem;
    color: linear-gradient(90deg, rgb(241,209,152) 0%, rgb(249,228,195) 22%, rgb(211,164,92) 55%, rgb(183,134,60) 70%, rgb(231,185,113) 100%);;
    text-align: center;
    position: relative;
  }
  .text-shadow,.text {
    font-family: 'Ruslan Display', cursive;
    font-size: 1.4rem;
    transform: translateY(.15rem); /* font margins fix */
  }
  .text-shadow {
    position: absolute;
    left: 0;
    width: 100%;
    font-weight: bold;
    text-shadow: .1rem .1rem .1rem #58401B, 0rem 0rem .1rem #58401B;
  }
  .text {
    position: relative;
    background: linear-gradient(90deg, rgb(241,209,152) 0%, rgb(249,228,195) 22%, rgb(211,164,92) 55%, rgb(183,134,60) 70%, rgb(231,185,113) 100%);
    font-weight: bold;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
</style>