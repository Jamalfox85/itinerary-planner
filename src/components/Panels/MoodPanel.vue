<template lang="">
  <div class="page-panel mood-panel">
    <h1 class="panel-label">What the <img :src="getDuckUrl" alt="Duck" class="main-mood-duck-img" /> are you in the mood for:</h1>
    <div class="mood-groups">
      <div class="mood-group" style="--i: (0)" :class="{ active: activeMood == 0 }" @click="setActiveMood(0, 'adventure')" @mouseover="hoverMood('cool-duck')">
        <img class="mood-duck-img" src="../../assets/images/ducks/cool-duck.png" alt="cool duck" />
        <p class="mood-label">Adventure</p>
      </div>

      <div class="mood-group" style="--i: (1)" :class="{ active: activeMood == 1 }" @click="setActiveMood(1, 'culture')" @mouseover="hoverMood('love-duck')">
        <img class="mood-duck-img" src="../../assets/images/ducks/love-duck.png" alt="love duck" />
        <p class="mood-label">Culture</p>
      </div>

      <div class="mood-group" style="--i: (2)" :class="{ active: activeMood == 2 }" @click="setActiveMood(2, 'learning')" @mouseover="hoverMood('nervous-duck')">
        <img class="mood-duck-img" src="../../assets/images/ducks/nervous-duck.png" alt="nervous duck" />
        <p class="mood-label">Learning</p>
      </div>

      <div class="mood-group" style="--i: (3)" :class="{ active: activeMood == 3 }" @click="setActiveMood(3, 'relaxing')" @mouseover="hoverMood('money-duck')">
        <img class="mood-duck-img" src="../../assets/images/ducks/money-duck.png" alt="money duck" />
        <p class="mood-label">Relaxing</p>
      </div>

      <div class="mood-group" style="--i: (4)" :class="{ active: activeMood == 4 }" @click="setActiveMood(4, 'social connection')" @mouseover="hoverMood('tongue-duck')">
        <img class="mood-duck-img" src="../../assets/images/ducks/tongue-duck.png" alt="tongue duck" />
        <p class="mood-label">Connection</p>
        <!-- Probs gonna change this -->
      </div>
      <div class="mood-group" style="--i: (5)" :class="{ active: activeMood == 5 }" @click="setActiveMood(5, 'anything')" @mouseover="hoverMood('happy-duck')">
        <img class="mood-duck-img" src="../../assets/images/ducks/happy-duck.png" alt="happy duck" />
        <p class="mood-label">Anything</p>
      </div>
    </div>
  </div>
</template>
<script>
import { NButton } from "naive-ui";
import { persistentStore } from "../../stores/PersistentStorage.js";
export default {
  components: { NButton },
  data() {
    return {
      activeMood: null,
      duckImg: "normal-duck",
    };
  },
  setup() {
    let store = persistentStore();
    return { store };
  },
  computed: {
    getDuckUrl() {
      return new URL(`/src/assets/images/ducks/${this.duckImg}.png`, import.meta.url).href;
    },
  },
  methods: {
    setActiveMood(i, moodLabel) {
      this.activeMood = i;
      this.store.setMoodId(moodLabel);
    },
    nextPanel() {
      let panel = "mood";
      this.$emit("nextPanel", panel);
    },
    hoverMood(img) {
      this.duckImg = img;
    },
  },
};
</script>
<style lang="scss">
.mood-panel {
  display: flex;
  flex-direction: column;
  min-height: 75vh;
  padding: 0 2em;
  .panel-label {
    margin: 2em auto 1em auto;
    font-size: 4em;
    letter-spacing: 2px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    text-align: center;
    .main-mood-duck-img {
      height: 4em;
      margin: 0 1.25em;
    }
  }
  .mood-groups {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    padding: 4px;
    .mood-group {
      width: 150px;
      aspect-ratio: 1;
      border-radius: 50%;
      margin: 1em 2em;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;
      box-shadow: 2px 4px 4px hsl(0deg 0% 0% / 0.44);
      position: relative;
      transition: 0.1s ease-in;
      animation: anim-dropin 1s ease forwards;
      animation-delay: calc(0.2s * var(--i));
      transform: translateY(160px);
      opacity: 0;
      &.active {
        transform: scale(1.05);
        transition: 0.2s ease-in;
        box-shadow: 8px 16px 16px hsl(0deg 0% 0% / 0.25);
        border: solid 2px black;
        top: 0;
        opacity: 1 !important;
        .mood-duck-img {
          opacity: 1 !important;
        }
      }
      &:hover {
        transform: scale(1.2) !important;
        transition: 0.2s ease-in;
        box-shadow: 8px 16px 16px hsl(0deg 0% 0% / 0.25);
        cursor: pointer;
        opacity: 1 !important;
        .mood-duck-img {
          opacity: 1;
          transition: 0.2 ease-in;
        }
      }
      .mood-duck-img {
        width: clamp(4em, 5vw, 4em);
        opacity: 0.5;
      }
      .mood-label {
        font-size: 1em;
        font-weight: bold;
      }
    }
  }
}

@media screen and (max-width: 850px) {
  .mood-panel {
    width: 100%;
    min-width: auto;
    .panel-label {
      margin: 1.5em 0 0 0;
    }
  }
  .mood-groups {
    .mood-group {
      margin: 0;
    }
  }
}
</style>
