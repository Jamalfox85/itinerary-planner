<template lang="">
  <div class="details_wrapper">
    <div class="details-header">
      <h1 class="page-header">{{ itineraryDetails.title }}</h1>
      <p class="itinerary-dates fancy-text">{{ tripStart }} - {{ tripEnd }}</p>
    </div>
    <div class="details-main">
      <div class="recommendation-column">
        <div class="recommended-activities details-cell">
          <activity-recommendations @addActivity="addActivity" :cityName="itineraryDetails?.location?.name" class="activity-recommendations" />
        </div>
        <!-- <div class="activity-search details-cell">
          <h2>Search</h2>
        </div> -->
        <div class="recommended-restaurants details-cell">
          <restaurant-recommendations @addRestaurant="addRestaurant" @deleteRestaurant="deleteRestaurant" :location="itineraryDetails?.location" />
        </div>
      </div>
      <div class="confirmed-column">
        <div class="confirmed-activities details-cell">
          <h2>Activity List</h2>
          <activity-list :activities="itineraryDetails?.activities" />
        </div>
        <!-- <div class="currency-conversion details-cell">
          <h2>Currency Converter</h2>
          <currency />
        </div> -->

        <div class="confirmed-restaurants details-cell">
          <h2>Restaurant List</h2>
          <restaurant-list :restaurants="itineraryDetails?.restaurants" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { NTabs, NTabPane, NCheckbox } from "naive-ui";
import { useFetch, useUrlSearchParams } from "@vueuse/core";
import ActivityRecommendations from "../components/ActivityRecommendations.vue";
import RestaurantRecommendations from "../components/RestaurantRecommendations.vue";
import ActivityList from "../components/ActivityList.vue";
import RestaurantList from "../components/RestaurantList.vue";
import Currency from "../components/Currency.vue";
import moment from "moment";
import axios from "axios";

export default {
  components: { NTabs, NTabPane, NCheckbox, ActivityList, RestaurantList, ActivityRecommendations, RestaurantRecommendations, Currency },
  data() {
    return {
      itineraryDetails: {},
      tripStart: null,
      tripEnd: null,
    };
  },
  async mounted() {
    let { itineraryId } = useUrlSearchParams("history");
    let url = `${import.meta.env.VITE_BASE_API_URI}/itinerary/itinerary/${itineraryId}`;
    await useFetch(url).then((response) => {
      let itineraryDetails = JSON.parse(response.data.value);
      this.itineraryDetails = itineraryDetails;
    });
    this.setDates();
  },
  methods: {
    setDates() {
      let start = moment(this.itineraryDetails?.dateRange[0]).format("ddd MMM D YYYY");
      let end = moment(this.itineraryDetails?.dateRange[1]).format("ddd MMM D YYYY ");
      this.tripStart = start;
      this.tripEnd = end;
    },
    async addActivity(activity) {
      const url = `${import.meta.env.VITE_BASE_API_URI}/itinerary/addActivity`;
      axios
        .put(url, {
          itinerary_id: this.itineraryDetails._id,
          activity: {
            title: activity.title,
            description: activity.details,
            price: activity?.price,
            mood: activity?.mood || null,
          },
        })
        .then((response) => {
          window.$message.success("Activity Successfully Added");
        })
        .catch((error) => {
          console.log("ERROR: ", error);
          window.$message.error(error);
        });
    },
    async addRestaurant(restaurant) {
      const url = `${import.meta.env.VITE_BASE_API_URI}/itinerary/addRestaurant`;
      axios
        .put(url, {
          itinerary_id: this.itineraryDetails._id,
          restaurant: {
            name: restaurant?.poi?.name,
            address: restaurant?.address?.freeformAddress,
            website: restaurant?.poi?.url,
            phone: restaurant?.poi?.phone,
          },
        })
        .then((response) => {
          window.$message.success("Restaurant Successfully Added");
        })
        .catch((error) => {
          console.log("ERROR: ", error);
          window.$message.error(error);
        });
    },
    async deleteRestaurant(restaurant) {
      const url = `${import.meta.env.VITE_BASE_API_URI}/itinerary/deleteRestaurant`;
      axios
        .put(url, {
          itinerary_id: this.itineraryDetails._id,
          restaurant: restaurant,
        })
        .then((response) => {
          window.$message.success("Restaurant Successfully Deleted");
        })
        .catch((error) => {
          console.log("ERROR: ", error);
          window.$message.error(error);
        });
    },
  },
};
</script>
<style lang="scss">
.details_wrapper {
  display: flex;
  flex-direction: column;
  .details-header {
    height: 100px;
    display: flex;
    align-items: center;
    padding: 0 2em;
    background-color: #2e2c2f;
    color: #fff;
    .page-header {
    }
    .itinerary-dates {
      margin-left: auto;
      font-size: 1.5em;
    }
  }
  .details-main {
    display: flex;
    flex-grow: 1;
    & > * {
      //   flex-grow: 1;
      width: 50%;
    }
    .details-cell {
      padding: 1em;
      h2 {
        font-size: 1.5em;
      }
    }
    .recommendation-column {
      height: 100%;
      display: flex;
      flex-direction: column;
      & > * {
        margin: 0.75em;
        height: 50%;
        max-height: 50%;
        overflow: hidden;
      }
      .recommended-activities {
        // flex-grow: 1;
        border-radius: 12px;
        background-image: url("../assets/images/nature-bg2.jpg");
        background-size: cover;
        position: relative;
        overflow: hidden;
        &::before {
          background-color: #475b63;
          content: "";
          display: block;
          height: 100%;
          position: absolute;
          width: 100%;
          top: 0;
          left: 0;
          z-index: 2;
          opacity: 0.75;
        }
        .cell-header {
          position: relative;
          z-index: 2;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #fff;
          .icon {
            font-size: 1.5em;
            cursor: pointer;
            // color: #fff;
          }
        }
        .activity-recommendations {
          position: relative;
          z-index: 2;
        }
      }
      .activity-search {
        height: 125px;
        border: solid 1px #f75c03;
        border-radius: 12px;
        box-shadow: 2px 4px 4px #f75c0375;
      }

      .recommended-restaurants {
        // flex-grow: 1;
        border: solid 1px #ff6b6b;
        border-radius: 12px;
        box-shadow: 2px 4px 4px #ff6b6b75;
        background-image: url("../assets/images/restaurant-img.jpg");
        background-size: cover;
        background-position: center center;
        position: relative;
        color: #fff;
        &::before {
          background-color: #ff6b6b75;
          content: "";
          display: block;
          height: 100%;
          position: absolute;
          width: 100%;
          top: 0;
          left: 0;
          z-index: 2;
          opacity: 0.75;
        }
      }
    }
    .confirmed-column {
      height: 100%;
      display: flex;
      flex-direction: column;
      & > * {
        margin: 0.75em;
      }
      .currency-conversion {
        height: 125px;
        // height: 20%;
        border: solid 1px #2274a5;
        border-radius: 12px;
        box-shadow: 2px 4px 4px #2274a575;
      }
      .confirmed-activities {
        flex-grow: 1;
        // max-height: 40%;
        border: solid 1px #d90368;
        border-radius: 12px;
        box-shadow: 2px 4px 4px #d9036875;
        display: flex;
        flex-direction: column;
        background-color: #f1dabf;
        /* Tab Styles */
        .n-tabs-tab.n-tabs-tab--active {
          color: #d90368;
        }
      }
      .confirmed-restaurants {
        flex-grow: 1;
        // height: 40%;
        border: solid 1px #00cc66;
        border-radius: 12px;
        box-shadow: 2px 4px 4px #00cc6675;
        display: flex;
        flex-direction: column;
        background-color: #2e2c2f;
        color: #fff;
        .restaurants {
          display: flex;
          flex-wrap: wrap;
          height: 100px;
          overflow-y: scroll;
          .restaurant-entry {
            flex-grow: 1;
            width: fit-content;
            min-width: 40%;
            display: flex;
            align-items: center;
            margin: 2px 12px;
            .completed-checkbox {
              margin-right: 0.5em;
            }
            .title {
              margin-right: 1em;
            }
            .icon {
            }
            &.completed {
              .title,
              .icon {
                text-decoration: line-through;
                opacity: 0.75;
              }
            }
          }
          /* width */
          &::-webkit-scrollbar {
            width: 10px;
          }

          /* Track */
          &::-webkit-scrollbar-track {
            background: #00cc6625;
            border-radius: 1em;
          }

          /* Handle */
          &::-webkit-scrollbar-thumb {
            background: #00cc66;
            border-radius: 1em;
          }

          /* Handle on hover */
          &::-webkit-scrollbar-thumb:hover {
            background: #555;
          }
        }
      }
    }
  }
}
</style>
