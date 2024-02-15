<template lang="">
  <div class="itinerary_wrapper">
    <div class="results">
      <div class="no-activity-display" v-if="activities.length == 1">
        <h3>No Activities To Display</h3>
        <n-button color="#D90368">Generate Recommendations</n-button>
      </div>
      <n-collapse v-else :accordion="true">
        <div v-for="(activity, index) in activities" class="activity-group">
          <n-collapse-item :title="activity.title" :name="activity.title">
            <!-- <template #header-extra>
              <n-button class="save-bttn" color="#00cc66" @click="saveActivity(index)"><font-awesome-icon :icon="['fas', 'check']" /></n-button>
              <n-button class="not-interested-bttn" type="error" @click="removeActivity(index)"><font-awesome-icon :icon="['fas', 'ban']" /></n-button>
            </template> -->
            <p>{{ activity.details }}</p>
          </n-collapse-item>
          <n-button class="save-bttn" color="#00cc66" @click="saveActivity(index)"><font-awesome-icon :icon="['fas', 'check']" /></n-button>
          <n-button class="not-interested-bttn" type="error" @click="removeActivity(index)"><font-awesome-icon :icon="['fas', 'ban']" /></n-button>
        </div>
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
      activities: [],
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
    // loadItineraryResults() {
    //   this.showResults = true;
    //   //   this.getGPTItineraryResponse(this.store.getLocation.cityName);
    //   this.getGPTItineraryResponse("Atlanta");
    // },
    async getGPTItineraryResponse(cityName) {
      let activityArray = await this.getItinerary(cityName, this.store.moodId);
      // console.log("ITINERARY OBJECT: ", activityArray);
      this.activities = activityArray;
    },
    saveActivity(activityIndex) {
      // console.log("saving: ", activityIndex);
      this.activities = this.activities.filter((activity, index) => {
        console.log(index, activityIndex);
        return index !== activityIndex;
      });
    },
    removeActivity(activityIndex) {
      // console.log("removing: ", activityIndex);
      this.activities = this.activities.filter((activity, index) => {
        console.log(index, activityIndex);

        return index !== activityIndex;
      });
    },
  },
};
</script>
<style lang="scss">
.itinerary_wrapper {
  .results {
    display: flex;
    .no-activity-display {
      margin: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 2em;
      .n-button {
        margin-top: 1em;
      }
    }
    .n-collapse {
      width: 100%;
      flex-grow: 1;
      margin-top: 0.5em;
      .activity-group {
        display: flex;
        margin-bottom: 1em;
        .n-collapse-item {
          border-radius: 8px;
          padding: 0.25em;
          margin-right: auto;
          flex-grow: 1;
          .n-collapse-item__header {
            padding: 0;
            .n-collapse-item__header-main {
            }
          }
        }
        .save-bttn {
          margin: 0 0.5em;
        }
        .not-interested-bttn {
        }
      }
    }
  }
}
</style>
