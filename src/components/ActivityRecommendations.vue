<template lang="">
  <div class="itinerary_wrapper">
    <div class="cell-header">
      <h2>Activity Recommendations</h2>
      <font-awesome-icon :icon="['fas', 'gear']" class="icon" @click="showSettingsDrawer = true" />
    </div>
    <div class="try-again-wrapper">
      <n-button v-if="activities.length > 0" class="try-again-bttn" color="#A2E3C4" @click="getNewGPTResults">New Results</n-button>
    </div>
    <div class="results">
      <div class="no-activity-display" v-if="activities.length < 1">
        <h3>No Activities To Display</h3>
        <n-button color="#a2e3c4" @click="getGPTItineraryResponse" class="generate-bttn">Generate Recommendations</n-button>
        <n-spin style="margin-top: 2em" v-if="loading" />
      </div>
      <div class="result-list" v-else>
        <div class="result-item activity-group" v-for="(activity, index) in activities">
          <p class="result-title">{{ activity.title }}</p>
          <font-awesome-icon :icon="['fas', 'circle-info']" class="icon" @click="showRecommendationDetailModal(index)" />
          <n-button class="save-bttn" color="#00cc66" @click="saveActivity(index)"><font-awesome-icon :icon="['fas', 'check']" /></n-button>
        </div>
      </div>
    </div>
    <n-drawer v-model:show="showSettingsDrawer" :width="502" class="settings-drawer">
      <n-drawer-content title="Recommendation Settings">
        <div class="filter-dropdowns">
          <div class="filter-group">
            <label>Price:</label>
            <n-select v-model:value="priceValue" :options="priceOptions" />
          </div>
          <div class="filter-group">
            <label>Mood:</label>
            <n-select v-model:value="moodValue" :options="moodOptions" />
          </div>
        </div>
      </n-drawer-content>
    </n-drawer>
    <n-modal v-model:show="showDetailModal" class="details-modal">
      <n-card class="details-card">
        <div>Price: {{ formatPrice(activeActivity?.price) }}</div>
        <div>Description: {{ activeActivity.description }}</div>
      </n-card>
    </n-modal>
  </div>
</template>
<script>
import { NButton, NCollapse, NCollapseItem, NTag, NSpin, NSelect, NDrawer, NDrawerContent, NModal, NCard } from "naive-ui";
import { useFetch } from "@vueuse/core";
import { getMoodPoiCodes } from "../stores/moodPoiCodes.js";
import { persistentStore } from "../stores/PersistentStorage.js";
import { getItineraryResponse } from "../services/openai_service.js";

export default {
  components: { NButton, NCollapse, NCollapseItem, NTag, NSpin, NSelect, NDrawer, NDrawerContent, NModal, NCard },
  props: { cityName: String },
  data() {
    return {
      activities: [],
      priceValue: 99,
      moodValue: 0,
      loading: false,
      showSettingsDrawer: false,
      showDetailModal: false,
      activeActivity: null,
    };
  },
  setup() {
    let store = persistentStore();
    let getItinerary = getItineraryResponse;
    return { store, getItinerary };
  },
  mounted() {
    // this.getGPTItineraryResponse();
  },
  computed: {
    priceOptions() {
      return [
        {
          label: "No Preference",
          value: 99,
        },
        {
          label: "Free",
          value: 0,
        },
        {
          label: "$",
          value: 1,
        },
        {
          label: "$$",
          value: 2,
        },
        {
          label: "$$$",
          value: 3,
        },
      ];
    },
    moodOptions() {
      return [
        {
          label: "No Preference",
          value: 0,
        },
        {
          label: "Adventure",
          value: "adventure",
        },
        {
          label: "Relaxation",
          value: "relaxation",
        },
        {
          label: "History",
          value: "history",
        },
        {
          label: "Culture",
          value: "culture",
        },
      ];
    },
  },
  methods: {
    showRecommendationDetailModal(index) {
      this.showDetailModal = true;
      this.activeActivity = this.activities[index];
    },
    async getGPTItineraryResponse() {
      this.loading = true;
      let price = this.priceValue == 99 ? null : this.priceValue;
      let mood = this.moodValue == 0 ? null : this.moodValue;
      let activityArray = await this.getItinerary(this.cityName, price, mood);
      this.activities = activityArray;
      this.loading = false;
    },
    saveActivity(activityIndex) {
      this.$emit("addActivity", this.activities[activityIndex]);
      this.activities = this.activities.filter((activity, index) => {
        return index !== activityIndex;
      });
    },
    removeActivity(activityIndex) {
      this.activities = this.activities.filter((activity, index) => {
        return index !== activityIndex;
      });
    },
    formatPrice(priceVal) {
      if (priceVal == 0) {
        return "Free";
      } else if (priceVal == 1) {
        return "$";
      } else if (priceVal == 2) {
        return "$$";
      } else if (priceVal == 3) {
        return "$$$";
      }
    },
    async getNewGPTResults() {
      this.activities = [];
      await this.getGPTItineraryResponse();
    },
  },
};
</script>
<style lang="scss">
.itinerary_wrapper {
  color: #fff;
  display: flex;
  flex-direction: column;
  .try-again-wrapper {
    display: flex;
    justify-content: flex-end;
    .try-again-bttn {
      border-radius: 2em;
      color: #000;
    }
  }
  .results {
    margin-top: 1em;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    height: 25vh;
    flex-grow: 1;
    &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-track {
      background: #2e2c2f;
    }
    &::-webkit-scrollbar-thumb {
      background: #a2e3c4;
      border-radius: 1em;
    }
    &::-webkit-scrollbar-thumb:hover {
      background: #5ca07f;
    }
    .no-activity-display {
      margin: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 2em;
      .n-button {
        margin-top: 1em;
        border-radius: 2em;
        color: #000;
        transition: 0.25s ease;
        &:hover {
          background-color: #ff6b6b;
        }
      }
    }
    .result-list {
      width: 100%;
      .result-item {
        display: flex;
        align-items: center;
        padding: 0.5em;
        .icon {
          margin-left: 1em;
          margin-right: auto;
          transition: 0.1s ease-in;
          &:hover {
            cursor: pointer;
            color: #a2e3c4;
          }
        }
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
              color: #fff;
            }
          }
          .activity-tags {
            display: flex;
            .n-tag {
              margin-right: 0.5em;
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
.settings-drawer {
  .filter-dropdowns {
    display: flex;
    flex-direction: column;
    .filter-group {
      width: 100%;
      margin-bottom: 1em;
    }
  }
}
.details-card {
  width: 750px;
}
</style>
