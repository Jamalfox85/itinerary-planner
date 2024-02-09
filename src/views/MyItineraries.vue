<template lang="">
  <div class="myitineraries_wrapper">
    <div class="itineraries-header">
      <h1 class="page-header">My Itineraries</h1>
      <div class="add-itinerary">
        <font-awesome-icon :icon="['fas', 'plus']" class="icon" @click="showAddItineraryModal = true" style="cursor: pointer" />
      </div>
    </div>
    <div class="itineraries-list">
      <div class="itinerary-item" v-for="itinerary in itineraries">
        <div class="circle"></div>
        <div class="text-main">
          <p class="itinerary-title">{{ itinerary.title }}</p>
          <p class="itinerary-location">{{ itinerary.location }}</p>
        </div>
        <div class="right-side">
          <p class="itinerary-dates">{{ itinerary.dates }}</p>
        </div>
        <div class="options">
          <font-awesome-icon :icon="['fas', 'pen']" class="icon" />
          <font-awesome-icon :icon="['fas', 'trash']" class="icon" @click="displayDeleteModal(itinerary)" />
        </div>
      </div>
    </div>
    <n-modal v-model:show="showAddItineraryModal" class="add-itinerary-modal">
      <n-card style="width: 600px" title="Add Itinerary" :bordered="false" size="huge" role="dialog" aria-modal="true">
        <template #header-extra> <font-awesome-icon :icon="['fas', 'x']" class="icon" style="cursor: pointer" @click="showAddItineraryModal = false" /> </template>
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
          <n-input type="text" v-model:value="addItinerary.dates" />
        </div>
        <template #footer>
          <n-button color="#00CC66" class="modal-save-bttn" @click="submitNewItinerary">Save</n-button>
          <n-button class="modal-cancel-bttn" @click="closeNewItineraryModal">Cancel</n-button>
        </template>
      </n-card>
    </n-modal>
    <n-modal v-model:show="showDeleteItineraryModal" class="add-itinerary-modal">
      <n-card style="width: 600px" title="Add Itinerary" :bordered="false" size="huge" role="dialog" aria-modal="true">
        <template #header-extra> <font-awesome-icon :icon="['fas', 'x']" class="icon" style="cursor: pointer" @click="showDeleteItineraryModal = false" /> </template>
        <p>Are you sure you want to delete this itinerary</p>
        <template #footer>
          <n-button color="#d90368" class="modal-save-bttn" @click="deleteItinerary">Delete</n-button>
          <n-button class="modal-cancel-bttn" @click="hideDeleteModal">Cancel</n-button>
        </template>
      </n-card>
    </n-modal>
  </div>
</template>
<script>
import { persistentStore } from "../stores/PersistentStorage.js";
import { NModal, NCard, NButton, NInput } from "naive-ui";
import { useFetch } from "@vueuse/core";

export default {
  components: { NModal, NCard, NButton, NInput },
  data() {
    return {
      showAddItineraryModal: false,
      showDeleteItineraryModal: false,
      addItinerary: {
        title: "",
        location: "",
        dates: "",
      },
      itineraries: null,
    };
  },
  async mounted() {
    const url = "http://localhost:3000/itinerary/itineraries";
    const token = localStorage.getItem("city-explorer-token");
    await useFetch(url, {
      async beforeFetch({ url, options, cancel }) {
        if (!token) cancel();
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token}`,
          // user_id: this.store.getUserData._id,
          user_id: "65c4385cba00d0f2298cbf90",
        };
        return {
          options,
        };
      },
    })
      .json()
      .then((response) => {
        let itineraries = response.data.value.itineraries;
        this.itineraries = itineraries;
      });
  },
  methods: {
    async submitNewItinerary() {
      const { data, error } = await useFetch("http://localhost:3000/itinerary/add")
        .post({
          user_id: await this.store.getUserData._id,
          title: this.addItinerary.title,
          location: this.addItinerary.location,
          dates: this.addItinerary.dates,
        })
        .json();
      console.log("DATA: ", data);
    },
    closeNewItineraryModal() {
      this.addItinerary.title = "";
      this.addItinerary.location = "";
      this.addItinerary.dates = "";
    },
    async deleteItinerary() {
      const url = "http://localhost:3000/itinerary/delete";
      const token = localStorage.getItem("city-explorer-token");
      let itinerary_id = this.activeItinerary._id;
      let title = this.activeItinerary.title;
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
    },
    displayDeleteModal(itinerary) {
      this.activeItinerary = itinerary;
      this.showDeleteItineraryModal = true;
    },
    hideDeleteModal() {
      this.activeItinerary = {};
      this.showDeleteItineraryModal = false;
    },
  },
  setup() {
    let store = persistentStore();
    return { store };
  },
};
</script>
<style lang="scss">
.myitineraries_wrapper {
  border: solid 2px red;
  .itineraries-header {
    display: flex;
    align-items: center;
    padding: 1em;
    .add-itinerary {
      margin-left: auto;
      height: 50px;
      width: 50px;
      border-radius: 50%;
      background-color: #d90368;
      display: flex;
      align-items: center;
      justify-content: center;
      .icon {
        color: #fff;
        font-size: 1.5em;
      }
    }
  }
  .itineraries-list {
    .itinerary-item {
      display: flex;
      align-items: center;
      padding: 1em;
      border: solid 1px rgba(0, 0, 0, 0.5);
      border-radius: 12px;
      margin: 0 1em 2em 1em;
      box-shadow: 2px 4px 4px hsl(0deg 0% 0% / 0.44);
      position: relative;
      transition: 0.1s ease;
      top: 0;
      left: 0;
      &:hover {
        box-shadow: 6px 12px 12px hsl(0deg 0% 0% / 0.31);
        top: -4px;
        left: -4px;
        cursor: pointer;
      }
      .circle {
        height: 60px;
        width: 60px;
        background-color: #2274a5;
        border-radius: 50%;
        margin-right: 2em;
      }
      .text-main {
        .itinerary-title {
          font-size: 2em;
          font-weight: bold;
        }
        .itinerary-location {
        }
      }
      .right-side {
        align-self: flex-start;
        margin-left: auto;
        .itinerary-dates {
          font-weight: bold;
        }
      }
      .options {
        display: flex;
        flex-direction: column;
        margin-left: 2em;
        & > * {
          background-color: #2274a5;
          color: #fff;
          border-radius: 50%;
          padding: 0.5em;
          font-size: 1.25em;
          margin-bottom: 0.25em;
          cursor: pointer;
        }
      }
    }
  }
}
.add-itinerary-modal {
  .input-group {
    margin: 0.5em;
  }
  .n-card__footer {
    display: flex;
    justify-content: flex-end;
    .n-button {
      margin: 0 0.5em !important;
    }
  }
}
</style>
