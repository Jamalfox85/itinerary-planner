import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/Home.vue";
import ScheduleView from "../views/Schedule.vue";
import AssessmentView from "../views/Assessment.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/schedule",
      name: "schedule",
      component: ScheduleView,
    },
    {
      path: "/assessment",
      name: "assessment",
      component: AssessmentView,
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
