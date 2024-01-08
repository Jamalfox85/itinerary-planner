<template lang="">
  <n-modal v-model:show="showModal" :mask-closable="false" :on-mask-click="closeModal">
    <n-card style="width: 600px" title="Modal" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <template #header-extra> Oops! </template>
      <n-select v-model:value="categories" multiple :options="categoryOptions" />
      <template #footer>
        <n-button @click="saveFilters">Save Filters</n-button>
      </template>
    </n-card>
  </n-modal>
</template>
<script>
import { NModal, NCard, NSelect, NButton } from "naive-ui";
import { useFetch } from "@vueuse/core";
import { usePlacesStore } from "../../stores/places.js";

export default {
  components: { NModal, NCard, NSelect, NButton },
  props: ["showModalProp"],
  data() {
    return {
      categories: [],
      categoryOptions: [],
    };
  },
  setup() {
    const store = usePlacesStore();
    return { store };
  },
  computed: {
    showModal() {
      return this.showModalProp;
    },
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
    saveFilters() {
      this.store.setCategories([...this.categories]);
      this.closeModal();
    },
  },
  async mounted() {
    let apiKey = "CGtqpWKnAEW1T3B1bAjfBfqvpi9zoMay";
    await useFetch(`https://api.tomtom.com/search/2/poiCategories.json?key=${apiKey}`).then(async (response) => {
      let apiResponse = JSON.parse(response.data.value);
      apiResponse.poiCategories.forEach((item) => {
        this.categoryOptions.push({
          label: item.name,
          value: item.id,
        });
      });
    });
  },
};
</script>
<style lang=""></style>
