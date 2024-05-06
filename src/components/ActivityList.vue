<template lang="">
  <div>
    <n-tabs type="line" animated style="--n-bar-color: #ff6b6b">
      <n-tab-pane name="all" tab="All Activities">
        <div class="activities">
          <p v-if="!activities || activities.length == 0">No Activities Selected Yet</p>
          <div v-else class="activity-entry" :class="{ completed: false }" v-for="activity in activities">
            <p class="title">{{ activity.title }}</p>
            <font-awesome-icon :icon="['fas', 'circle-info']" class="icon" />
          </div>
        </div>
      </n-tab-pane>
      <n-tab-pane name="price" tab="Filter By Price">
        <div class="activities">
          <n-tabs animated style="--n-bar-color: #2274a5">
            <n-tab-pane v-for="category in organizeByPrice" :name="category.label" :tab="category.label">
              <div class="activity-entry" :class="{ completed: false }" v-for="activity in category.activities">
                <n-checkbox class="completed-checkbox" style="--n-color-checked: #d90368; --n-border-checked: 1px solid #d90368; --n-border-focus: #d90368; --n-box-shadow-focus: 0 0 0 2px #d9036825" />
                <p class="title">{{ activity.title }}</p>
                <font-awesome-icon :icon="['fas', 'circle-info']" class="icon" />
              </div>
            </n-tab-pane>
          </n-tabs>
        </div>
      </n-tab-pane>
      <n-tab-pane name="mood" tab="Filter By Mood">
        <div class="activities">
          <n-tabs animated style="--n-bar-color: #2274a5">
            <n-tab-pane v-for="category in organizeByMood" :name="category.label" :tab="category.label">
              <div class="activity-entry" :class="{ completed: false }" v-for="activity in category.activities">
                <n-checkbox class="completed-checkbox" style="--n-color-checked: #d90368; --n-border-checked: 1px solid #d90368; --n-border-focus: #d90368; --n-box-shadow-focus: 0 0 0 2px #d9036825" />
                <p class="title">{{ activity.title }}</p>
                <font-awesome-icon :icon="['fas', 'circle-info']" class="icon" />
              </div>
            </n-tab-pane>
          </n-tabs>
        </div>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>
<script>
import { NTabs, NTabPane, NCheckbox } from "naive-ui";

export default {
  props: ["activities"],
  components: { NTabs, NTabPane, NCheckbox },
  methods: {
    updateCheckbox(activity) {
      console.log(activity);
    },
  },
  computed: {
    organizeByPrice() {
      let uniquePriceTargets = [];
      let organizedActivities = [];
      this.activities.map((activity) => {
        if (!uniquePriceTargets.includes(activity.price)) {
          uniquePriceTargets.push(activity.price);
        }
      });
      uniquePriceTargets.map((priceTarget) => {
        if (priceTarget !== undefined && priceTarget !== null) {
          let applicableActivities = this.activities.filter((activity) => activity.price == priceTarget);
          let label;
          if (priceTarget == 0) {
            label = "Free";
          } else if (priceTarget == 1) {
            label = "$";
          } else if (priceTarget == 2) {
            label = "$$";
          } else if (priceTarget == 3) {
            label = "$$$";
          }
          if (label !== "Free") {
            organizedActivities.push({
              label,
              activities: applicableActivities,
            });
          } else {
            organizedActivities.unshift({
              label,
              activities: applicableActivities,
            });
          }
        }
      });
      return organizedActivities;
    },
    organizeByMood() {
      let uniqueMoodTargets = [];
      let organizedActivities = [];
      this.activities.map((activity) => {
        if (!uniqueMoodTargets.includes(activity?.mood)) {
          uniqueMoodTargets.push(activity?.mood);
        }
      });
      uniqueMoodTargets.map((moodTarget) => {
        if (moodTarget !== undefined && moodTarget !== null) {
          let applicableActivities = this.activities.filter((activity) => activity.mood == moodTarget);
          organizedActivities.push({
            label: moodTarget,
            activities: applicableActivities,
          });
        }
      });
      return organizedActivities;
    },
  },
};
</script>
<style lang="scss">
.activities {
  display: flex;
  flex-direction: column;
  height: 200px;
  overflow-y: auto;
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
</style>
