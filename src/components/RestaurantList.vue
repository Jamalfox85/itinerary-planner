<template lang="">
  <div>
    <div class="restaurant-table">
      <div class="restaurant-entry" v-for="restaurant in restaurants">
        <p class="title">{{ restaurant.name }}</p>
        <font-awesome-icon v-if="restaurant?.website" :icon="['fas', 'link']" class="icon" @click="openSite(restaurant)" />
        <font-awesome-icon v-if="restaurant?.address" :icon="['fas', 'map-pin']" class="icon" @click="copyAddress(restaurant)" />
        <font-awesome-icon v-if="restaurant?.phone" :icon="['fas', 'phone']" class="icon" @click="callRestaurant(restaurant)" />
        <font-awesome-icon :icon="['fas', 'trash']" class="icon" @click="deleteRestaurant(restaurant)" />
      </div>
    </div>
  </div>
</template>
<script>
import { NTabs, NTabPane, NCheckbox } from "naive-ui";
import { useClipboard } from "@vueuse/core";

export default {
  props: ["restaurants"],
  components: { NTabs, NTabPane, NCheckbox },
  methods: {
    updateCheckbox(activity) {},
    openSite(restaurant) {
      window.open(`https://${restaurant.website}`, "_blank");
    },
    copyAddress(restaurant) {
      const { copy } = useClipboard();
      copy(restaurant?.address);
      window.$message.success("Address Copied!");
    },
    callRestaurant(restaurant) {
      window.open(`tel:${restaurant?.phone}`);
    },
    deleteRestaurant(restaurant) {
      console.log(restaurant);
      this.$emit("deleteRestaurant", restaurant);
    },
  },
  mounted() {},
};
</script>
<style lang="scss">
.restaurant-table {
  margin-top: 1em;
  height: 200px;
  overflow: auto;
  .restaurant-entry {
    display: flex;
    align-items: center;
    .completed-checkbox {
      width: 10%;
    }
    .title {
      width: 60%;
    }
    .icon {
      width: 10%;
      cursor: pointer;
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
