<template lang="">
  <div class="itinerary_wrapper">
    <div class="results">
      <n-collapse :accordion="true">
        <div v-for="(restaurant, index) in restaurantsToDisplay" class="restaurant-group">
          <n-collapse-item :title="restaurant?.poi?.name" :name="restaurant?.poi?.name">
            <template #header-extra>
              <n-button class="save-bttn" color="#00cc66" @click="saveRestaurant(index)"><font-awesome-icon :icon="['fas', 'check']" /></n-button>
              <!-- <n-button class="not-interested-bttn" type="error" @click="removeRestaurant(index)"><font-awesome-icon :icon="['fas', 'ban']" /></n-button> -->
            </template>
            <p>Address: {{ restaurant?.address?.freeformAddress }}</p>
            <p>Website: {{ restaurant?.poi?.url }}</p>
          </n-collapse-item>
          <!-- <n-button class="save-bttn" color="#00cc66" @click="saveRestaurant(index)"><font-awesome-icon :icon="['fas', 'check']" /></n-button> -->
          <!-- <n-button class="not-interested-bttn" type="error" @click="removeRestaurant(index)"><font-awesome-icon :icon="['fas', 'ban']" /></n-button> -->
        </div>
      </n-collapse>
    </div>
  </div>
</template>
<script>
import { NButton, NCollapse, NCollapseItem, NTag, NSpin } from "naive-ui";
import { useFetch } from "@vueuse/core";
import { persistentStore } from "../stores/PersistentStorage.js";

export default {
  components: { NButton, NCollapse, NCollapseItem, NTag, NSpin },
  props: { location: Object },
  data() {
    return {
      restaurantsToDisplay: [],
      restaurantResults: [],
      totalRestaurantResults: null,
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
    async getRestaurantRecommendations() {
      if (this.location?.coordinates) {
        let apiKey = import.meta.env.VITE_TOMTOM_API_KEY;
        let categorySet = [7315];
        let limit = 100;
        let offset = 0;
        // let location = this.store.getLocation;
        console.log("LOCATION: ", this.location);
        let location = {
          lat: this.location.coordinates.latitude,
          long: this.location.coordinates.longitude,
        };
        let restaurants = await useFetch(`https://api.tomtom.com/search/2/nearbySearch/.json?key=${apiKey}&lat=${location.lat}&lon=${location.long}&categorySet=${categorySet}&limit=${limit}&ofs=${offset}`).then((results) => {
          let jsonResponse = JSON.parse(results.data.value);
          // let totalResults = jsonResponse.summary.totalResults;
          let resultArray = jsonResponse.results;
          this.restaurantResults = resultArray;
        });
        // let restaurantArray = await this.getItinerary(this.cityName, mood);
        // console.log("RESTAURANT: ", this.restaurantResults);
        // this.restaurantsToDisplay = restaurantArray;
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
        console.log(index, restaurantIndex);

        return index !== restaurantIndex;
      });
    },
  },
};
</script>
<style lang="scss">
.itinerary_wrapper {
  .results {
    display: flex;
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
    .n-collapse {
      width: 100%;
      flex-grow: 1;
      margin-top: 0.5em;
      .restaurant-group {
        display: flex;
        margin-bottom: 1em;
        .n-collapse-item {
          border-radius: 8px;
          padding: 0.25em;
          margin-right: auto;
          flex-grow: 1;
          .n-collapse-item__header {
            padding: 0;
            .n-collapse-item__header-main {
            }
          }
        }
        .save-bttn {
          margin: 0 0.5em;
        }
        .not-interested-bttn {
        }
      }
    }
  }
}
</style>
