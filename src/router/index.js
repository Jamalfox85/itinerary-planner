import { createRouter, createWebHistory } from "vue-router";

import RegisterView from "../views/Register.vue";
import LoginView from "../views/Login.vue";
import HomeView from "../views/Home.vue";
import DashboardView from "../views/Dashboard.vue";
import ProfileView from "../views/Profile.vue";
import MyItinerariesView from "../views/MyItineraries.vue";
import DiscoverView from "../views/Discover.vue";

import DefaultLayout from "../layouts/Blank.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "layout",
      component: DefaultLayout,
      children: [
        {
          path: "/",
          name: "home",
          component: HomeView,
        },
        {
          path: "dashboard",
          name: "dashboard",
          component: DashboardView,
        },
        {
          path: "profile",
          name: "profile",
          component: ProfileView,
        },
        {
          path: "myitineraries",
          name: "myitineraries",
          component: MyItinerariesView,
        },
        {
          path: "discover",
          name: "discover",
          component: DiscoverView,
        },
      ],
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
  ],
  layout: DefaultLayout,
});

export default router;
