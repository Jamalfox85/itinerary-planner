<template lang="">
  <div class="page-panel schedule-panel">
    <h1 class="panel-label">Here are your <img src="../../assets/images/ducks/tongue-duck.png" alt="Duck" class="main-mood-duck-img" />-ing recommendations for today:</h1>
    <div class="results">
      <div class="activities_wrapper">
        <h2>Activities</h2>
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

        <n-collapse>
          <n-collapse-item :title="restaurant.poi.name" :name="index" v-for="(restaurant, index) in randomizeRestaurantResults(restaurantResults)">
            <p v-if="restaurant.address.freeformAddress">Address: {{ restaurant.address.freeformAddress }}</p>
            <p v-if="restaurant.poi.phone">Phone: {{ restaurant.poi.phone }}</p>
            <p v-if="restaurant.poi.url">Website: {{ restaurant.poi.url }}</p>
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
import { NCollapse, NCollapseItem, NTag } from "naive-ui";
export default {
  components: { NButton, NCollapse, NCollapseItem, NTag },
  data() {
    return {
      codes: [],
      itinerarySegments: [],
      restaurantResults: [],
      totalRestaurantResults: null,
    };
  },
  setup() {
    let store = persistentStore();
    let getItinerary = getItineraryResponse;
    return { store, getItinerary };
  },
  async mounted() {
    let moodId = this.store.getMoodId;
    let cityName = this.store.getCityName;
    // this.getGPTItineraryResponse(cityName);
    this.getRestaurantOptions();
    this.itinerarySegments = [
      {
        timeOfDay: "morning",
        activities: [
          {
            label: "Morning Hike at Torrey Pines State Natural Reserve",
            details: "Embark on a scenic hiking trail along the coastline, enjoying breathtaking views of the ocean and unique geological formations.",
          },
          {
            label: "Kayaking at La Jolla Cove",
            details: "Explore the stunning underwater world and observe marine wildlife such as seals, sea lions, and bright orange Garibaldi fish on a kayaking adventure in La Jolla Cove.",
          },
        ],
      },
      {
        timeOfDay: "afternoon",
        activities: [
          {
            label: "Visit USS Midway Museum",
            details: "Board the aircraft carrier museum that showcases the history of USS Midway, explore the various aircraft on display, and learn about naval aviation.",
          },
          {
            label: "Go Surfing at Pacific Beach",
            details: "Catch some waves and experience the thrill of surfing at Pacific Beach, known for its reliable surf breaks and vibrant beach atmosphere.",
          },
          {
            label: "Bike Ride along Mission Bay",
            details: "Rent a bike and enjoy a leisurely ride along the scenic paths surrounding Mission Bay, taking in the beautiful views of the water and park areas.",
          },
        ],
      },
      {
        timeOfDay: "evening",
        activities: [
          {
            label: "Sunset Cliffs Natural Park",
            details: "Head to Sunset Cliffs Natural Park to witness a breathtaking sunset over the rugged coastline. Take a relaxing walk along the cliffside trails.",
          },
          {
            label: "Balboa Park",
            details: "Explore the beautiful Balboa Park, home to numerous gardens, museums, and the world-renowned San Diego Zoo. Enjoy a picnic or visit one of the cultural exhibits.",
          },
          {
            label: "Gaslamp Quarter",
            details: "Immerse yourself in the vibrant nightlife of the Gaslamp Quarter. Explore the eclectic mix of bars, restaurants, and live entertainment options.",
          },
        ],
      },
      {
        timeOfDay: "night",
        activities: [
          {
            label: "San Diego Padres Game",
            details: "Experience the thrill of a baseball game at Petco Park, home of the San Diego Padres. Cheer on the team and enjoy the lively atmosphere of the stadium.",
          },
          {
            label: "Harbor Cruise",
            details: "Embark on a relaxing harbor cruise and admire the city skyline lit up at night. Enjoy the breathtaking views of the San Diego Bay and iconic landmarks.",
          },
        ],
      },
    ];
    console.log(this.itinerarySegments);
  },
  methods: {
    async getGPTItineraryResponse(cityName) {
      console.log("GPT LOCATION: ", cityName);
      let itineraryObject = await this.getItinerary(cityName, "adventure");
      this.itinerarySegments = itineraryObject;
      console.log("JSON: ", itineraryObject);
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
        console.log("TOTAL RESULTS: ", totalResults);
        let resultArray = jsonResponse.results;
        console.log("RESULTS: ", resultArray);
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
