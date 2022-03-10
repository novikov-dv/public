<template>
  <div class="root" @click="pageClick()">
    <div class="scene" ref="sceneDiv"/>
    <div class="dealer-text" v-if="isSceneLoaded" v-text="dealerText"/>
    <div class="user-text" v-if="isSceneLoaded" v-text="userText"/>
    <div class="button-panel" v-if="isSceneLoaded">
      <div class="button-group" v-if="!isGameOver && !canClose">
        <Button :value="T.Hit" @click="hit()"/>
        <Button :value="T.Stand" @click="stand()"/>
      </div>
    </div>
    <div class="game-over-panel">
      <HeaderText class="game-over-text" :style="{ opacity: gameOverText ? 1 : 0 }" :value="gameOverText"/>
    </div>
    <BackgroundMusic src="/music/ramparts.mp3"/>
    <SoundEffects :effects="['shuffle', 'take']"/>
    <MusicButton class="music-button"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { ref, watch } from '@vue/composition-api';
import { useTextResources } from '../resources';
import HeaderText from '../components/HeaderText.vue';
import Button from '../components/Button.vue';
import BackgroundMusic from '../components/BackgroundMusic.vue';
import SoundEffects from '../components/SoundEffects.vue';
import MusicButton from '../components/MusicButton.vue';
import { useGame } from '../game';
import { usePixi } from '../pixi';
import { CardActionType } from '../game/types';
import store from '../store';

export default Vue.extend({
  name: 'GamePage',
  components: {
    HeaderText,
    Button,
    BackgroundMusic,
    SoundEffects,
    MusicButton
  },
  setup () {
    const isSceneLoaded = ref(false);
    const sceneDiv = ref<HTMLDivElement | null>(null);
    const loadComplete = () => { isSceneLoaded.value = true; };
    const { processAction } = usePixi(sceneDiv, loadComplete);

    const {
      isGameOver,
      isUserWon,
      isSameScore,
      dealerScore,
      userScore,
      hit,
      stand,
      reset
    } = useGame((args) => {
      switch (args.type) {
        case CardActionType.RESET:
          store.dispatch('addSoundEffect', 'shuffle')
          break;
        case CardActionType.MOVE_FROM_DECK_TO_DEALER:
        case CardActionType.MOVE_FROM_DECK_TO_USER:
          store.dispatch('addSoundEffect', 'take')
          break;
      }
      processAction(args);
    });

    watch(isSceneLoaded, () => {
      reset();
    });

    return {
      ...useTextResources(),
      isSceneLoaded,
      sceneDiv,
      isGameOver,
      isUserWon,
      isSameScore,
      dealerScore,
      userScore,
      hit,
      stand
    };
  },
  beforeMount () {
    if (!this.$store.getters.isLoaded)
      this.$router.replace({
        name: 'Loading'
      });      
  },
  data: () => ({
    canClose: false
  }),
  computed: {
    gameOverText () {
      if (!this.isGameOver)
        return '';
      if (this.isSameScore)
        return this.T.Draw;

      return this.isUserWon
        ? this.T.Winner
        : this.T.Loser;
    },
    dealerText () {
      return this.T.Hand.Dealer.replace('{score}', this.dealerScore);
    },
    userText () {
      return this.T.Hand.User.replace('{score}', this.userScore);
    }
  },
  watch: {
    isGameOver (isGameOver: boolean) {
      if (!isGameOver)
        return;
      setTimeout(() => {
        this.canClose = true;
      }, 500); // закрывать можно через полсекунды после окончания игры
    }
  },
  methods: {
    pageClick () {
      if (!this.canClose)
        return;
      this.$router.replace({
        name: 'Start'
      });      
    }
  }
});

</script>

<style scoped>
  .root {
    height: 100%;
    display: grid;
    grid-template: 2rem 1fr 5rem 1fr 2rem / 2rem 1fr 1fr 1fr 2rem;
  }
  .scene {
    grid-row-start: 1;
    grid-row-end: 6;
    grid-column-start: 1;
    grid-column-end: 6;
    z-index: -1;
  }
  .dealer-text,.user-text {
    grid-column: 3;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
  }
  .dealer-text {
    grid-row: 2;
  }
  .user-text {
    grid-row: 4;
  }
  .button-panel {
    grid-row: 4;
    grid-column: 4;
    display: flex;
    justify-content: center;
  }
  .button-group {
    display: flex;
    flex-direction: column;
    gap: .8rem;
    width: fit-content;
    height: fit-content;
  }
  .game-over-panel {
    grid-row-start: 2;
    grid-row-end: 5;
    grid-column-start: 2;
    grid-column-end: 5;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .game-over-text {
    opacity: 0;
    color: #ce9f54;
    text-shadow: .2rem .2rem .2rem rgba(0, 0, 0, .6);
    transition: opacity 3s ease;
  }
  .music-button {
    position: absolute;
    right: 2rem;
    bottom: 2rem;
  }
</style>
