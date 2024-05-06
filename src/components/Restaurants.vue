<template lang="">
  <div class="restaurants_wrapper">
    <div class="restaurants-header">
      <h2 class="cell-header">Restaurants</h2>
      <font-awesome-icon :icon="['fa', 'refresh']" @click="updateDisplayedRestaurants" class="refresh-icon" />
    </div>
    <div class="results">
      <n-spin v-if="restaurantsToDisplay.length == 0" />
      <n-collapse>
        <n-collapse-item :title="restaurant.poi.name" :name="index" v-for="(restaurant, index) in restaurantsToDisplay">
          <p v-if="restaurant.address.freeformAddress">Address: {{ restaurant.address.freeformAddress }}</p>
          <p v-if="restaurant.poi.phone">Phone: {{ restaurant.poi.phone }}</p>
          <p v-if="restaurant.poi.url">
            Website: <a :href="'https://' + restaurant.poi.url" target="_blank">{{ restaurant.poi.url }}</a>
          </p>
          <template #header-extra>
            <div style="display: flex">
              <n-tag round :color="{ color: '#86BAA1', textColor: '#ffffff', borderColor: '#86BAA1' }" style="text-transform: capitalize" v-for="category in filteredCategories(restaurant.poi.categories)">{{ category }}</n-tag>
            </div>
          </template>
        </n-collapse-item>
      </n-collapse>
    </div>
  </div>
</template>
<script>
import { NButton, NCollapse, NCollapseItem, NTag, NSpin } from "naive-ui";
import { useFetch } from "@vueuse/core";

export default {
  components: { NButton, NCollapse, NCollapseItem, NTag, NSpin },

  data() {
    return {
      codes: [],
      restaurantResults: [],
      totalRestaurantResults: null,
      showResults: false,
      restaurantsToDisplay: [],
    };
  },
  async mounted() {
    let apiKey = import.meta.env.VITE_TOMTOM_API_KEY;
    let categorySet = [7315];
    let limit = 100;
    let offset = 0;
    // let location = this.store.getLocation;
    let location = {
      lat: 33.7488,
      long: -84.3877,
    };
    let restaurants = [];
    // let restaurants = await useFetch(`https://api.tomtom.com/search/2/nearbySearch/.json?key=${apiKey}&lat=${location.lat}&lon=${location.long}&categorySet=${categorySet}&limit=${limit}&ofs=${offset}`).then((results) => {
    //   let jsonResponse = JSON.parse(results.data.value);
    //   let totalResults = jsonResponse.summary.totalResults;
    //   let resultArray = jsonResponse.results;
    //   this.restaurantResults = resultArray;
    // });
    this.updateDisplayedRestaurants();
  },
  methods: {
    filteredCategories(categories) {
      return categories.filter((cat) => cat !== "restaurant");
    },
    updateDisplayedRestaurants() {
      let randomNums = Array.from({ length: 5 }, () => Math.floor(Math.random() * 100));
      this.restaurantsToDisplay = this.restaurantResults.filter((restaurant, index) => randomNums.includes(index));
    },
  },
};
</script>
<style lang="scss">
.restaurants_wrapper {
  background-color: #edead0;
  .restaurants-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .refresh-icon {
      font-size: 1.5em;
      cursor: pointer;
      transition: 0.1s ease;
      &:hover {
        color: #86baa1;
      }
    }
  }
  .results {
    margin-top: 2em;
    border: solid 2px orange;
    .n-collapse {
      .n-collapse-item {
        &:not(:first-child) {
          border-top: solid 2px #86baa1;
        }
      }
    }
  }
}
</style>
