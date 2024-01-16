<template lang="">
  <div class="weather_wrapper">
    <h2 class="cell-header">Weather</h2>
    <p class="temperature">{{ weather?.temp_f }}&deg;</p>
    <p>{{ weatherText }}</p>
    <div class="icon_wrapper">
      <font-awesome-icon v-if="weatherText == 'Sunny'" :icon="['fas', 'sun']" class="icon" />
      <font-awesome-icon v-if="weatherText == 'Cloudy' || weatherText == 'Overcast'" :icon="['fas', 'cloud']" class="icon" />
      <font-awesome-icon v-if="weatherText == 'Storm'" :icon="['fas', 'bolt']" class="icon" />
      <font-awesome-icon v-if="weatherText == 'Windy'" :icon="['fas', 'wind']" class="icon" />
      <font-awesome-icon v-if="weatherText == 'Rain'" :icon="['fas', 'cloud-rain']" class="icon" />
    </div>
  </div>
</template>
<script>
import { useFetch } from "@vueuse/core";
export default {
  data() {
    return {
      weather: null,
      weatherText: null,
    };
  },
  async mounted() {
    await useFetch(`http://api.weatherapi.com/v1/current.json?key=915bc54ff66148b3886181732232312&q=Lyon&aqi=no`).then((response) => {
      let parsedResponse = JSON.parse(response.data.value);
      this.weather = parsedResponse.current;
      this.weatherText = parsedResponse.current.condition.text;
    });
  },
};
</script>
<style lang="scss">
.weather_wrapper {
  background-color: #edead0;
  display: flex;
  flex-direction: column;
  .temperature {
    font-size: 4em;
    align-self: flex-end;
    margin-right: 12px;
  }
  .icon_wrapper {
    .icon {
      font-size: 4em;
    }
  }
}
</style>
