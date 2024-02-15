<template lang="">
  <div class="details_wrapper">
    <div class="details-header">
      <h1 class="page-header">{{ itineraryDetails.title }}</h1>
      <p class="itinerary-dates fancy-text">{{ tripStart }} - {{ tripEnd }}</p>
    </div>
    <div class="details-main">
      <div class="recommendation-column">
        <div class="activity-search details-cell">
          <h2>Search</h2>
        </div>
        <div class="recommended-activities details-cell">
          <h2>Activity Recommendations</h2>
          <activity-recommendations />
        </div>
        <div class="recommended-restaurants details-cell">
          <h2>Local Restaurants</h2>
        </div>
      </div>
      <div class="confirmed-column">
        <div class="currency-conversion details-cell">
          <h2>Currency Converter</h2>
          <currency />
        </div>
        <div class="confirmed-activities details-cell">
          <h2>Activity List</h2>
          <n-tabs type="line" animated style="--n-bar-color: #d90368">
            <n-tab-pane name="all" tab="All Activities">
              <div class="activities">
                <div class="activity-entry" :class="{ completed: false }" v-for="activity in 20">
                  <n-checkbox class="completed-checkbox" style="--n-color-checked: #d90368; --n-border-checked: 1px solid #d90368; --n-border-focus: #d90368; --n-box-shadow-focus: 0 0 0 2px #d9036825" />
                  <p class="title">Botanial Gardens</p>
                  <font-awesome-icon :icon="['fas', 'circle-info']" class="icon" />
                </div>
              </div>
            </n-tab-pane>
          </n-tabs>
        </div>
        <div class="confirmed-restaurants details-cell">
          <h2>Restaurant List</h2>
          <n-tabs type="line" animated>
            <n-tab-pane name="all" tab="All Restaurants">
              <div class="restaurants">
                <div class="restaurant-entry" :class="{ completed: false }" v-for="restaurant in 20">
                  <n-checkbox class="completed-checkbox" style="--n-color-checked: #00cc66; --n-border-checked: 1px solid #00cc66; --n-border-focus: #00cc66; --n-box-shadow-focus: 0 0 0 2px #00cc6625" />
                  <p class="title">Pizza Palace</p>
                  <font-awesome-icon :icon="['fas', 'circle-info']" class="icon" />
                </div>
              </div>
            </n-tab-pane>
          </n-tabs>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { NTabs, NTabPane, NCheckbox } from "naive-ui";
import { useFetch, useUrlSearchParams } from "@vueuse/core";
import ActivityRecommendations from "../components/ActivityRecommendations.vue";
import Currency from "../components/Currency.vue";
import moment from "moment";
export default {
  components: { NTabs, NTabPane, NCheckbox, ActivityRecommendations, Currency },
  data() {
    return {
      itineraryDetails: {},
      tripStart: null,
      tripEnd: null,
    };
  },
  async mounted() {
    let { itineraryId } = useUrlSearchParams("history");
    let url = `http://localhost:3000/itinerary/itinerary/${itineraryId}`;
    await useFetch(url).then((response) => {
      let itineraryDetails = JSON.parse(response.data.value);
      this.itineraryDetails = itineraryDetails;
      console.log("RESPONSE: ", this.itineraryDetails);
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
  },
};
</script>
<style lang="scss">
.details_wrapper {
  border: solid 2px red;
  display: flex;
  flex-direction: column;
  //   max-height: 100%;
  //   padding: 1em;
  .details-header {
    border: solid 2px green;
    height: 100px;
    display: flex;
    align-items: center;
    padding: 0 2em;
    .itinerary-dates {
      margin-left: auto;
      font-size: 1.5em;
    }
  }
  .details-main {
    border: solid 2px blue;
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
      }
      .activity-search {
        height: 125px;
        border: solid 1px #f75c03;
        border-radius: 12px;
        box-shadow: 2px 4px 4px #f75c0375;
      }
      .recommended-activities {
        flex-grow: 1;
        border: solid 1px #d90368;
        border-radius: 12px;
        box-shadow: 2px 4px 4px #d9036875;
      }
      .recommended-restaurants {
        flex-grow: 1;
        border: solid 1px #00cc66;
        border-radius: 12px;
        box-shadow: 2px 4px 4px #00cc6675;
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
        .activities {
          display: flex;
          flex-wrap: wrap;
          height: 100px;
          overflow-y: scroll;
          .activity-entry {
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
            background: #d9036825;
            border-radius: 1em;
          }

          /* Handle */
          &::-webkit-scrollbar-thumb {
            background: #d90368;
            border-radius: 1em;
          }

          /* Handle on hover */
          &::-webkit-scrollbar-thumb:hover {
            background: #555;
          }
        }
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
