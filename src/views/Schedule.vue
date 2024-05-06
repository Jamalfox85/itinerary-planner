<template lang="">
  <div class="schedule_page_wrapper">
    <div class="schedule-page-header">
      <h1 class="page-header">Schedules</h1>
      <n-select class="itinerary-dropdown" v-model:value="currentItinerary" :options="itineraryOptions" />
    </div>
    <div class="schedule-page-main">
      <n-button class="schedule-activities-bttn" @click="openScheduleModal">Schedule Activities</n-button>
      <n-tabs type="line" animated>
        <n-tab-pane name="table-view" tab="Table View">
          <schedule-table :itineraryEvents="activeItinerary?.activities" />
        </n-tab-pane>
        <n-tab-pane name="calendar-view" tab="Calendar View">
          <schedule-calendar :itineraryEvents="activeItinerary?.activities" />
        </n-tab-pane>
      </n-tabs>
    </div>
    <schedule-modal v-if="showScheduleModal" :itineraryData="activeItinerary" @closeModal="closeShowScheduleModal" />
  </div>
</template>
<script>
import { NSelect, NTabs, NTabPane, NButton } from "naive-ui";
import { useFetch } from "@vueuse/core";
import ScheduleCalendar from "../components/ScheduleCalendar.vue";
import ScheduleTable from "../components/ScheduleTable.vue";
import ScheduleModal from "../components/modals/ScheduleModal.vue";
export default {
  components: { NSelect, NTabs, NTabPane, NButton, ScheduleCalendar, ScheduleTable, ScheduleModal },
  data() {
    return {
      currentItinerary: null,
      itineraries: [],
      showScheduleModal: false,
    };
  },
  async mounted() {
    const url = `${import.meta.env.VITE_BASE_API_URI}/itinerary/itineraries`;
    const token = localStorage.getItem("city-explorer-token");
    let userId = localStorage.getItem("city-explorer-userId");
    await useFetch(url, {
      async beforeFetch({ url, options, cancel }) {
        if (!token) cancel();
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token}`,
          user_id: userId,
        };
        return {
          options,
        };
      },
    })
      .json()
      .then((response) => {
        let itineraries = response.data.value.itineraries;
        this.itineraries = itineraries;
        this.currentItinerary = this.itineraries[0]._id;
      });
  },
  computed: {
    itineraryOptions() {
      return this.itineraries.map((itinerary) => {
        return {
          label: itinerary.title,
          value: itinerary._id,
        };
      });
    },
    activeItinerary() {
      let activeItinerary = this.itineraries.filter((itinerary) => itinerary._id == this.currentItinerary)[0];
      return activeItinerary;
    },
  },
  methods: {
    openScheduleModal() {
      this.showScheduleModal = true;
    },
    closeShowScheduleModal() {
      this.showScheduleModal = false;
    },
  },
};
</script>
<style lang="scss">
.schedule_page_wrapper {
  border: solid 2px red;
  padding: 2em;
  .schedule-page-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .itinerary-dropdown {
      width: 200px;
    }
  }
  .schedule-page-main {
    display: flex;
    position: relative;
    .schedule-activities-bttn {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 2;
    }
  }
}
</style>
