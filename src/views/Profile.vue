<template lang="">
  <div class="profile_page_wrapper">
    <h1 class="page-header">Profile Page</h1>
    <div class="profile-info">
      <div class="input-group">
        <label>First Name</label>
        <n-input v-model:value="firstName" type="text" placeholder="First Name" />
      </div>
      <div class="input-group">
        <label>Last Name</label>
        <n-input v-model:value="lastName" type="text" placeholder="Last Name" />
      </div>
      <div class="input-group">
        <label>Email</label>
        <n-input v-model:value="email" type="text" placeholder="Email" />
      </div>
    </div>
    <hr />
    <div class="password-info">
      <div class="input-group">
        <label>Password</label>
        <n-input v-model:value="password" type="password" placeholder="Password" />
      </div>
      <div class="input-group" v-if="passwordChanged">
        <label>Confirm Password</label>
        <n-input v-model:value="confirmPassword" type="password" placeholder="Confirm Password" />
      </div>
    </div>
    <hr />
    <div class="confirm-buttons">
      <n-button type="error" @click="deleteProfile">Delete Profile</n-button>
      <n-button type="tertiary" @click="setDefaults">Revert Changes</n-button>
      <n-button type="success" @click="saveChanges">Save Changes</n-button>
    </div>
  </div>
</template>
<script>
import { NInput, NButton } from "naive-ui";
export default {
  components: { NInput, NButton },
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "test",
      confirmPassword: "",
      passwordChanged: false,
    };
  },
  methods: {
    setDefaults() {
      this.firstName = this.originalFirstName;
      this.lastName = this.originalLastName;
      this.email = this.originalEmail;
      this.password = this.originalPassword;
    },
    deleteProfile() {},
    saveChanges() {},
  },
  watch: {
    password: async function (newValue, oldValue) {
      if (newValue != this.originalPassword) {
        this.passwordChanged = true;
      } else {
        this.passwordChanged = false;
      }
    },
  },
  setup() {
    let originalFirstName = "Jamal";
    let originalLastName = "Fox";
    let originalEmail = "Fox.Jamal@outlook.com";
    let originalPassword = "test";
    return { originalFirstName, originalLastName, originalEmail, originalPassword };
  },
  mounted() {
    this.setDefaults();
  },
};
</script>
<style lang="scss">
.profile_page_wrapper {
  height: 100%;
  flex-grow: 1;
  padding: 1em;
  .profile-info,
  .password-info,
  .confirm-buttons {
    margin: 1em 0;
    .input-group {
      margin: 2em 1em;
    }
  }
  .confirm-buttons {
    margin: 1em 0;
    display: flex;
    justify-content: flex-end;
    .n-button {
      margin: 2em 1em;
    }
  }
}
</style>
