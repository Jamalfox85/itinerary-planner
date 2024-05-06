<template lang="">
  <div class="schedule_modal_wrapper">
    <n-modal v-model:show="showModal" :on-mask-click="closeModal">
      <n-card>
        <h2>Itinerary Activities</h2>
        <div class="events">
          <div class="event-group" v-for="(event, index) in this.itineraryData.activities" :key="index">
            <p>{{ event.title }}</p>
            <schedule-modal-grid-row :eventProp="event" :eventIndex="index" @eventDateUpdated="eventDateUpdated" />
          </div>
        </div>
        <n-button class="cancel-bttn" @click="closeModal">Cancel</n-button>
        <n-button class="submit-bttn" @click="submitDateChanges">Submit</n-button>
      </n-card>
    </n-modal>
  </div>
</template>
<script>
import { NModal, NCard, NDatePicker, NButton } from "naive-ui";
import ScheduleModalGridRow from "./ScheduleModalGridRow.vue";
import { useFetch } from "@vueuse/core";
import axios from "axios";

export default {
  props: ["itineraryData"],
  components: { NModal, NCard, NDatePicker, NButton, ScheduleModalGridRow },
  data() {
    return {
      showModal: false,
      eventData: this.itineraryData.activities,
    };
  },
  mounted() {
    this.showModal = true;
    this.eventData = this.itineraryData.activities;
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
    eventDateUpdated(date, index) {
      this.eventData[index].start_date = date;
      // console.log("NEW DATE OBJECT: ", this.eventData);
    },
    submitDateChanges() {
      console.log("BIENG SUBMITTED: ", this.itineraryData._id, this.eventData);
      const url = `${import.meta.env.VITE_BASE_API_URI}/itinerary/updateActivities`;
      axios
        .put(url, {
          itinerary_id: this.itineraryData._id,
          activityList: this.eventData,
        })
        .then((response) => {
          window.$message.success("Itineraries Successfully Updated");
          // this.$emit("newItineraryAdded", response.data.itinerary);
          this.closeModal();
        })
        .catch((error) => {
          console.log("ERROR: ", error);
          window.$message.error(error);
        });
    },
  },
};
</script>
<style lang="scss">
.n-card {
  width: fit-content !important;
}
.events {
  display: flex;
  flex-direction: column;
  max-width: 750px;
  margin: 2em 0;
  .event-group {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.25em;
  }
}
.cancel-bttn {
  cursor: pointer;
}
</style>
