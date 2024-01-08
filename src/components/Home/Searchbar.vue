<template lang="">
  <div class="searchbar_wrapper">
    <h2 class="header">Inspire Me</h2>
    <form class="search-form">
      <NInput type="text" v-model:value="searchInput" class="search-input" placeholder="Search your City" />
      <NButton class="loc-bttn" color="#F4F4F8" ghost @click="getCurrentCoordinates"> <font-awesome-icon :icon="['fas', 'location-crosshairs']" /> </NButton>
      <NButton class="filter-bttn" color="#F4F4F8" ghost @click="showFilterModal = true"><font-awesome-icon :icon="['fas', 'sliders']" /></NButton>
      <NButton class="search-bttn" color="#F4F4F8" ghost @click="handleSearch"> <font-awesome-icon :icon="['fas', 'magnifying-glass']" /> </NButton>
    </form>
    <n-list>
      <n-list-item v-for="result in searchResults" @click="handleCityClick(result)">
        {{ result.name }}
      </n-list-item>
    </n-list>
    <filter-modal :showModalProp="showFilterModal" @closeModal="showFilterModal = false" />
  </div>
</template>
<script>
import { NInput, NButton, NList, NListItem } from "naive-ui";
import { useFetch } from "@vueuse/core";
import FilterModal from "./FilterModal.vue";
import { usePlacesStore } from "../../stores/places.js";

export default {
  components: { NInput, NButton, NList, NListItem, FilterModal },
  data() {
    return {
      searchInput: "",
      location: {},
      searchResults: [],
      accessToken: null,
      showFilterModal: false,
      categories: [],
    };
  },
  setup() {
    let store = usePlacesStore();
    return { store };
  },
  async mounted() {
    await useFetch(`https://test.api.amadeus.com/v1/security/oauth2/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: "DYZyJwgAYk6aKq0RXeA63numicJiI2oy",
        client_secret: "kKLY4SRhLXny9gv1",
      }),
    }).then((response) => {
      let oathResults = JSON.parse(response.data.value);
      this.accessToken = oathResults.access_token;
    });
  },
  watch: {
    searchInput: async function (newValue, oldValue) {
      if (newValue.length > 2) {
        this.handleSearch();
      } else {
        this.searchResults = [];
      }
    },
  },
  methods: {
    getCurrentCoordinates() {
      /* getCurrentPosition(successHandler, errorHandler) */
      navigator.geolocation.getCurrentPosition(
        /* Success Response */
        (results) => {
          this.location = {
            latitude: results.coords.latitude,
            longitude: results.coords.longitude,
          };
          this.findNearbyBusinesses();
        },
        /* Error Response */
        (results) => {
          console.log("ERROR");
        }
      );
    },
    async handleSearch() {
      await useFetch(`https://test.api.amadeus.com/v1/reference-data/locations/cities?keyword=${this.searchInput}&max=5`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      }).then((response) => {
        let results = JSON.parse(response.data.value);
        this.searchResults = results.data;
      });
    },
    handleCityClick(city) {
      this.location = city.geoCode;
      this.findNearbyBusinesses();
    },
    async findNearbyBusinesses() {
      let categories = await this.store.getCategories;
      let baseURL = "api.tomtom.com";
      let versionNumber = 2;
      let ext = "json";
      let apiKey = "CGtqpWKnAEW1T3B1bAjfBfqvpi9zoMay";
      let lat = this.location.latitude;
      let lon = this.location.longitude;
      let radius = 30000; /* In Meters */
      let limit = 15;
      let ofs = 0; /* The starting offset of the returned results within the full result set. */
      let countrySet = "US";
      /* topLeft & bottomRight are optional parameters that take in a list of lat/lon pairs to create a bounding box for search */
      let categorySet = categories !== null ? categories : ""; /* Comma separated list of categories that can be found here - https://developer.tomtom.com/search-api/documentation/search-service/category-search */
      let openingHours = "nextSevenDays";
      let timezone = "iana";
      let mapcodes = "Local";
      let relatedpois = "off";
      await useFetch(`https://${baseURL}/search/${versionNumber}/nearbySearch/.${ext}?key=${apiKey}&lat=${lat}&lon=${lon}&radius=${radius}&limit=${limit}&ofs=${ofs}&countrySet=${countrySet}&categorySet=${categorySet}&openingHours=${openingHours}&timeZone=${timezone}&mapcodes=${mapcodes}&relatedPois=${relatedpois}`).then(async (response) => {
        let apiResponse = JSON.parse(response.data.value);
        let results = apiResponse.results;
        this.store.setResults(results);
        this.$router.push("/schedule");
      });
    },
  },
};
</script>
<style lang="scss">
.searchbar_wrapper {
  background-color: #fe4a49;
  padding: 1em 2em;
  border-radius: 12px;
  width: 70%;
  color: #000;
  .header {
    font-size: 1.5em;
    margin-bottom: 0.5em;
    color: #f4f4f8;
  }
  .search-form {
    display: flex;
    justify-content: center;
    .search-input {
      border: solid 2px #f4f4f8;
      margin-right: 1em;
      border-radius: 4em;
      padding-left: 1em;
      background-color: transparent;
    }
    .loc-bttn,
    .filter-bttn,
    .search-bttn {
      margin-right: 1em;
      border-radius: 8px;
    }
  }
  .n-list {
    background-color: transparent;
    position: relative;
    z-index: 2;
    .n-list-item {
      border: solid 2px #f4f4f8;
      background-color: #ffffff;
      margin: 4px 8px;
      padding: 0 1em;
      border-radius: 8px;
      cursor: pointer;
      font-weight: bold;
    }
  }
}
</style>
