<template lang="">
  <n-modal v-model:show="showDeleteItineraryModal" :on-mask-click="closeModal" class="add-itinerary-modal">
    <n-card style="width: 600px" title="Add Itinerary" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <template #header-extra> <font-awesome-icon :icon="['fas', 'x']" class="icon" style="cursor: pointer" @click="closeModal" /> </template>
      <p>Are you sure you want to delete this itinerary</p>
      <p>{{ itinerary.title }}</p>
      <template #footer>
        <n-button color="#d90368" class="modal-save-bttn" @click="deleteItinerary">Delete</n-button>
        <n-button class="modal-cancel-bttn" @click="closeModal">Cancel</n-button>
      </template>
    </n-card>
  </n-modal>
</template>
<script>
import { NModal, NCard, NButton, NInput } from "naive-ui";
import { useFetch } from "@vueuse/core";

export default {
  components: { NModal, NCard, NButton, NInput },
  props: { itinerary: Object },
  data() {
    return {
      showDeleteItineraryModal: false,
      addItinerary: {
        title: "",
        location: "",
        dates: "",
      },
    };
  },
  mounted() {
    this.showDeleteItineraryModal = true;
  },
  methods: {
    async deleteItinerary() {
      const url = `http://${import.meta.env.VITE_BASE_API_URI}/itinerary/delete`;
      const token = localStorage.getItem("city-explorer-token");
      let itinerary_id = this.itinerary._id;
      await useFetch(url, {
        async beforeFetch({ url, options, cancel }) {
          if (!token) cancel();
          options.headers = {
            ...options.headers,
            Authorization: `Bearer ${token}`,
            itinerary_id: itinerary_id,
          };
          return {
            options,
          };
        },
      })
        .delete()
        .json();
      this.closeModal();
    },
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>
<style lang=""></style>
