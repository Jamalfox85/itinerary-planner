<template lang="">
  <div class="myitineraries_wrapper">
    <div class="itineraries-header">
      <h1 class="page-header">My Itineraries</h1>
      <div class="add-itinerary">
        <n-button color="#A2E3C4" class="add-bttn" @click="showAddItineraryModal = true">
          <font-awesome-icon :icon="['fas', 'plus']" class="" style="margin-right: 0.25em" />
          Add new itinerary
        </n-button>
      </div>
    </div>
    <div class="itineraries-main" v-if="itineraries.length > 0">
      <div class="upcoming-trips">
        <h2>Upcoming Trips</h2>
        <n-data-table :bordered="false" :columns="columns" :data="itineraries" :pagination="{ pageSize: 5 }" />
      </div>
    </div>
    <div class="empty-state" v-else>
      <p class="empty-text">Add an itinerary for information to populate here!</p>
      <img src="../assets/images/undraw-park.svg" class="undraw-img" />
    </div>
    <add-itinerary-modal v-if="showAddItineraryModal" @newItineraryAdded="newItineraryAdded" @close="showAddItineraryModal = false" />
    <delete-itinerary-modal v-if="showDeleteItineraryModal" @itineraryDeleted="itineraryDeleted" @close="showDeleteItineraryModal = false" :itinerary="activeItinerary" />
  </div>
</template>
<script>
import { persistentStore } from "../stores/PersistentStorage.js";
import { NModal, NCard, NButton, NInput, NTabs, NTabPane, NDataTable, NSpace, NNumberAnimation } from "naive-ui";
import { useFetch } from "@vueuse/core";
import { h, defineComponent } from "vue";
import AddItineraryModal from "../components/modals/AddItinerary.vue";
import DeleteItineraryModal from "../components/modals/DeleteItinerary.vue";

export default {
  components: { NModal, NCard, NButton, NInput, NTabs, NTabPane, NDataTable, NSpace, NNumberAnimation, AddItineraryModal, DeleteItineraryModal },
  data() {
    return {
      showAddItineraryModal: false,
      showDeleteItineraryModal: false,
      itineraries: [],
      activeItinerary: null,
    };
  },
  async mounted() {
    const url = `${import.meta.env.VITE_BASE_API_URI}/itinerary/itineraries`;
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

    // this.$refs.upcomingTripsNum.value?.play();
  },
  computed: {
    columns() {
      const displayDeleteModal = (rowData) => {
        this.showDeleteItineraryModal = true;
        this.activeItinerary = rowData;
      };
      const navToItineraryPage = (rowData) => {
        window.location = `/itineraryDetails?itineraryId=${rowData._id}`;
      };
      return [
        {
          title: "Title",
          key: "title",
        },
        {
          title: "Location",
          key: "location.name",
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
                  onClick: () => {
                    navToItineraryPage(row);
                  },
                },
                { default: () => "View" }
              ),
              h(
                NButton,
                {
                  size: "small",
                  onClick: () => {
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
    newItineraryAdded(itinerary) {
      this.itineraries.push(itinerary);
    },
    itineraryDeleted(itinerary_id) {
      this.itineraries = this.itineraries.filter((itinerary) => itinerary._id != itinerary_id);
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
  padding: 1em;
  display: flex;
  flex-direction: column;
  .itineraries-header {
    display: flex;
    align-items: center;
    padding: 1em;
    .add-itinerary {
      margin-left: auto;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 12px;
      .add-bttn {
        border-radius: 2em;
        color: #000;
      }
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
    .upcoming-trips {
      h2 {
        font-size: 1.5em;
        margin-bottom: 1em;
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
  .empty-state {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: 1;
    font-size: 1.5em;
    position: relative;
    .empty-text {
      opacity: 0.5;
      position: relative;
      bottom: 20%;
      font-size: 1em;
    }
    .undraw-img {
      width: 50%;
      position: absolute;
      z-index: -1;
      opacity: 0.75;
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
