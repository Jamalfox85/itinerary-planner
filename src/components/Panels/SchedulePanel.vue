<template lang="">
  <div class="page-panel schedule-panel">
    <h1 class="panel-label">Here are your <img src="../../assets/images/ducks/tongue-duck.png" alt="Duck" class="main-mood-duck-img" />-ing recommendations for today:</h1>
    <n-button v-if="!showResults" type="primary" @click="loadItineraryResults" style="width: fit-content; margin: 0 auto">Get My Results</n-button>
    <div v-else class="results">
      <div class="activities_wrapper">
        <h2>Activities</h2>
        <n-spin v-if="itinerarySegments.length == 0" />
        <n-collapse>
          <n-collapse-item :title="segment.timeOfDay + ` (${segment.activities.length})`" :name="index" v-for="(segment, index) in itinerarySegments">
            <div v-for="activity in segment.activities">
              <b>{{ activity.label }}</b>
              <p>{{ activity.details }}</p>
            </div>
          </n-collapse-item>
        </n-collapse>
      </div>
      <div class="restaurants_wrapper">
        <h2>
          Restaurants<span @click="getRestaurantOptions"><font-awesome-icon :icon="['fa', 'refresh']" /></span>
        </h2>
        <n-spin v-if="restaurantResults.length == 0" />
        <n-collapse>
          <n-collapse-item :title="restaurant.poi.name" :name="index" v-for="(restaurant, index) in randomizeRestaurantResults(restaurantResults)">
            <p v-if="restaurant.address.freeformAddress">Address: {{ restaurant.address.freeformAddress }}</p>
            <p v-if="restaurant.poi.phone">Phone: {{ restaurant.poi.phone }}</p>
            <p v-if="restaurant.poi.url">
              Website: <a :href="'https://' + restaurant.poi.url">{{ restaurant.poi.url }}</a>
            </p>
            <template #header-extra>
              <div style="display: flex">
                <n-tag type="info" style="text-transform: capitalize" v-for="category in filteredCategories(restaurant.poi.categories)">{{ category }}</n-tag>
              </div>
            </template>
          </n-collapse-item>
        </n-collapse>
      </div>
    </div>
    <div class="assessment-navigation"></div>
  </div>
</template>
<script>
import { NButton } from "naive-ui";
import { useFetch } from "@vueuse/core";
import { getMoodPoiCodes } from "../../stores/moodPoiCodes.js";
import { persistentStore } from "../../stores/PersistentStorage.js";
import { getItineraryResponse } from "../../services/openai_service.js";
import { NCollapse, NCollapseItem, NTag, NSpin } from "naive-ui";
export default {
  components: { NButton, NCollapse, NCollapseItem, NTag, NSpin },
  data() {
    return {
      codes: [],
      itinerarySegments: [],
      restaurantResults: [],
      totalRestaurantResults: null,
      showResults: false,
    };
  },
  setup() {
    let store = persistentStore();
    let getItinerary = getItineraryResponse;
    return { store, getItinerary };
  },
  methods: {
    loadItineraryResults() {
      this.showResults = true;
      this.getGPTItineraryResponse(this.store.getCityName);
      this.getRestaurantOptions();
    },
    async getGPTItineraryResponse(cityName) {
      let itineraryObject = await this.getItinerary(cityName, this.store.moodId);
      this.itinerarySegments = itineraryObject;
    },
    randomizeRestaurantResults(restaurants) {
      let randomNums = Array.from({ length: 5 }, () => Math.floor(Math.random() * 100));
      return restaurants.filter((restaurant, index) => randomNums.includes(index));
    },
    filteredCategories(categories) {
      return categories.filter((cat) => cat !== "restaurant");
    },
    async getRestaurantOptions() {
      let apiKey = import.meta.env.VITE_TOMTOM_API_KEY;
      let categorySet = [7315];
      let limit = 100;
      let offset = 0;
      let location = this.store.getLocation;
      let restaurants = await useFetch(`https://api.tomtom.com/search/2/nearbySearch/.json?key=${apiKey}&lat=${location.lat}&lon=${location.long}&categorySet=${categorySet}&limit=${limit}&ofs=${offset}`).then((results) => {
        let jsonResponse = JSON.parse(results.data.value);
        let totalResults = jsonResponse.summary.totalResults;
        let resultArray = jsonResponse.results;
        this.restaurantResults = resultArray;
      });
    },
  },
};
</script>
<style lang="scss">
.schedule-panel {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  .panel-label {
    margin: 1em auto 1em auto;
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
  .results {
    display: flex;
    .activities_wrapper,
    .restaurants_wrapper {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1em 2em;
      flex-grow: 1;
      h2 {
        font-size: 2em;
        text-decoration: underline;
        margin-bottom: 2em;
        display: flex;
        align-items: center;
        span {
          margin-left: 0.5em;
          display: flex;
          svg {
            font-size: 1.5em;
            &:hover {
              cursor: pointer;
              color: #2080f0;
              transition: 0.2s ease;
            }
          }
        }
      }
      .n-collapse {
        width: 100%;
        flex-grow: 1;
      }
      .n-collapse-item__header-main {
        margin-right: 2em;
      }
    }
    .activities_wrapper {
      border-right: solid 1px;
      min-width: 65%;
      max-width: 65%;
    }
  }
}
</style>
