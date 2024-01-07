import { defineStore } from "pinia";

export const persistentStore = defineStore("persistent", {
  state: () => ({
    accessToken: null,
    moodId: null,
    cityName: null,
    location: { lat: "36.98844", long: "-121.97483" },
    businessCodes: [],
  }),
  getters: {
    getAccessToken: (state) => state.accessToken,
    getMoodId: (state) => state.moodId,
    getCityName: (state) => state.cityName,
    getLocation: (state) => state.location,
    getBusinessCodes: (state) => state.businessCodes,
  },
  actions: {
    setAccessToken(token) {
      this.accessToken = token;
      console.log("access token: ", token);
    },
    setMoodId(id) {
      this.moodId = id;
      console.log("mood id: ", id);
    },
    setCityName(city) {
      this.cityName = city;
      console.log("city: ", city);
    },
    setLocation(lat, long) {
      this.location = { lat, long };
      console.log("location: ", lat, long);
    },
    setBusinessCodes(codes) {
      this.businessCodes = codes;
      console.log("business codes: ", codes);
    },
  },
});
