<template lang="">
  <div class="main_wrapper" :style="themeColors">
    <sidepanel class="sidepanel_wrapper" />
    <router-view class="router-view"></router-view>
    <!-- <mobilebar class="mobile-toolbar" /> -->
  </div>
</template>
<script>
import Sidepanel from "../components/Layout/Sidepanel.vue";
import Mobilebar from "../components/Layout/MobileActionBar.vue";

export default {
  components: { Sidepanel, Mobilebar },
  computed: {
    themeColors() {
      return {
        "--blue": "#2274A5",
        "--orange": "#F75C03",
        "--yellow": "#F1C40F",
        "--pink": "#D90368",
        "--green": "#ООСС66",
        "--white": "#fff",
        "--black": "#000",
      };
    },
  },
};
</script>
<style lang="scss">
.main_wrapper {
  // max-height: 100vh;
  // height: 100vh;
  // overflow: hidden;
  display: flex;
  .sidepanel_wrapper {
    width: 10%;
    min-width: 285px;
    max-width: 285px;
  }
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
