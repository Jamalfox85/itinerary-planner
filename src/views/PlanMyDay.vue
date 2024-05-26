<template lang="">
  <div class="planMyDay_wrapper">
    <div class="page-header">
      <h1 class="page-header">Plan My Day</h1>
    </div>
    <div class="page-main">
      <FullCalendar :options="calendarOptions" />
    </div>
    <get-day-modal v-if="getDayModal" @gptResults="receivedGptResults" @closeModal="closeModal" />
  </div>
</template>
<script>
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import GetDayModal from "../components/modals/GetDayModal.vue";
import moment from "moment";

export default {
  components: { FullCalendar, GetDayModal },
  data() {
    return {
      getDayModal: true,
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        initialView: "timeGridDay",
        headerToolbar: {
          left: "prev,next",
          center: "title",
          right: "timeGridDay",
        },
      },
    };
  },
  methods: {
    receivedGptResults(results) {
      this.calendarOptions.events = results;
      let formattedEvents = results.map((event) => {
        event.start = moment(event.start).format();
        event.end = moment(event.end).format();
      });
    },
    closeModal() {
      this.getDayModal = false;
    },
  },
};
</script>
<style lang="scss">
.planMyDay_wrapper {
  padding: 2em;
  .page-main {
  }
}
</style>
