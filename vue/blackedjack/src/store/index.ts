import { AnimatedGIF } from '@pixi/gif';
import Vue from 'vue';
import Vuex from 'vuex';
import { loadGifSprite, loadResources } from './loadResources';

Vue.use(Vuex);

const GIF_TEXTURE_URL = '/img/cardtexture.gif';

export default new Vuex.Store({
  state: {
    loadingProgress: 0,
    blobs: {
      '/music/ramparts.mp3': '',
      '/music/upinmyjam.mp3': '',
      '/music/shuffle.mp3': '',
      '/music/take.mp3': '',
      '/img/bgtexture.jpg': '',
      '/img/cards.svg': ''
    } as Record<string, string>,
    deckSprite: null as (AnimatedGIF | null),
    isMusicDisabled: Boolean(+(window.localStorage.getItem('isMusicDisabled') ?? '0')),
    audioSources: [] as HTMLAudioElement[],
    soundEffects: [] as string[]
  },
  getters: {
    isLoaded ({ loadingProgress }) {
      return loadingProgress >= 1;
    }
  },
  mutations: {
    'SET_LOADING_PROGRESS' (state, value: number) {
      state.loadingProgress = value;
    },
    'SET_LOADING_DATA' (state, value: Record<string, string>) {
      state.blobs = value;
    },
    'REFRESH_AUDIO_SOURCES' (state) {
      const { isMusicDisabled } = state;
      state.audioSources.forEach(audio => {
        if (isMusicDisabled)
          audio.pause();
        else
          audio.play();
      });
    },
    'SET_MUSIC_DISABLED' (state, value: boolean) {
      state.isMusicDisabled = value;
      window.localStorage.setItem('isMusicDisabled', value ? '1' : '0');
    },
    'SET_AUDIO_SOURCE' (state, value: HTMLAudioElement) {
      state.audioSources.push(value);
    },
    'CLEAR_AUDIO_SOURCE' (state, value: HTMLAudioElement) {
      const index = state.audioSources.indexOf(value);
      if (index >= 0)
        state.audioSources.splice(index, 1);
    },
    'ADD_SOUND_EFFECT' (state, value: string) {
      state.soundEffects.push(value);
    },
    'CLEAR_SOUND_EFFECTS' (state) {
      state.soundEffects = [];
    },
    'SET_DECK_SPRITE' (state, deckSprite: AnimatedGIF) {
      state.deckSprite = deckSprite;
    }
  },
  actions: {
    async loadGameData({ commit, state }) {
      const loadingUrls = Object.keys(state.blobs);
      loadResources(loadingUrls, 
        progress => {
          commit('SET_LOADING_PROGRESS', progress);
        },
        async blobs => {
          const deckSprite = await loadGifSprite(GIF_TEXTURE_URL);
          commit('SET_LOADING_DATA', blobs);
          commit('SET_DECK_SPRITE', deckSprite);
        });
    },
    toggleMusicDisabled({ commit, state }) {
      commit('SET_MUSIC_DISABLED', !state.isMusicDisabled);
      commit('REFRESH_AUDIO_SOURCES');
    },
    addAudioSource({ commit }, value: HTMLAudioElement) {
      commit('SET_AUDIO_SOURCE', value)
      commit('REFRESH_AUDIO_SOURCES');
    },
    removeAudioSource({ commit }, value: HTMLAudioElement) {
      commit('CLEAR_AUDIO_SOURCE', value)
    },
    addSoundEffect({ commit }, value: string) {
      commit('ADD_SOUND_EFFECT', value);
    },
    clearSoundEffects({ commit }) {
      commit('CLEAR_SOUND_EFFECTS');
    }
  },
  modules: { }
});
