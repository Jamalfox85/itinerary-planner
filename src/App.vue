<script setup>
import { ref, onMounted } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { useFetch } from "@vueuse/core";
import { persistentStore } from "./stores/PersistentStorage.js";
import Topbar from "./components/Layout/Topbar.vue";

let store = persistentStore();

onMounted(async () => {
  await useFetch(`https://test.api.amadeus.com/v1/security/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: import.meta.env.VITE_CLIENT_ID,
      client_secret: import.meta.env.VITE_CLIENT_SECRET,
    }),
  }).then((response) => {
    let oathResults = JSON.parse(response.data.value);
    store.setAccessToken(oathResults.access_token);
  });
});
</script>

<template>
  <header class="app_header">
    <Topbar />
  </header>

  <RouterView class="app_router_view" />
</template>

<style></style>
