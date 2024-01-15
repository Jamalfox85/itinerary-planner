<template lang="">
  <div class="timezone_wrapper">
    <h2 class="cell-header">Time</h2>
    <div class="time-main">
      <div class="curr-location">
        <p>{{ getCurrCityName }}</p>
        <p class="time-label">{{ currentTime }}</p>
      </div>
      <div class="dest-location">
        <p>{{ getDestCityName }}</p>
        <p class="time-label">{{ destTime }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { persistentStore } from "../stores/PersistentStorage.js";
import { useFetch } from "@vueuse/core";

export default {
  data() {
    return {
      currentTime: null,
      destTime: null,
      destTimeZone: null,
    };
  },
  setup() {
    const store = persistentStore();
    return { store };
  },
  async mounted() {
    let destination = this.store.getLocation;
    await useFetch(`https://api.ipgeolocation.io/timezone?apiKey=05f075b52bf249c4bf5bad3b47b390a3&lat=${destination.lat}&long=${destination.long}`).then((response) => {
      let responseData = JSON.parse(response.data.value);
      this.destTimeZone = responseData.timezone;
    });

    setInterval(() => {
      this.getTimes();
    }, 1000);
  },
  computed: {
    getCurrCityName() {
      return "Current Location";
    },
    getDestCityName() {
      return this.store.getLocation.cityName;
    },
    getCurrCityTime() {
      return new Date().toLocaleTimeString();
    },
    getCurrDestTime() {
      return "14:00";
    },
  },
  methods: {
    async getTimes() {
      const currTimeZone = new Date().toLocaleTimeString("en", { timeZoneName: "short" }).split(" ")[2];

      const currOptions = {
        hour: "numeric",
        minute: "numeric",
        timeZone: currTimeZone,
      };
      const destOptions = {
        hour: "numeric",
        minute: "numeric",
        timeZone: this.destTimeZone,
      };
      let date = await new Date();

      this.currentTime = new Intl.DateTimeFormat("en-US", currOptions).format(date);
      this.destTime = new Intl.DateTimeFormat("en-US", destOptions).format(date);
    },
  },
};
</script>
<style lang="scss">
.timezone_wrapper {
  background-color: #ffcf56;
  .time-main {
    display: flex;
    justify-content: space-around;
    margin-top: 2em;
    & > * {
      padding: 1em 3em;
      border-radius: 12px;
      background-color: #edead0;
      .time-label {
        font-size: 2em;
        font-weight: bold;
      }
    }
  }
}
</style>
