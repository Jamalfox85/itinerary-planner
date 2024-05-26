<template lang="">
  <div class="plan_my_day_modal_wrapper">
    <n-modal v-model:show="showModal" :on-mask-click="closeModal">
      <n-card>
        <h2>Plan My Day</h2>
        <div class="modal-main">
          <div class="input-group">
            <label>Location</label>
            <Searchbar @citySelected="citySelected" />
          </div>
        </div>
        <n-button class="cancel-bttn" @click="closeModal">Cancel</n-button>
        <n-button class="submit-bttn" @click="getGPTResults">Submit</n-button>
      </n-card>
    </n-modal>
  </div>
</template>
<script>
import { NModal, NCard, NButton } from "naive-ui";

import { getDayPlan } from "../../services/openai_service.js";
import moment from "moment";
import Searchbar from "../Searchbar.vue";

export default {
  props: ["itineraryData"],
  components: { NModal, NCard, NButton, Searchbar },
  data() {
    return {
      showModal: false,
      selectedLocation: null,
    };
  },
  mounted() {
    this.showModal = true;
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
    citySelected(city) {
      this.selectedLocation = city;
    },
    async getGPTResults() {
      console.log("CITY: ", this.selectedLocation);
      let today = moment().format("MM/DD/YY");
      let year = moment().format("YYYY");
      console.log("YEAR: ", year);
      let dayPlan = await getDayPlan(this.selectedLocation.name, today, year);
      this.$emit("gptResults", dayPlan);
      this.closeModal();
    },
  },
};
</script>
<style lang="scss">
.n-card {
  width: 50vw !important;
}
.input-group {
  margin: 1em 0;
}
.cancel-bttn {
  cursor: pointer;
}
</style>
