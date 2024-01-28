<template lang="">
  <div class="search_wrapper">
    <div class="selection-location-group">
      <n-spin v-if="locationLoading" />
      <h1 class="location-label" v-if="selectedLocation !== null">{{ selectedLocation.name }}</h1>
    </div>
    <div class="search-main">
      <n-input v-model:value="cityNameInput" type="text" placeholder="London" class="city-input" />
      <button class="location-bttn" @click="getCurrentCoordinates"><font-awesome-icon :icon="['fas', 'location-crosshairs']" class="loc-icon" /></button>
      <n-list class="search-result-list" v-if="citySearchResults.length > 0">
        <n-list-item class="result-item" v-for="result in citySearchResults" @click="handleCityClick(result)">
          <p class="result-name">{{ result.name }}</p>
          {{ result.address.stateCode }}
        </n-list-item>
      </n-list>
    </div>
  </div>
</template>
<script>
import { NButton, NInput, NList, NListItem, NSpin } from "naive-ui";
import { persistentStore } from "../stores/PersistentStorage.js";
import { useFetch } from "@vueuse/core";

export default {
  components: { NButton, NInput, NList, NListItem, NSpin },
  data() {
    return {
      locationLabel: "London",
      cityNameInput: "",
      citySearchResults: [],
      selectedLocation: null,
      locationLoading: false,
    };
  },
  setup() {
    let store = persistentStore();
    return { store };
  },
  watch: {
    cityNameInput: async function (newValue, oldValue) {
      if (newValue.length > 2) {
        this.handleSearch();
      } else {
        this.citySearchResults = [];
      }
    },
  },
  methods: {
    async handleSearch() {
      await useFetch(`https://test.api.amadeus.com/v1/reference-data/locations/cities?keyword=${this.cityNameInput}&max=5`, {
        headers: {
          Authorization: `Bearer ${this.store.getAccessToken}`,
        },
      }).then((response) => {
        console.log("RESPONSE: ", response);
        let results = JSON.parse(response.data.value).data;
        let filterredResults = results.filter((result) => result.address.stateCode);
        this.citySearchResults = filterredResults;
      });
    },
    handleCityClick(city) {
      this.selectedLocation = {
        name: city.name,
        coordinates: city.geoCode,
        countryCode: city.address.countryCode,
      };
      this.store.setLocation(this.selectedLocation);
    },
    getCurrentCoordinates() {
      this.locationLoading = true;
      this.locationLabel = "";
      this.searchInput = "";
      /* getCurrentPosition(successHandler, errorHandler) */
      navigator.geolocation.getCurrentPosition(
        /* Success Response */
        (results) => {
          this.selectedLocation = {
            name: "Current Location",
            coordinates: {
              latitude: results.coords.latitude,
              longitude: results.coords.longitude,
            },
          };
          console.log("COORDINATES: ", this.selectedLocation);
          this.locationLoading = false;
        },
        /* Error Response */
        (results) => {
          console.log("ERROR");
        }
      );
    },
  },
};
</script>
<style lang="scss">
.search_wrapper {
  min-height: 40px;
  width: 100%;
  padding: 1em;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .selection-location-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: auto;
    p {
      font-size: 12px;
    }
    .location-label {
      font-size: 2em;
      letter-spacing: 2px;
    }
  }
  .search-main {
    display: flex;
    align-items: center;
    position: relative;
    .city-input {
      border: solid 2px #d90368;
      border-radius: 4px;
      width: 400px;
    }
    .location-bttn {
      border-radius: 50%;
      margin-left: 1em;
      background-color: #d90368;
      outline: none;
      border: none;
      padding: 6px;
      .loc-icon {
        font-size: 1.25em;
        color: #fff;
      }
    }
    .search-result-list {
      position: absolute;
      width: 100%;
      top: calc(100%);
      background-color: #fff;
      width: 400px; /* Hard coded to match width of .city-input */
      margin: 0 auto;
      z-index: 2;
      border: solid 2px #d90368;
      border-top: 0;
      border-radius: 0 0 4px 4px;
      .n-list-item__divider {
        display: none;
      }
      .result-item {
        border-radius: 8px;
        margin: 0.5em;
        box-shadow: 2px 4px 4px hsl(0, 0%, 0%, 0.31);
        padding: 8px 1em;
        display: flex;
        position: relative;
        transition: 0.15s ease-in;
        cursor: pointer;
        &:hover {
          background-color: #f1c40f;
        }
        .n-list-item__main {
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
}
</style>
