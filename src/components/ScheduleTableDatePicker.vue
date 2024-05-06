<template lang="">
  <div>
    <n-date-picker v-model:value="eventDate" :on-update:value="onDateUpdate" :status="eventDate == null ? 'error' : null" />
  </div>
</template>
<script>
import { NDatePicker } from "naive-ui";
export default {
  components: { NDatePicker },
  props: ["dateTimeString"],
  mounted() {
    this.eventDate = this.dateTimeString;
  },
  data() {
    return {
      eventDate: null,
    };
  },
  methods: {
    onDateUpdate() {
      this.$emit("dateUpdated", this.eventDate);
      //   console.log("PING");
    },
  },
};
</script>
<style lang="scss">
.unset {
  border: solid 1px red;
}
</style>
