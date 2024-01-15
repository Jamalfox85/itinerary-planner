<template lang="">
  <div class="itinerary_wrapper">
    <h2 class="cell-header">Itinerary</h2>
    <div class="results">
      <n-spin v-if="itinerarySegments.length == 0" />
      <n-collapse :accordion="true">
        <n-collapse-item :title="segment.timeOfDay + ` ( ${segment.activities.length} )`" :name="index" v-for="(segment, index) in itinerarySegments">
          <div v-for="activity in segment.activities">
            <b>{{ activity.label }}</b>
            <p>{{ activity.details }}</p>
          </div>
        </n-collapse-item>
      </n-collapse>
    </div>
  </div>
</template>
<script>
import { NButton, NCollapse, NCollapseItem, NTag, NSpin } from "naive-ui";
import { useFetch } from "@vueuse/core";
import { getMoodPoiCodes } from "../stores/moodPoiCodes.js";
import { persistentStore } from "../stores/PersistentStorage.js";
import { getItineraryResponse } from "../services/openai_service.js";

export default {
  components: { NButton, NCollapse, NCollapseItem, NTag, NSpin },
  data() {
    return {
      itinerarySegments: [],
      showResults: false,
    };
  },
  setup() {
    let store = persistentStore();
    let getItinerary = getItineraryResponse;
    return { store, getItinerary };
  },
  mounted() {
    this.getGPTItineraryResponse();
  },
  methods: {
    loadItineraryResults() {
      this.showResults = true;
      //   this.getGPTItineraryResponse(this.store.getLocation.cityName);
      this.getGPTItineraryResponse("Atlanta");
    },
    async getGPTItineraryResponse(cityName) {
      let itineraryObject = await this.getItinerary(cityName, this.store.moodId);
      this.itinerarySegments = itineraryObject;
    },
  },
};
</script>
<style lang="scss">
.itinerary_wrapper {
  background-color: #a0e8af75;
  .results {
    display: flex;
    margin-top: 2em;
    .n-collapse {
      width: 100%;
      flex-grow: 1;
      .n-collapse-item {
        // margin: 1em;
        border-radius: 8px;
        padding: 1em;
        &:nth-child(odd) {
          background-color: #86baa1;
        }
        &:nth-child(even) {
          background-color: #edead0;
        }
        .n-collapse-item__header {
          padding: 0;
          .n-collapse-item__header-main {
            font-family: "Josefin Sans", sans-serif;
            font-family: "Vina Sans", sans-serif;
            font-size: 2em;
          }
        }
      }
    }
  }
}
</style>
