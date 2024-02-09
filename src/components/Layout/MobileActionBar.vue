<template lang="">
  <div class="mobile_wrapper">
    <div class="topbar-links">
      <a href="/myitineraries"><font-awesome-icon :icon="['fas', 'file-invoice']" class="icon" /></a>
      <a href="/discover"><font-awesome-icon :icon="['fas', 'magnifying-glass']" class="icon" /></a>
    </div>
  </div>
</template>
<script>
import { persistentStore } from "../../stores/PersistentStorage.js";
import { NDropdown } from "naive-ui";
export default {
  components: { NDropdown },
  data() {
    return {
      profileOptions: [
        {
          label: "View Profile",
          key: "profile",
        },
      ],
    };
  },
  methods: {
    navToHome() {
      this.$router.push("/");
    },
    handleProfileOptionClick(e) {
      if (e == "profile") {
        this.$router.push("/profile");
      }
    },
  },
  computed: {
    userData() {
      return this.store.getUserData;
    },
  },
  setup() {
    const store = persistentStore();
    return { store };
  },
};
</script>
<style lang="scss" scoped>
.mobile_wrapper {
  // display: flex;
  color: #fff;
  padding: 0.75em 2em;
  background-color: #2274a5;
  .topbar-links {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    margin: 0 4em;
    & > * {
      font-weight: bold;
      margin-right: 2em;
      color: #fff;
      text-decoration: none;
      .icon {
        margin: 0 1em;
        font-size: 1.5em;
      }
    }
  }
}
</style>
