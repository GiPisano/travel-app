import { reactive } from "vue";

export const store = reactive({
  places: JSON.parse(localStorage.getItem("places")) || [],

  addPlace(place) {
    this.places.push(place);
    localStorage.setItem("places", JSON.stringify(this.places));
  },
});
