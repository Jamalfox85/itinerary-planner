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

// import { getDayPlan } from "../services/openai_service.js";
import moment from "moment";

export default {
  components: { FullCalendar, GetDayModal },
  // async mounted() {
  //   let today = moment().format("MM/DD/YY");
  //   let dayPlan = await getDayPlan("Atlanta", today);
  //   this.calendarOptions.events = dayPlan;
  // },
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
        events: [],
      },
    };
  },
  methods: {
    receivedGptResults(results) {
      console.log("RESULTS: ", results);
      this.calendarOptions.events = results;
    },
    closeModal() {
      this.getDayModal = false;
    },
  },
};
</script>
<style lang="scss">
.planMyDay_wrapper {
  border: solid 4px blue;
  padding: 2em;
  .page-main {
  }
}
</style>
