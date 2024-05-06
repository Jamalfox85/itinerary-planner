<template lang="">
  <div class="itinerary_wrapper">
    <div class="cell-header-restaurant-recommendations">
      <h2>Restaurant Recommendations</h2>
      <n-button color="#a2e3c4" style="color: black" @click="updateDisplayedRestaurants">Refresh</n-button>
    </div>
    <div class="results">
      <n-spin style="margin-top: 2em" v-if="restaurantsToDisplay.length == 0" />
      <div v-for="(restaurant, index) in restaurantsToDisplay" class="restaurant-group">
        <p class="title">{{ restaurant?.poi.name }}</p>
        <font-awesome-icon :icon="['fas', 'circle-info']" class="icon" @click="showRecommendationDetailModal(index)" />
        <n-button class="save-bttn" color="#00cc66" @click="saveRestaurant(index)"><font-awesome-icon :icon="['fas', 'check']" /></n-button>
      </div>
    </div>
    <n-modal v-model:show="showDetailModal" class="details-modal">
      <n-card class="details-card">
        <div>Name: {{ activeRestaurant?.poi.name }}</div>
        <div>Phone: {{ activeRestaurant?.poi.phone }}</div>
        <div>Address: {{ activeRestaurant?.address.freeformAddress }}</div>
      </n-card>
    </n-modal>
  </div>
</template>
<script>
import { NButton, NCollapse, NCollapseItem, NTag, NSpin, NModal, NCard } from "naive-ui";
import { useFetch } from "@vueuse/core";
import { persistentStore } from "../stores/PersistentStorage.js";

export default {
  components: { NButton, NCollapse, NCollapseItem, NTag, NSpin, NModal, NCard },
  props: { location: Object },
  data() {
    return {
      restaurantsToDisplay: [],
      restaurantResults: [],
      totalRestaurantResults: null,
      showDetailModal: false,
      activeRestaurant: null,
    };
  },
  setup() {
    let store = persistentStore();
    return { store };
  },
  async mounted() {
    await this.getRestaurantRecommendations();
    this.updateDisplayedRestaurants();
  },
  watch: {
    location: async function (oldVal, newVal) {
      await this.getRestaurantRecommendations();
      this.updateDisplayedRestaurants();
    },
  },
  methods: {
    showRecommendationDetailModal(index) {
      this.showDetailModal = true;
      this.activeRestaurant = this.restaurantsToDisplay[index];
    },
    async getRestaurantRecommendations() {
      if (this.location?.coordinates) {
        let apiKey = import.meta.env.VITE_TOMTOM_API_KEY;
        let categorySet = [7315];
        let limit = 100;
        let offset = 0;
        let location = {
          lat: this.location.coordinates.latitude,
          long: this.location.coordinates.longitude,
        };
        let restaurants = await useFetch(`https://api.tomtom.com/search/2/nearbySearch/.json?key=${apiKey}&lat=${location.lat}&lon=${location.long}&categorySet=${categorySet}&limit=${limit}&ofs=${offset}`).then((results) => {
          let jsonResponse = JSON.parse(results.data.value);
          let resultArray = jsonResponse.results;
          this.restaurantResults = resultArray;
        });
        this.restaurantsToDisplay = this.restaurantResults;
      }
    },
    updateDisplayedRestaurants() {
      let randomNums = Array.from({ length: 5 }, () => Math.floor(Math.random() * 100));
      this.restaurantsToDisplay = this.restaurantResults.filter((restaurant, index) => randomNums.includes(index));
    },
    saveRestaurant(restaurantIndex) {
      this.$emit("addRestaurant", this.restaurantsToDisplay[restaurantIndex]);
      this.restaurantsToDisplay = this.restaurantsToDisplay.filter((restaurant, index) => {
        return index !== restaurantIndex;
      });
    },
    removeRestaurant(restaurantIndex) {
      this.restaurantsToDisplay = this.restaurantsToDisplay.filter((restaurant, index) => {
        return index !== restaurantIndex;
      });
    },
  },
};
</script>
<style lang="scss">
.itinerary_wrapper {
  position: relative;
  z-index: 3;
  .cell-header-restaurant-recommendations {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .results {
    display: flex;
    color: #fff;
    .no-restaurant-display {
      margin: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 2em;
      .n-button {
        margin-top: 1em;
      }
    }
    .restaurant-group {
      align-items: center;
      display: flex;
      margin-bottom: 0.25em;
      .icon {
        margin: 0 1em 0 auto;

        cursor: pointer;
      }
    }
  }
}
</style>
