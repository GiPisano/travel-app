import { createRouter, createWebHistory } from "vue-router";
import AddPlace from "./components/pages/crudPlace/AddPlace.vue";
import HomePage from "./components/pages/HomePage.vue";
import HolidayPage from "./components/pages/HolidayPage.vue";
import EditPlace from "./components/pages/crudPlace/EditPlace.vue";
import DetailPlace from "./components/pages/crudPlace/DetailPlace.vue";
import FormDay from "./components/pages/days/FormDay.vue";
import DetailDay from "./components/pages/days/DetailDay.vue";
import NavPage from "./components/NavPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/holiday",
      name: "holiday",
      component: HolidayPage,
    },
    {
      path: "/add-place",
      name: "AddPlace",
      component: AddPlace,
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
    {
      path: "/organize-day/:id/:day",
      name: "FormDay",
      component: FormDay,
      props: true,
    },
    {
      path: "/detail-day/:id/:day",
      name: "DetailDay",
      component: DetailDay,
      props: true,
    },
    {
      path: "/nav",
      name: "NavPage",
      component: NavPage,
    },
  ],
});

export { router };
