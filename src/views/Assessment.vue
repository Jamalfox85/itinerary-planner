<template lang="">
  <div class="assessment_wrapper">
    <!-- <location-panel @nextPanel="loadNextPanel" /> -->
    <mood-panel @nextPanel="loadNextPanel" />
    <!-- <schedule-panel /> -->
    <schedule-panel v-if="displaySchedulePanel" />
  </div>
</template>
<script>
import LocationPanel from "../components/Panels/LocationPanel.vue";
import MoodPanel from "../components/Panels/MoodPanel.vue";
import SchedulePanel from "../components/Panels/SchedulePanel.vue";
import { NButton, NRadioGroup, NRadioButton, NInput, NList, NListItem, NSpin } from "naive-ui";
export default {
  components: { NButton, NRadioGroup, NRadioButton, NInput, NList, NListItem, NSpin, LocationPanel, MoodPanel, SchedulePanel },
  data() {
    return {
      questions: null,
      accessToken: null,
      codes: [],
      displayMoodPanel: false,
      displaySchedulePanel: false,
    };
  },
  methods: {
    loadNextPanel(panel) {
      console.log(panel);
      if (panel == "location") {
        this.displayMoodPanel = true;
      } else if (panel == "mood") {
        this.displaySchedulePanel = true;
      }
    },
    submitTest() {
      let codes = [];
      this.questions.map((item) => {
        if (item.value !== null) {
          let selection = item.options.filter((option) => item.value == option.value);
          let activityTypeObj = {
            label: item.label,
            codes: selection[0].businessCodes,
            numResults: selection[0].numResults,
          };
          codes.push(activityTypeObj);
        }
      });
      this.codes = codes;
      this.findNearbyBusinesses();
    },
    async findNearbyBusinesses() {
      let categories = this.codes;
      let baseURL = "api.tomtom.com";
      let versionNumber = 2;
      let ext = "json";
      let apiKey = "CGtqpWKnAEW1T3B1bAjfBfqvpi9zoMay";
      let lat = this.location.latitude;
      let lon = this.location.longitude;
      let radius = 30000; /* In Meters */
      //   let limit = 25;
      let ofs = 0; /* The starting offset of the returned results within the full result set. */
      let countrySet = "US";
      /* topLeft & bottomRight are optional parameters that take in a list of lat/lon pairs to create a bounding box for search */
      let categorySet = categories !== null ? categories : ""; /* Comma separated list of categories that can be found here - https://developer.tomtom.com/search-api/documentation/search-service/category-search */
      let openingHours = "nextSevenDays";
      let timezone = "iana";
      let mapcodes = "Local";
      let relatedpois = "off";
      let results = [];
      categories.forEach(async (category) => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log("ping");
        let codes = [...category.codes];
        let limit = category.numResults;
        await useFetch(`https://${baseURL}/search/${versionNumber}/nearbySearch/.${ext}?key=${apiKey}&lat=${lat}&lon=${lon}&radius=${radius}&limit=${limit}&ofs=${ofs}&countrySet=${countrySet}&categorySet=${codes}&openingHours=${openingHours}&timeZone=${timezone}&mapcodes=${mapcodes}&relatedPois=${relatedpois}`).then(async (response) => {
          let apiResponse = JSON.parse(response.data.value);
          let result = {
            label: category.label,
            results: apiResponse.results,
          };
          this.store.addResults(result);
        });
      });
      this.$router.push("/schedule");
    },
  },
};
</script>
<style lang="scss">
.assessment_wrapper {
  height: 100vh;
  width: 100%;
  border: solid 4px red;
  // overflow-y: hidden;
  display: flex;
  flex-direction: column;
  .page-panel {
    height: 100vh;
    min-width: 100vw;
    border: solid 8px blue;
    padding: 6em 4em;
    position: relative;
    background-image: linear-gradient(to top, #c75d0f, #cd762f, #d28c4c, #d8a26b, #ddb78b);
    .panel-label {
      font-size: 2em;
      margin-right: 1em;
    }
  }
  .assessment-navigation {
    bottom: 4em;
    right: 0;
    position: absolute;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    padding: 0 4em;
    .prev-bttn,
    .next-bttn {
      color: #fff5f6;
      transition: 0.1s ease-in;
      box-shadow: 2px 4px 4px hsl(0deg 0% 0% / 0.44);
      &:hover {
        box-shadow: 8px 16px 16px hsl(0deg 0% 0% / 0.25);
        transition: 0.1s ease-in;
      }
    }
  }
}
</style>
