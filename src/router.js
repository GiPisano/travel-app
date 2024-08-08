import { createRouter, createWebHistory } from "vue-router";
import AddPlace from "./components/pages/AddPlace.vue";
import HomePage from "./components/pages/HomePage.vue";
import HolidayPage from "./components/pages/HolidayPage.vue";
import EditPlace from "./components/pages/EditPlace.vue";
import DetailPlace from "./components/pages/DetailPlace.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/add-place",
      name: "AddPlace",
      component: AddPlace,
    },
    {
      path: "/holiday",
      name: "holiday",
      component: HolidayPage,
    },
    {
      path: "/edit-place/:id",
      name: "EditPlace",
      component: EditPlace,
      props: true,
    },
    {
      path: "/detail-place/:id",
      name: "DetailPlace",
      component: DetailPlace,
      props: true,
    },
  ],
});

export { router };
