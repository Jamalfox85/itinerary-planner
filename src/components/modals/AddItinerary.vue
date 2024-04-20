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
        <Searchbar @citySelected="citySelected" />
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
import Searchbar from "../Searchbar.vue";
export default {
  components: { NModal, NCard, NButton, NInput, NDatePicker, Searchbar },
  data() {
    return {
      showAddItineraryModal: false,
      addItinerary: {
        title: "",
        location: "",
        dateRange: null,
      },
      selectedLocation: null,
    };
  },
  mounted() {
    let date = moment();
    this.showAddItineraryModal = true;
  },
  methods: {
    citySelected(city) {
      this.selectedLocation = city;
    },
    async submitNewItinerary() {
      const url = `${import.meta.env.VITE_BASE_API_URI}/itinerary/add`;
      axios
        .post(url, {
          user_id: await this.store.getUserData._id,
          title: this.addItinerary.title,
          location: this.addItinerary.location,
          dateRange: this.addItinerary.dateRange,
          location: this.selectedLocation,
          activities: [],
          restaurants: [],
        })
        .then((response) => {
          window.$message.success("Itinerary Successfully Added");
          console.log("RESPONSE: ", response);
          this.$emit("newItineraryAdded", response.data.itinerary);
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
