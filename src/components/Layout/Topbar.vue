<template lang="">
  <div class="topbar_wrapper">
    <div class="logo">
      <font-awesome-icon :icon="['fas', 'city']" />
      <h2 class="logo-text" @click="navToHome">City Explorer</h2>
    </div>
    <div class="topbar-links">
      <a href="/myitineraries"><font-awesome-icon :icon="['fas', 'file-invoice']" class="icon" /> My Itineraries</a>
      <a href="/discover"><font-awesome-icon :icon="['fas', 'magnifying-glass']" class="icon" />Discover</a>
    </div>
    <div class="profile-group">
      <p class="profile-name">{{ userData?.firstName }} {{ userData?.lastName }}</p>
      <n-dropdown :options="profileOptions" trigger="hover" @select="handleProfileOptionClick">
        <div class="portrait-bubble">
          <font-awesome-icon :icon="['fas', 'user']" class="user-icon" />
        </div>
      </n-dropdown>
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
    store.setUserData();
    let test = store.getUserData;
    return { store };
  },
};
</script>
<style lang="scss" scoped>
.topbar_wrapper {
  display: flex;
  color: #fff;
  padding: 0.75em 2em;
  background-color: #2274a5;
  .logo {
    margin-right: 2em;
    font-weight: bold;
    display: flex;
    align-items: center;
    cursor: pointer;
    svg {
      margin-right: 0.5em;
    }
    .logo-text {
      font-size: 1em;
    }
  }
  .topbar-links {
    display: flex;
    align-items: center;
    flex-grow: 1;
    margin: 0 4em;
    & > * {
      font-weight: bold;
      margin-right: 2em;
      color: #fff;
      text-decoration: none;
      .icon {
        margin-right: 0.5em;
      }
    }
  }
  .profile-group {
    display: flex;
    align-items: center;
    margin-left: auto;
    .profile-name {
      margin-right: 1em;
      font-weight: bold;
    }
    .portrait-bubble {
      height: 35px;
      width: 35px;
      border-radius: 50%;
      background-color: #fff;
      display: flex;
      &:hover {
        background-color: #d8e8f1;
        transition: 0.2s ease;
        cursor: pointer;
      }
      .user-icon {
        margin: auto;
        color: #2274a5;
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .topbar-links {
    display: none !important;
  }
}
</style>
