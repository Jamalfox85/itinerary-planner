<template lang="">
  <div>
    <FullCalendar :options="calendarOptions" />
  </div>
</template>
<script>
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";

export default {
  props: ["itineraryEvents"],
  components: { FullCalendar },
  watch: {
    itineraryEvents: function (newVal, oldVal) {
      this.calendarOptions.events = this.itineraryEvents.map((event) => {
        event["start"] = event.start_date;
        return event;
      });
    },
  },
  mounted() {
    this.calendarOptions.events = this.itineraryEvents.map((event) => {
      event["start"] = event.start_date;
      return event;
    });
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        initialView: "timeGridWeek",
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
<style lang=""></style>
