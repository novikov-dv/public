<template>
  <div class="root">
    <HeaderText class="logo" :value="T.Logo" />
    <div class="start-panel">
      <Button class="start-button" :value="T.Start" @click="start()"/>
    </div>
    <div v-if="isMobileOrTablet" class="mobile-panel" v-text="T.MobileOrTabletDisclaimer"/>
    <BackgroundMusic src="/music/upinmyjam.mp3"/>
    <MusicButton class="music-button"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { useTextResources } from '../resources';
import HeaderText from '../components/HeaderText.vue';
import Button from '../components/Button.vue';
import BackgroundMusic from '../components/BackgroundMusic.vue';
import MusicButton from '@/components/MusicButton.vue';

export default Vue.extend({
  name: 'StartPage',
  components: {
    HeaderText,
    Button,
    BackgroundMusic,
    MusicButton
  },
  setup () {
    const getIsMobileOrTabletBrowser = () => ([
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i
    ].some((toMatchItem) => navigator.userAgent.match(toMatchItem)));

    const isMobileOrTablet = getIsMobileOrTabletBrowser();

    return {
      ...useTextResources(),
      isMobileOrTablet
    };
  },
  beforeMount () {
    if (!this.$store.getters.isLoaded)
      this.$router.replace({
        name: 'Loading'
      });      
  },
  methods: {
    start () {
      this.$router.replace({
        name: 'Game'
      });      
    }
  }
});

</script>

<style scoped>
  .root {
    height: 100%;
    display: grid;
    grid-template: 1fr auto auto 1fr / 1fr auto 1fr;
    grid-gap: .8rem;
    background-color: #f6cc8a;
  }
  .logo {
    grid-row: 2;
    grid-column: 2;
  }
  .start-panel {
    grid-row: 3;
    grid-column: 2;
    width: auto;
    text-align: center;
  }
  .start-button {
    display: inline-block;
  }
  .music-button {
    position: absolute;
    right: 2rem;
    bottom: 2rem;
  }
  .mobile-panel {
    grid-row: 4;
    grid-column: 2;
    width: auto;
    text-align: center;
    font-weight: bold;
    font-size: 1rem;
    margin-top: 2rem;
  }
</style>
