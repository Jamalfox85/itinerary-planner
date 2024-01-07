<template lang="">
  <div class="page-panel location-panel">
    <div class="location-group">
      <h1 class="panel-label">Where the <img src="../../assets/images/ducks/love-duck.png" alt="Duck" class="main-mood-duck-img" />are you?</h1>
      <n-spin v-if="loadingLocation" size="small" />
      <h2 class="selected-location" v-if="locationLabel !== ''">{{ locationLabel }}</h2>
    </div>
    <div class="search-form">
      <input type="text" v-model="searchInput" class="search-input fancy-text" placeholder="Search Your City" />
      <button class="loc-bttn" @click="getCurrentCoordinates"><font-awesome-icon :icon="['fas', 'location-crosshairs']" /></button>
    </div>
    <n-list class="search-result-list">
      <n-list-item class="result-item" v-for="result in searchResults" @click="handleCityClick(result)">
        <p class="result-name">{{ result.name }}</p>
        {{ result.address.stateCode }}
      </n-list-item>
    </n-list>
  </div>
</template>
<script>
import { NButton, NList, NListItem, NSpin } from "naive-ui";
import { persistentStore } from "../../stores/PersistentStorage.js";
import { useFetch } from "@vueuse/core";

export default {
  components: { NButton, NList, NListItem, NSpin },
  data() {
    return {
      searchInput: "",
      locationLabel: "",
      loadingLocation: false,
      searchResults: [],
    };
  },
  setup() {
    let store = persistentStore();
    return { store };
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
    async handleSearch() {
      await useFetch(`https://test.api.amadeus.com/v1/reference-data/locations/cities?keyword=${this.searchInput}&max=5`, {
        headers: {
          Authorization: `Bearer ${this.store.getAccessToken}`,
        },
      }).then((response) => {
        let results = JSON.parse(response.data.value);
        this.searchResults = results.data;
      });
    },
    handleCityClick(city) {
      let location = city.geoCode;
      this.locationLabel = city.name;
      this.store.setCityName(this.locationLabel + ", " + city.address.countryCode);
      this.store.setLocation(city.geoCode.latitude, city.geoCode.longitude);
    },
    getCurrentCoordinates() {
      this.loadingLocation = true;
      this.locationLabel = "";
      this.searchInput = "";
      /* getCurrentPosition(successHandler, errorHandler) */
      navigator.geolocation.getCurrentPosition(
        /* Success Response */
        (results) => {
          this.location = {
            latitude: results.coords.latitude,
            longitude: results.coords.longitude,
          };
          this.locationLabel = "Current Location";
          this.loadingLocation = false;
          //   this.findNearbyBusinesses();
        },
        /* Error Response */
        (results) => {
          console.log("ERROR");
        }
      );
    },
    nextPanel() {
      let panel = "location";
      this.$emit("nextPanel", panel);
    },
  },
};
</script>
<style lang="scss">
.location-panel {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 0 2em;
  .panel-label {
    margin: 2em auto 1em auto;
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
  .location-group {
    display: flex;
    align-items: center;
    margin-bottom: 2em;
    .selected-location {
      font-size: 2em;
      text-decoration: underline;
    }
  }
  .search-form {
    display: flex;
    align-items: center;
    .search-input {
      margin: 2em;
      flex-grow: 1;
      padding: 12px;
      border: none;
      border-bottom: solid 1px #aeaeae;
      transition: 0.1s ease-in;
      background: transparent;
      font-weight: bold;
      font-size: 2em;
      letter-spacing: 2px;
      &:focus {
        outline: none;
        border-bottom: solid 3px #fff;
      }
    }
    .loc-bttn {
      border: none;
      background-color: transparent;
      cursor: pointer;
      &:hover {
        svg {
          color: #9381ff;
        }
      }
      svg {
        margin-top: 0.5em;
        font-size: 1.5em;
        transition: 0.1s ease-in;
      }
    }
  }
  .search-result-list {
    background-color: transparent;
    width: 90%;
    margin: 0 auto;
    .n-list-item__divider {
      display: none;
    }
    .result-item {
      border-radius: 8px;
      margin: 0.5em;
      border: solid 1px black;
      padding: 8px 1em;
      display: flex;
      position: relative;
      transition: 0.1s ease-in;
      cursor: pointer;
      &:hover {
        left: 1em;
        background-color: #ffffff60;
      }
      .n-list-item__main {
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>
