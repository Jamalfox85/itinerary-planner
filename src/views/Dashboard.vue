<template>
  <div class="dashboard_wrapper">
    <!-- <Searchbar />
    <div class="dashboard-main">
      <Itinerary class="itinerary" />
      <div class="info-blocks"></div>
      <div class="etiquette"></div>
      <Weather class="weather" />
      <CurrencyConversion class="currency-conversion" />
      <div class="public-transportation-info"></div>
      <Restaurants class="restaurants" />
      <TimeZone class="time-zone-converter" />
    </div> -->
  </div>
</template>

<script>
// import { useFetch } from "@vueuse/core";
import { persistentStore } from "../stores/PersistentStorage.js";
import { NButton, NInput } from "naive-ui";
import Searchbar from "../components/Searchbar.vue";
// import Itinerary from "../components/Itinerary.vue";
import Restaurants from "../components/Restaurants.vue";
import TimeZone from "../components/TimeZone.vue";
import Weather from "../components/Weather.vue";
import CurrencyConversion from "../components/Currency.vue";

export default {
  components: { NButton, NInput, Searchbar, Restaurants, TimeZone, Weather, CurrencyConversion },
  setup() {
    let store = persistentStore();
    return { store };
  },
  async mounted() {
    await this.store.setUserData();
  },
};
</script>

<style lang="scss">
.dashboard_wrapper {
  overflow-y: scroll;
  .dashboard-main {
    width: 100%;
    border: solid 8px purple;
    display: grid;
    grid-template-rows: 4;
    grid-template-columns: 4;
    grid-gap: 20px;
    padding: 20px;
    transition: 0.2s ease;
    .itinerary {
      grid-row: 1/5;
      grid-column: 1/2;
    }
    .info-blocks {
      background-color: cyan;
      grid-row: 1/2;
      grid-column: 2/4;
    }
    .etiquette {
      background-color: brown;
      grid-row: 2/4;
      grid-column: 2/3;
    }
    .currency-conversion {
      grid-row: 2/3;
      grid-column: 3/4;
    }
    .weather {
      grid-row: 4/5;
      grid-column: 2/3;
    }
    .public-transportation-info {
      background-color: green;
      grid-row: 3/5;
      grid-column: 3/4;
    }
    .restaurants {
      grid-row: 1/4;
      grid-column: 4/5;
    }
    .time-zone-converter {
      grid-row: 4/5;
      grid-column: 4/5;
    }
    & > * {
      padding: 1em;
      border-radius: 12px;
      transition: 0.2s ease;
      .cell-header {
        font-size: 2em;
      }
    }
  }
}
</style>
