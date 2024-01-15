import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/Home.vue";
import DashboardView from "../views/Dashboard.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardView,
    },
    {
      path: "/about",
      name: "about",
      component: HomeView,
    },
    {
      path: "/discover",
      name: "discover",
      component: HomeView,
    },
  ],
});

export default router;
