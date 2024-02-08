<template lang="">
  <div class="topbar_wrapper">
    <div class="logo">
      <font-awesome-icon :icon="['fas', 'city']" />
      <h2 class="logo-text" @click="navToHome">City Explorer</h2>
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
    margin-right: auto;
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
  .profile-group {
    display: flex;
    align-items: center;
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
</style>
