<template>
  <div class="loading-panel">
    <LoadingProgress class="progress" :value="loadingProgress"/>
    <span class="text" v-text="T.Loading"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { useTextResources } from '../resources';
import LoadingProgress from '../components/LoadingProgress.vue';

export default Vue.extend({
  name: 'LoadingPage',
  components: {
    LoadingProgress
  },
  setup () {
    return {
      ...useTextResources()
    };
  },
  computed: {
    loadingProgress () {
      return this.$store.state.loadingProgress;
    }
  },
  mounted () {
    this.startLoading();
  },
  methods: {
    startLoading () {
      if (this.$store.getters.isLoaded)
        return this.endLoading();
      this.$store.dispatch('loadGameData');
    },
    endLoading () {
      this.$router.replace({
        name: 'Start'
      });
    }
  },
  watch: {
    '$store.state.loadingProgress' () {
      if (this.$store.getters.isLoaded)
        this.endLoading();
    }
  }
});
</script>

<style scoped>
  .loading-panel {
    height: 100%;
    display: grid;
    grid-template: 1fr auto auto 1fr / 1fr 1fr 1fr;
    background-color: #f6cc8a;
  }
  .progress {
    grid-row: 2;
    grid-column: 2;
    width: 100%;
    margin-bottom: 1rem;
  }
  .text {
    color: #58401B;
    grid-row: 3;
    grid-column: 2;
    text-align: center;
    font-family: 'Ruslan Display', cursive;
    font-size: 1.4rem;
  }
</style>
