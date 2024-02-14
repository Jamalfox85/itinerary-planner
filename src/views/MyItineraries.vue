<template lang="">
  <div class="myitineraries_wrapper">
    <div class="itineraries-header">
      <h1 class="page-header">My Itineraries</h1>
      <div class="add-itinerary">
        <n-button color="#D90368" @click="showAddItineraryModal = true">
          <font-awesome-icon :icon="['fas', 'plus']" class="" style="margin-right: 0.25em" />
          Add new itinerary
        </n-button>
      </div>
    </div>
    <div class="stats-bar">
      <div class="stat-group">
        <p class="stat-header">Upcoming Trips</p>
        <p class="stat-num">12</p>
      </div>
      <div class="stat-group">
        <p class="stat-header">Completed Trips</p>
        <p class="stat-num">1</p>
      </div>
      <div class="stat-group">
        <p class="stat-header">Upcoming Activities</p>
        <p class="stat-num">22</p>
      </div>
      <div class="stat-group">
        <p class="stat-header">Completed Activities</p>
        <p class="stat-num">20</p>
      </div>
    </div>
    <div class="itineraries-main">
      <n-tabs type="line" animated>
        <n-tab-pane name="all" tab="All">
          <n-data-table :bordered="false" :columns="columns" :data="itineraries" :pagination="{ pageSize: 5 }" />
        </n-tab-pane>
        <n-tab-pane name="upcoming" tab="Upcoming">
          <n-data-table :bordered="false" :columns="columns" :data="itineraries" :pagination="{ pageSize: 5 }" />
        </n-tab-pane>
        <n-tab-pane name="completed" tab="Completed">
          <n-data-table :bordered="false" :columns="columns" :data="itineraries" :pagination="{ pageSize: 5 }" />
        </n-tab-pane>
      </n-tabs>
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
import { NModal, NCard, NButton, NInput, NTabs, NTabPane, NDataTable, NSpace } from "naive-ui";
import { useFetch } from "@vueuse/core";
import { h, defineComponent } from "vue";

export default {
  components: { NModal, NCard, NButton, NInput, NTabs, NTabPane, NDataTable, NSpace },
  data() {
    return {
      showAddItineraryModal: false,
      showDeleteItineraryModal: false,
      addItinerary: {
        title: "",
        location: "",
        dates: "",
      },
      itineraries: [],
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
  computed: {
    columns() {
      const displayDeleteModal = (rowData) => {
        this.displayDeleteModal(rowData);
      };
      const navToItineraryPage = (rowData) => {
        console.log("row data: ", rowData);
        window.location = `/itineraryDetails?itinerary=${rowData._id}`;
      };
      return [
        {
          title: "Title",
          key: "title",
        },
        {
          title: "Location",
          key: "location",
        },
        {
          title: "Dates",
          key: "dates",
        },
        {
          title: "Actions",
          key: "actions",
          render(row) {
            return [
              h(
                NButton,
                {
                  size: "small",
                  onClick: (row) => {
                    console.log("row: ", row);
                    navToItineraryPage(row);
                  },
                },
                { default: () => "View" }
              ),
              h(
                NButton,
                {
                  size: "small",
                  onClick: (row) => {
                    displayDeleteModal(row);
                  },
                },
                { default: () => "Delete" }
              ),
            ];
          },
        },
      ];
    },
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
  padding: 1em;
  display: flex;
  flex-direction: column;
  .itineraries-header {
    display: flex;
    align-items: center;
    padding: 1em;
    .add-itinerary {
      margin-left: auto;
      background-color: #d90368;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 12px;
      .icon {
        color: #fff;
        font-size: 1.5em;
      }
    }
  }
  .stats-bar {
    display: flex;
    padding: 1em;
    .stat-group {
      margin-right: 2em;
      text-align: center;
      .stat-num {
        font-size: 2em;
        font-weight: bold;
      }
    }
  }
  .itineraries-main {
    flex-grow: 1;
    padding: 1.5em;
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
