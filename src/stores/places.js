import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const usePlacesStore = defineStore("places", {
  state: () => ({
    results: [],
    categories: [],
  }),
  getters: {
    getResults: (state) => state.results,
    getCategories: (state) => state.categories,
  },
  actions: {
    setResults(results) {
      this.results = [];
      this.results = results;
    },
    addResults(results) {
      this.results.push(results);
    },
    setCategories(categories) {
      this.categories = [];
      this.categories = categories;
    },
  },
});
