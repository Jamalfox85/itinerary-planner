import { defineStore } from "pinia";
import { useFetch } from "@vueuse/core";

export const persistentStore = defineStore("persistent", {
  state: () => ({
    userData: null,
    accessToken: null,
    moodId: null,
    location: { lat: "36.98844", long: "-121.97483", cityName: "Lyon", countryCode: "Fr" },
    businessCodes: [],
  }),
  getters: {
    getUserData: (state) => state.userData,
    getAccessToken: (state) => state.accessToken,
    getMoodId: (state) => state.moodId,
    getLocation: (state) => state.location,
    getBusinessCodes: (state) => state.businessCodes,
  },
  actions: {
    async setUserData() {
      const url = "http://localhost:3000/user/profile";
      const token = localStorage.getItem("city-explorer-token");
      await useFetch(url, {
        async beforeFetch({ url, options, cancel }) {
          if (!token) cancel();
          options.headers = {
            ...options.headers,
            Authorization: `Bearer ${token}`,
          };
          return {
            options,
          };
        },
      })
        .json()
        .then((response) => {
          window.$message.success(response.data.value.message);
          this.userData = response.data.value.userData;
        });
    },
    setAccessToken(token) {
      this.accessToken = token;
    },
    setMoodId(id) {
      this.moodId = id;
    },
    setLocation(selectedLocation) {
      this.location = {
        lat: selectedLocation.coordinates.latitude,
        long: selectedLocation.coordinates.longitude,
        cityName: selectedLocation.name,
        countryCode: selectedLocation.countryCode,
      };
    },
    setBusinessCodes(codes) {
      this.businessCodes = codes;
    },
  },
});
