import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/Home.vue";
import DashboardView from "../views/Dashboard.vue";
import ProfileView from "../views/Profile.vue";

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
      path: "/profile",
      name: "profile",
      component: ProfileView,
    },
    {
      path: "/discover",
      name: "discover",
      component: HomeView,
    },
  ],
});

export default router;
