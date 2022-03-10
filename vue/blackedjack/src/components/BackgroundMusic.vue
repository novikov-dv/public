<template>
  <audio ref="audio" :src="urlFromCache(src)" autoplay="autoplay"/>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'BackgroundMusic',
  props: {
    src: {
      required: true,
      type: String,
      validator: value => typeof value === 'string' && !!value
    }
  },
  mounted () {
    if (!this.$refs.audio)
      return;
    this.$store.dispatch('addAudioSource', this.$refs.audio);
  },
  beforeDestroy () {
    this.$store.dispatch('removeAudioSource', this.$refs.audio);
  },
  methods: {
    urlFromCache (url: string) {
      return this.$store.state.blobs[url];
    }
  }
});
</script>
