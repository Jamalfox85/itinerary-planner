<template lang="">
  <div class="main_wrapper">
    <topbar />
    <router-view class="router-view"></router-view>
    <mobilebar class="mobile-toolbar" />
  </div>
</template>
<script>
import Topbar from "../components/Layout/Topbar.vue";
import Mobilebar from "../components/Layout/MobileActionBar.vue";

export default {
  components: { Topbar, Mobilebar },
};
</script>
<style lang="scss">
.main_wrapper {
  max-height: 100vh;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .router-view {
    flex-grow: 1;
  }
}
.mobile-toolbar {
  display: none;
  margin-top: auto;
}
@media screen and (max-width: 750px) {
  .mobile-toolbar {
    display: flex;
  }
}
</style>
