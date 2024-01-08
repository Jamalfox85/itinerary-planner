<template lang="">
  <div class="topbar_wrapper">
    <!-- <div class="logo">
      <font-awesome-icon :icon="['fas', 'city']" />
      <h2 class="logo-text" @click="navToHome">City Explorer</h2>
    </div> -->
  </div>
</template>
<script>
export default {
  methods: {
    navToHome() {
      this.$router.push("/");
    },
  },
};
</script>
<style lang="scss" scoped>
.topbar_wrapper {
  height: 40px;
  width: 100%;
  position: absolute;
  z-index: 2;
  display: flex;
  align-items: center;
  color: #000;
  padding: 0 2em;
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
}
</style>
