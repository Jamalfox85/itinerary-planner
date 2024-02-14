<template lang="">
  <div class="register_wrapper">
    <div class="register-main">
      <h1 class="primary-header">Wander Wise</h1>
      <h2 class="secondary-header">Seamlessly Organize, Effortlessly Explore</h2>
    </div>
    <div class="register-form">
      <h2 class="register-form-header">Log In Now</h2>
      <div class="input-groups">
        <div class="input-group">
          <label>Email <span style="color: red">*</span></label>
          <n-input type="text" v-model:value="email" ref="register_email_input" />
          <small class="required-field-message" ref="register_email_err_msg">Valid email is required</small>
        </div>
        <div class="input-group">
          <label>Password <span style="color: red">*</span></label>
          <n-input type="password" v-model:value="pass" ref="register_pass_input" />
          <small class="required-field-message" ref="register_pass_err_msg">Password must be at least 8 characters</small>
        </div>
      </div>
      <n-button color="#d90368" class="sign-up-bttn" :disabled="!formValidated" @click="loginUser">Log In</n-button>
      <p class="switch-to-login">Don't have an account? <span class="login-span" @click="navToRegister">Sign up here!</span></p>
    </div>
  </div>
</template>
<script>
import { useFetch } from "@vueuse/core";
import { NInput, NButton } from "naive-ui";
export default {
  components: { NInput, NButton },
  data() {
    return {
      email: null,
      pass: null,
    };
  },
  computed: {
    formValidated() {
      let validatedFields = 0;

      if (this.email !== null && this.email.includes("@")) {
        this.$refs["register_email_input"].$el.style.border = "none";
        this.$refs["register_email_err_msg"].style.visibility = "hidden";
        validatedFields++;
      } else if (this.email !== null) {
        this.$refs["register_email_input"].$el.style.border = "solid 2px red";
        this.$refs["register_email_err_msg"].style.visibility = "visible";
      }

      if (this.pass !== null && this.pass.length >= 8) {
        this.$refs["register_pass_input"].$el.style.border = "none";
        this.$refs["register_pass_err_msg"].style.visibility = "hidden";
        validatedFields++;
      } else if (this.pass !== null) {
        this.$refs["register_pass_input"].$el.style.border = "solid 2px red";
        this.$refs["register_pass_err_msg"].style.visibility = "visible";
      }

      if (validatedFields == 2) {
        return true;
      }
    },
  },
  methods: {
    async loginUser() {
      const url = "http://localhost:3000/auth/login";
      const { data, error } = await useFetch(url)
        .post({
          email: this.email,
          password: this.pass,
        })
        .json();
      console.log("DATA: ", data);
      if (data.value.token) {
        window.$message.success("Login Successful");
        window.location = "/myitineraries";
        localStorage.setItem("city-explorer-token", data.value.token);
      }
      if (error.value !== null) {
        window.$message.error("There was an issue signing in. Please try again.");
      }
    },
    navToRegister() {
      window.location = "/register";
    },
  },
};
</script>
<style lang="scss">
.register_wrapper {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 2em;
  background-color: #00cc66;
  .register-main {
    border: solid 2px green;
    padding: 1em;
    width: 50%;
    text-shadow: 1px 1px 4px #fff;
    .primary-header {
      font-size: 96px;
    }
    .secondary-header {
      font-size: 36px;
    }
  }
  .register-form {
    min-height: 500px;
    min-width: 400px;
    max-width: 400px;
    border: solid 4px #d90368;
    border-radius: 12px;
    background-color: #fff;
    box-shadow: 6px 12px 12px hsl(0deg 0% 0% / 0.31);
    padding: 1em;
    display: flex;
    flex-direction: column;
    transition: 0.2s ease;
    .register-form-header {
      font-size: 2em;
    }
    .input-groups {
      .input-group {
        margin: 0.5em;
      }
      .required-field-message {
        color: red;
        font-size: 0.75em;
        visibility: hidden;
      }
    }
    .sign-up-bttn {
      width: fit-content;
      margin: 1em;
    }
    .switch-to-login {
      margin-top: auto;
      align-self: center;
      .login-span {
        color: #d90368;
        text-decoration: underline;
      }
    }
  }
}
</style>
