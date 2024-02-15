<template lang="">
  <n-modal v-model:show="showAddItineraryModal" :on-mask-click="closeModal" class="add-itinerary-modal">
    <n-card style="width: 600px" title="Add Itinerary" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <template #header-extra> <font-awesome-icon :icon="['fas', 'x']" class="icon" style="cursor: pointer" @click="closeModal" /> </template>
      <div class="input-group">
        <label>Title</label>
        <n-input type="text" v-model:value="addItinerary.title" />
      </div>
      <div class="input-group">
        <label>Location</label>
        <n-input type="text" v-model:value="addItinerary.location" />
      </div>
      <div class="input-group">
        <label>Dates</label>
        <n-date-picker v-model:value="addItinerary.dateRange" type="daterange" clearable />
      </div>
      <template #footer>
        <n-button color="#00CC66" class="modal-save-bttn" @click="submitNewItinerary">Save</n-button>
        <n-button class="modal-cancel-bttn" @click="closeModal">Cancel</n-button>
      </template>
    </n-card>
  </n-modal>
</template>
<script>
import { persistentStore } from "../../stores/PersistentStorage.js";
import { NModal, NCard, NButton, NInput, NDatePicker } from "naive-ui";
import { useFetch } from "@vueuse/core";
import moment from "moment";
import axios from "axios";

export default {
  components: { NModal, NCard, NButton, NInput, NDatePicker },
  data() {
    return {
      showAddItineraryModal: false,
      addItinerary: {
        title: "",
        location: "",
        dateRange: null,
      },
    };
  },
  mounted() {
    let date = moment();
    console.log("DATE: ", date);
    this.showAddItineraryModal = true;
  },
  methods: {
    async submitNewItinerary() {
      const url = "http://localhost:3000/itinerary/add";
      axios
        .post(url, {
          user_id: await this.store.getUserData._id,
          title: this.addItinerary.title,
          location: this.addItinerary.location,
          dateRange: this.addItinerary.dateRange,
        })
        .then((response) => {
          console.log("RESPONSE: ", response);
          window.$message.success("Itinerary Successfully Added");
          this.closeModal();
        })
        .catch((error) => {
          console.log("ERROR: ", error);
          window.$message.error(error);
        });
    },
    closeModal() {
      this.$emit("close");
    },
  },
  setup() {
    let store = persistentStore();
    return { store };
  },
};
</script>
<style lang=""></style>
