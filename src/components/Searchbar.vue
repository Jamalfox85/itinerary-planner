<template lang="">
  <div class="search_wrapper">
    <div class="search-main">
      <div v-if="locationLabel" style="display: flex; width: 100%; align-items: center">
        <p class="location-label">{{ locationLabel }}</p>
        <font-awesome-icon :icon="['fas', 'x']" class="icon" style="cursor: pointer" @click="unselectLocation" />
      </div>
      <div v-else style="display: flex; width: 100%; align-items: center">
        <n-input v-model:value="cityNameInput" type="text" placeholder="London" class="city-input" />
        <!-- <button class="location-bttn" @click="getCurrentCoordinates"><font-awesome-icon :icon="['fas', 'location-crosshairs']" class="loc-icon" /></button> -->
      </div>
      <n-list class="search-result-list" v-if="citySearchResults.length > 0 && displayList">
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
      locationLabel: "",
      cityNameInput: "",
      citySearchResults: [],
      selectedLocation: null,
      locationLoading: false,
      displayList: false,
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
        let results = JSON.parse(response.data.value).data;
        let filterredResults = results.filter((result) => result.address.stateCode);
        this.citySearchResults = filterredResults;
        this.displayList = true;
      });
    },
    handleCityClick(city) {
      this.selectedLocation = {
        name: `${city.name}, ${city.address.countryCode}`,
        coordinates: city.geoCode,
        countryCode: city.address.countryCode,
      };
      this.locationLabel = city.name;
      this.displayList = false;
      this.$emit("citySelected", this.selectedLocation);
      // this.store.setLocation(this.selectedLocation);
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
    unselectLocation() {
      this.locationLabel = "";
      this.citySearchResults = [];
      this.cityNameInput = "";
      this.selectedLocation = null;
    },
  },
};
</script>
<style lang="scss">
.search_wrapper {
  min-height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .search-main {
    display: flex;
    align-items: center;
    position: relative;
    flex-grow: 1;
    .location-label {
      font-weight: bold;
      font-size: 1.25em;
    }
    .icon {
      margin-left: 1em;
    }
    .city-input {
      border-radius: 4px;
      // margin-right: 1em;
    }
    .location-bttn {
      border-radius: 50%;
      margin-left: auto;
      background-color: #00cc66;
      outline: none;
      border: none;
      padding: 6px;
      min-width: 2em;
      height: 2em;
      .loc-icon {
        font-size: 1.25em;
        color: #fff;
      }
    }
    .search-result-list {
      position: absolute;
      width: 100%;
      top: calc(100%);
      flex-grow: 1;
      margin: 0 auto;
      z-index: 2;
      border-top: 0;
      border-radius: 0 0 4px 4px;
      background-color: transparent;
      .n-list-item__divider {
        display: none;
      }
      .result-item {
        border-radius: 4px;
        margin: 0.5em;
        box-shadow: 1px 2px 2px hsl(0, 0%, 0%, 0.31);
        padding: 8px 1em;
        display: flex;
        position: relative;
        transition: 0.15s ease-in;
        cursor: pointer;
        background-color: #fff;
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
