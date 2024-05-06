<template lang="">
  <div>
    <n-data-table :columns="columns" :data="tableData" />
  </div>
</template>
<script>
import { h } from "vue";
import { NDataTable } from "naive-ui";
import ScheduleTableDatePicker from "./ScheduleTableDatePicker.vue";
import moment from "moment";
export default {
  components: { NDataTable, ScheduleTableDatePicker },
  props: ["itineraryEvents"],
  computed: {
    columns() {
      return [
        {
          title: "Title",
          key: "title",
        },
        {
          title: "Date",
          key: "start_date_string",
        },
        {
          title: "Mood",
          key: "mood",
        },
      ];
    },
    tableData() {
      if (this.itineraryEvents) {
        let events = this.itineraryEvents.map((event) => {
          if (event.start_date) {
            event["start_date_string"] = moment(event.start_date).format("MM/DD");
          }
          return event;
        });

        return events;
      } else {
        return [];
      }
    },
  },
};
</script>
<style lang=""></style>
