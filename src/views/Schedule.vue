<template lang="">
  <div class="schedule_wrapper">
    <h1 class="schedule-header">SCHEDULE</h1>
    <div class="results" v-for="category in getResults">
      <h2>{{ category.label }}</h2>
      <n-card class="place-card" v-for="result in category.results">
        <div class="type-circle">
          <font-awesome-icon :icon="['fas', 'bag-shopping']" />
        </div>
        <div class="place-info">
          <p class="title">{{ result.poi.name }}<span class="hours">(Hours)</span></p>
          <hr class="divider" />
          <p>{{ result.address.freeformAddress }}</p>
        </div>
        <font-awesome-icon v-if="result.poi.url" class="icon" :icon="['fas', 'up-right-from-square']" @click="openLink(`https://${result.poi?.url}`)" />
        <font-awesome-icon v-if="result.poi.phone" class="icon" :icon="['fas', 'phone']" @click="openLink(`tel:${result.poi?.phone}`)" />
      </n-card>
    </div>
  </div>
</template>
<script>
import { NCard } from "naive-ui";
import { usePlacesStore } from "../stores/places.js";

export default {
  components: { NCard },
  data() {
    return {
      results: [],
    };
  },
  setup() {
    let store = usePlacesStore();
    return { store };
  },
  computed: {
    getResults() {
      return this.store.getResults;
    },
  },
  mounted() {
    this.results = this.store.getResults;
  },
  methods: {
    openLink(link) {
      window.open(link, "_blank");
    },
  },
};
</script>
<style lang="scss">
.schedule_wrapper {
  min-height: 100vh;
  width: 100%;
  padding: 4em;
  background-color: #007cbe;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  .schedule-header {
    font-size: 3em;
  }
  .place-card {
    margin-bottom: 0.5em;
    .n-card__content {
      display: flex;
      align-items: center;
      min-width: 450px;
      .type-circle {
        height: 60px;
        width: 60px;
        border-radius: 50%;
        background-color: #ffa3af40;
        display: flex;
        margin-right: 1em;
        svg {
          margin: auto;
          font-size: 2em;
          color: #ffa3af;
        }
      }
      .place-info {
        flex-grow: 1;
        .title {
          font-size: 1.5em;
          font-weight: bold;
        }
        .hours {
          font-size: 0.5em;
          font-weight: lighter !important;
          margin: 0 0.5em;
        }
      }
      .icon {
        font-size: 2em;
        margin: 0 0.5em;
      }
    }
  }
}
</style>
