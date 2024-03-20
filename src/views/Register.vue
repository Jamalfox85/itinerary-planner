<template lang="">
  <div class="register_wrapper">
    <div class="register-main">
      <h1 class="primary-header">Wander Wise</h1>
      <h2 class="secondary-header">Seamlessly Organize, Effortlessly Explore</h2>
    </div>
    <div class="register-form">
      <h2 class="register-form-header">Sign Up Now</h2>
      <div class="input-groups">
        <div style="display: flex">
          <div class="input-group" style="width: 50%">
            <label>First Name <span style="color: red">*</span></label>
            <n-input type="text" v-model:value="firstName" ref="register_firstName_input" />
            <small class="required-field-message" ref="register_firstName_err_msg">First name is required</small>
          </div>
          <div class="input-group" style="width: 50%">
            <label>Last Name <span style="color: red">*</span></label>
            <n-input type="text" v-model:value="lastName" ref="register_lastName_input" />
            <small class="required-field-message" ref="register_lastName_err_msg">Last name is required</small>
          </div>
        </div>
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
        <div class="input-group">
          <label>Confirm Password <span style="color: red">*</span></label>
          <n-input type="password" v-model:value="confirmPass" ref="register_confirmPass_input" />
          <small class="required-field-message" ref="register_confirmPass_err_msg">Passwords must match</small>
        </div>
      </div>
      <n-button color="#d90368" class="sign-up-bttn" :disabled="!formValidated" @click="registerUser">Sign Up</n-button>
      <p class="switch-to-login">Already have an account? <span class="login-span" @click="navToLogin">Log in here!</span></p>
    </div>
    <!-- <button @click="registerUser">Sign Up</button> -->
  </div>
</template>
<script>
import { useFetch } from "@vueuse/core";
import { NInput, NButton } from "naive-ui";
export default {
  components: { NInput, NButton },
  data() {
    return {
      firstName: null,
      lastName: null,
      email: null,
      pass: null,
      confirmPass: null,
    };
  },
  computed: {
    formValidated() {
      let validatedFields = 0;

      if (this.firstName !== null && this.firstName.length > 2) {
        this.$refs["register_firstName_input"].$el.style.border = "none";
        this.$refs["register_firstName_err_msg"].style.visibility = "hidden";
        validatedFields++;
      } else if (this.firstName !== null) {
        this.$refs["register_firstName_input"].$el.style.border = "solid 2px red";
        this.$refs["register_firstName_err_msg"].style.visibility = "visible";
      }

      if (this.lastName !== null && this.lastName.length > 2) {
        this.$refs["register_lastName_input"].$el.style.border = "none";
        this.$refs["register_lastName_err_msg"].style.visibility = "hidden";
        validatedFields++;
      } else if (this.lastName !== null) {
        this.$refs["register_lastName_input"].$el.style.border = "solid 2px red";
        this.$refs["register_lastName_err_msg"].style.visibility = "visible";
      }

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

      if (this.confirmPass !== null && this.confirmPass == this.pass) {
        this.$refs["register_confirmPass_input"].$el.style.border = "none";
        this.$refs["register_confirmPass_err_msg"].style.visibility = "hidden";
        validatedFields++;
      } else if (this.confirmPass !== null) {
        this.$refs["register_confirmPass_input"].$el.style.border = "solid 2px red";
        this.$refs["register_confirmPass_err_msg"].style.visibility = "visible";
      }

      if (validatedFields == 5) {
        return true;
      }
    },
  },
  methods: {
    async registerUser() {
      const url = "http://localhost:3000/auth/register";
      const { data, error } = await useFetch(url)
        .post({
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.pass,
        })
        .json();
      if (data.value !== null) {
        window.$message.success(data.value.message);
        window.location = "/dashboard";
      }
      if (error.value !== null) {
        window.$message.error("This email already exists.");
      }
    },
    navToLogin() {
      window.location = "/login";
    },
  },
};
</script>
<style lang="scss">
// .register_wrapper {
//   height: 100vh;
//   display: flex;
//   // align-items: center;
//   justify-content: space-around;
//   padding: 2em;
//   background-color: #00cc66;
//   .register-main {
//     padding: 1em;
//     width: 50%;
//     text-shadow: 1px 1px 4px #fff;
//     // .primary-header {
//     //   font-size: 48px;
//     // }
//     // .secondary-header {
//     //   font-size: 36px;
//     // }
//   }
//   .register-form {
//     min-height: 500px;
//     min-width: 400px;
//     max-width: 400px;
//     border: solid 4px #d90368;
//     border-radius: 12px;
//     background-color: #fff;
//     box-shadow: 6px 12px 12px hsl(0deg 0% 0% / 0.31);
//     padding: 1em;
//     display: flex;
//     flex-direction: column;
//     transition: 0.2s ease;
//     .register-form-header {
//       font-size: 2em;
//     }
//     .input-groups {
//       .input-group {
//         margin: 0.5em;
//       }
//       .required-field-message {
//         color: red;
//         font-size: 0.75em;
//         visibility: hidden;
//       }
//     }
//     .sign-up-bttn {
//       width: fit-content;
//       margin: 1em;
//     }
//     .switch-to-login {
//       margin-top: auto;
//       align-self: center;
//       .login-span {
//         color: #d90368;
//         text-decoration: underline;
//       }
//     }
//   }
// }
</style>
