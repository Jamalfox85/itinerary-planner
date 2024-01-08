<template>
  <div class="home_wrapper" @mousemove="onMouseMove">
    <div class="main">
      <h1 class="primary-text" :style="{ color: primaryHeaderColor }">
        Where the
        <img :src="getDuckUrl" ref="duckImg" alt="Angry Duck" class="home-duck-img" :class="{ moveDuckToNextSlide: moodSlide }" :style="{ transform: `translate(${duckOffset.x}px, ${duckOffset.y}px)` }" />
        <img :src="getDuckUrl" ref="duckImg2" alt="Angry Duck" class="home-duck-img" style="animation: none; display: none" />
        should I go??
      </h1>
      <div class="bttn-row">
        <n-button type="error" class="base-bttn" @mouseover="hoverDoItMyself" @mouseleave="resetDefaults">I'll Figure It Out Myself...</n-button>
        <n-button type="primary" class="base-bttn" @mouseover="hoverFigureItOut" @mouseleave="resetDefaults" @click="nextSlide">IDK, Figure It Out For Me!</n-button>
      </div>
      <a href="https://www.vecteezy.com/free-png/angry-duck" class="attribution">Angry Duck PNGs by Vecteezy</a>
    </div>
    <location-panel id="location-panel" ref="locationSlide" />
    <mood-panel />
    <schedule-panel />
  </div>
</template>

<script>
import { NButton } from "naive-ui";
import Searchbar from "../components/Home/Searchbar.vue";
import LocationPanel from "../components/Panels/LocationPanel.vue";
import MoodPanel from "../components/Panels/MoodPanel.vue";
import SchedulePanel from "../components/Panels/SchedulePanel.vue";

export default {
  components: { Searchbar, NButton, LocationPanel, MoodPanel, SchedulePanel },
  data() {
    return {
      primaryHeaderColor: null,
      duckImg: "normal-duck",
      duckOffset: { x: 0, y: 0 },
      moodSlide: false,
    };
  },
  computed: {
    getDuckUrl() {
      return new URL(`/src/assets/images/ducks/${this.duckImg}.png`, import.meta.url).href;
    },
  },
  methods: {
    onMouseMove(e) {
      let mouseX = e.clientX;
      let mouseY = e.clientY;
      let clientW = window.innerWidth;
      let clientH = window.innerHeight;
      let xRatio = mouseX / clientW - 0.5;
      let yRatio = mouseY / clientH - 0.5;
      this.duckOffset.x = 35 * xRatio;
      this.duckOffset.y = 35 * yRatio;
    },
    hoverDoItMyself() {
      this.primaryHeaderColor = "#d03050";
      this.duckImg = "angry-duck";
    },
    hoverFigureItOut() {
      this.primaryHeaderColor = "#18a058";
      this.duckImg = "tongue-duck";
    },
    resetDefaults() {
      this.primaryHeaderColor = null;
      this.duckImg = "normal-duck";
    },
    nextSlide() {
      console.log("ping");
      this.moodSlide = true;
      this.$refs.duckImg2.style.display = "block";
      this.$refs.locationSlide.$el.scrollIntoView({ behavior: "smooth" });
    },
    goToAssessment() {
      this.$router.push("/assessment");
    },
  },
};
</script>

<style lang="scss" scoped>
.home_wrapper {
  min-height: 100vh;
  width: 100%;
  padding: 4em;
  position: relative;
  display: flex;
  flex-direction: column;
  .main {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    min-height: 100vh;

    .primary-text {
      margin: 2em 0;
      font-size: 4em;
      letter-spacing: 2px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      animation: 2s anim-popoutin ease forwards;
      text-align: center;
      .home-duck-img {
        height: 4em;
        margin: 0 1.25em;
      }
      .moveDuckToNextSlide {
        transition: 0.9s ease-in;
        animation: anim-duckdropin 0.75s forwards;
      }
    }
    .bttn-row {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  }
}
</style>
