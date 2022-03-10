<template>
  <div style="visibility: collapse">
    <audio v-for="effect in effects" ref="effect" :src="urlFromCache(`/music/${effect}.mp3`)" :key="effect" :data-key="effect"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'SoundEffects',
  props: {
    effects: {
      required: true,
      type: Array
    }
  },
  data: () => ({
    audios: null as Record<string, HTMLAudioElement> | null
  }),
  watch: {
    '$store.state.soundEffects' () {
      const { soundEffects, isMusicDisabled } = this.$store.state;
      if (!soundEffects.length)
        return;

      if (!this.audios) {
        const cache: Record<string, HTMLAudioElement> = { };
        (this.$refs.effect as HTMLAudioElement[]).forEach(audio => {
          const key = audio.getAttribute('data-key') ?? '';
          cache[key] = audio;
        });
        this.audios = cache;
      }

      let timeout = 0;
      if (!isMusicDisabled) {
        const { audios } = this;
        soundEffects.forEach((soundEffect: string) => {
          const audio = audios[soundEffect];
          if (!audio)
            return;
          setTimeout((audio: HTMLAudioElement) => this.play(audio), timeout, audio);
          timeout += 500;
        });
      }

      this.$store.dispatch('clearSoundEffects');
    }
  },
  methods: {
    play (audio: HTMLAudioElement) {
      audio.loop = false;
      audio.pause();
      audio.currentTime = 0;
      audio.play();
    },
    urlFromCache (url: string) {
      return this.$store.state.blobs[url];
    }
  }
});
</script>
