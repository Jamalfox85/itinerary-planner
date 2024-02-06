<template lang="">
  <div>
    <topbar />
    <router-view></router-view>
  </div>
</template>
<script>
import Topbar from "../components/Layout/Topbar.vue";

export default {
  components: { Topbar },
};
</script>
<style lang=""></style>
