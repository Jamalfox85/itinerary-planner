<template lang="">
  <div class="sidepanel_wrapper">
    <div class="sidepanel-header">
      <div class="logo">
        <font-awesome-icon :icon="['fas', 'star']" class="icon" />
      </div>
      <p class="app-title" @click="navToHome">City Explorer</p>
      <div>
        <font-awesome-icon :icon="['fas', 'bars-staggered']" class="expand-toggle" />
      </div>
    </div>
    <div class="sidepanel-footer">
      <div class="profile-bubble">
        <font-awesome-icon :icon="['fas', 'user']" class="icon" />
      </div>
      <div class="profile-text">
        <p class="profile-name">{{ userData?.firstName }} {{ userData?.lastName }}</p>
        <p class="profile-email">{{ userData?.email }}</p>
      </div>
      <n-dropdown :options="profileOptions" trigger="hover" @select="handleProfileOptionClick" class="gear-group">
        <div class="gear-group">
          <font-awesome-icon :icon="['fas', 'gear']" class="icon" />
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
<style lang="scss">
.sidepanel_wrapper {
  width: 25%;
  display: flex;
  flex-direction: column;
  padding: 0.75em;
  background-color: #2274a5;
  .sidepanel-header {
    height: 80px;
    display: flex;
    align-items: center;
    margin-bottom: 2em;
    color: #fff;
    .icon {
      font-size: 1.5em;
      margin-right: 0.5em;
    }
    .app-title {
      margin-right: auto;
    }
    .expand-toggle {
      font-size: 1.25em;
      transform: rotateX(180deg);
    }
  }
  .sidepanel-main {
    flex-grow: 1;
    border: solid 2px blueviolet;
  }
  .sidepanel-footer {
    height: 80px;
    display: flex;
    align-items: center;
    padding: 0 0.5em;
    margin-top: auto;
    color: #fff;
    .profile-bubble {
      height: 45px;
      min-width: 45px;
      border-radius: 50%;
      margin-right: 1em;
      background-color: #d90368;
      display: flex;
      .icon {
        margin: auto;
        font-size: 1.35em;
      }
    }
    .profile-name {
      font-weight: bold;
    }
    .profile-email {
      font-size: 0.7em;
    }
    .gear-group {
      margin-left: auto;
    }
  }
}
</style>
