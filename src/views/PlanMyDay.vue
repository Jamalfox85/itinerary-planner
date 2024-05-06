<template lang="">
  <div class="planMyDay_wrapper">
    <div class="page-header">
      <h1 class="page-header">Plan My Day</h1>
    </div>
    <div class="page-main">
      <FullCalendar :options="calendarOptions" />
    </div>
  </div>
</template>
<script>
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";

export default {
  components: { FullCalendar },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        initialView: "timeGridDay",
        headerToolbar: {
          left: "prev,next",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        },
        events: [
          {
            id: "1",
            title: "The Title",
            start: "2024-05-05",
            end: "2024-05-05",
          },
        ],
      },
    };
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
