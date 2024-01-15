<template>
  <div class="dashboard_wrapper">
    <Itinerary class="itinerary" />
    <div class="info-blocks"></div>
    <div class="etiquette"></div>
    <div class="weather"></div>
    <div class="currency-conversion"></div>
    <div class="public-transportation-info"></div>
    <Restaurants class="restaurants" />
    <TimeZone class="time-zone-converter" />
  </div>
</template>

<script>
import { NButton } from "naive-ui";
import Itinerary from "../components/Itinerary.vue";
import Restaurants from "../components/Restaurants.vue";
import TimeZone from "../components/TimeZone.vue";

export default {
  components: { NButton, Itinerary, Restaurants, TimeZone },
};
</script>

<style lang="scss">
.dashboard_wrapper {
  height: 100vh;
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
    background-color: purple;
    grid-row: 2/3;
    grid-column: 3/4;
  }
  .weather {
    background-color: red;
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
</style>
