<template lang="">
  <div>
    <n-date-picker v-model:value="eventDate" type="datetime" :on-update:value="onDateUpdate" :status="eventDate == null ? 'error' : 'success'" />
  </div>
</template>
<script>
import { NDatePicker } from "naive-ui";
import moment from "moment";
export default {
  components: { NDatePicker },
  props: ["eventProp", "eventIndex"],
  data() {
    return {
      eventDate: this.eventProp.start_date,
    };
  },
  methods: {
    onDateUpdate(date) {
      this.eventDate = date;
      this.$emit("eventDateUpdated", date, this.eventIndex);
    },
  },
};
</script>
<style lang=""></style>
