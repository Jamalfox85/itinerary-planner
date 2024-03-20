<template lang="">
  <div class="sidepanel_wrapper">
    <div class="sidepanel-header">
      <p class="app-title" @click="navToHome">Wander Wise</p>
    </div>
    <div class="user-group">
      <div class="profile-bubble">
        <font-awesome-icon :icon="['fas', 'user']" class="icon" />
      </div>
      <p class="profile-name">{{ userData?.firstName }} {{ userData?.lastName }}</p>
      <n-button class="edit-profile-button" color="#A2E3C4">Edit Profile</n-button>
    </div>
    <div class="sidepanel-main">
      <div class="nav-block" :class="{ active: pagePath == '/myitineraries' }" @click="navTo('/myitineraries')">
        <div class="icon-block">
          <font-awesome-icon :icon="['fas', 'clipboard-list']" class="icon" />
        </div>
        <p class="block-label">My Itineraries</p>
      </div>
      <div class="nav-block">
        <div class="icon-block">
          <font-awesome-icon :icon="['fas', 'compass']" class="icon" />
        </div>
        <p class="block-label">Discover</p>
      </div>
      <div class="nav-block">
        <div class="icon-block">
          <font-awesome-icon :icon="['fas', 'magnifying-glass-location']" class="icon" />
        </div>
        <p class="block-label">Search</p>
      </div>
      <div class="nav-block">
        <div class="icon-block">
          <font-awesome-icon :icon="['fas', 'question']" class="icon" />
        </div>
        <p class="block-label">Plan My Day</p>
      </div>
    </div>
  </div>
</template>
<script>
import { persistentStore } from "../../stores/PersistentStorage.js";
import { NDropdown, NButton } from "naive-ui";

export default {
  components: { NDropdown, NButton },
  data() {
    return {
      pagePath: null,
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
    navTo(destination) {
      this.$router.push(destination);
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
  mounted() {
    let pagePath = this.$router;
    this.pagePath = pagePath.currentRoute.value.fullPath;
  },
};
</script>
<style lang="scss">
.sidepanel_wrapper {
  width: 25%;
  display: flex;
  flex-direction: column;
  background-color: #d90368;
  min-height: 100vh;
  background-image: url("../../assets/images/sidepanel-bg.jpg");
  background-size: cover;
  position: relative;
  border-right: solid 8px #a2e3c4;
  &::before {
    background-color: rgba(0, 0, 0, 0.37);
    content: "";
    display: block;
    height: 100%;
    position: absolute;
    width: 100%;
  }
  .sidepanel-header {
    height: 80px;
    display: flex;
    align-items: center;
    margin-bottom: 2em;
    color: #fff;
    padding: 1em;
    position: relative;
    z-index: 2;
    .app-title {
      margin-right: auto;
      font-size: 1.5em;
      font-weight: bold;
    }
  }
  .user-group {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    .profile-bubble {
      height: 4.5em;
      width: 4.5em;
      border-radius: 50%;
      background-color: #fff;
      display: flex;
      margin-bottom: 0.5em;
      .icon {
        margin: auto;
        font-size: 3em;
      }
    }
    .profile-name {
      color: #fff;
      font-size: 1.25em;
    }
    .edit-profile-button {
      border-radius: 2em;
      padding: 0.25em 2em;
      color: #000;
      margin-top: 0.5em;
      transition: 0.25s ease;
      &:hover {
        background-color: #ff6b6b;
      }
    }
  }
  .sidepanel-main {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin-top: 2em;
    padding: 1em;
    position: relative;
    z-index: 2;
    .nav-block {
      margin: 0.5em;
      display: flex;
      flex-direction: column;
      align-items: center;
      .icon-block {
        height: 100px;
        width: 100px;
        border-radius: 12px;
        background-color: rgba(255, 255, 255, 0.25);
        margin-bottom: 12px;
        display: flex;
        transition: 0.2s ease;
        cursor: pointer;
        &:hover {
          background-color: rgba(255, 255, 255, 0.5);
        }
        .icon {
          font-size: 3em;
          margin: auto;
          color: #fff;
        }
      }
      .block-label {
        color: #fff;
      }
      &.active {
        .icon-block {
          border: solid 2px #a2e3c4;
        }
        .block-label {
          font-weight: bold;
        }
      }
    }
  }
}
</style>
