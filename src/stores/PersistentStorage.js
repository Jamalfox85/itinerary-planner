import { defineStore } from "pinia";

export const persistentStore = defineStore("persistent", {
  state: () => ({
    accessToken: null,
    moodId: null,
    location: { lat: "36.98844", long: "-121.97483", cityName: "Lyon", countryCode: "Fr" },
    businessCodes: [],
  }),
  getters: {
    getAccessToken: (state) => state.accessToken,
    getMoodId: (state) => state.moodId,
    getLocation: (state) => state.location,
    getBusinessCodes: (state) => state.businessCodes,
  },
  actions: {
    setAccessToken(token) {
      this.accessToken = token;
    },
    setMoodId(id) {
      this.moodId = id;
    },
    setLocation(lat, long, cityName, countryCode) {
      this.location = { lat, long, cityName, countryCode };
    },
    setBusinessCodes(codes) {
      this.businessCodes = codes;
    },
  },
});
