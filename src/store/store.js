import { reactive } from "vue";

export const store = reactive({
  places: JSON.parse(localStorage.getItem("places")) || [],

  addPlace(place) {
    this.places.push(place);
    this.savePlaces();
  },

  removePlace(placeToRemove) {
    const index = this.places.indexOf(placeToRemove);
    if (index > -1) {
      this.places.splice(index, 1);
      this.savePlaces();
    }
  },

  editPlace(updatedPlace) {
    const index = this.places.findIndex(
      (place) => place.id === updatedPlace.id
    );
    if (index > -1) {
      this.places.splice(index, 1, updatedPlace);
      this.savePlaces();
    }
  },

  savePlaces() {
    localStorage.setItem("places", JSON.stringify(this.places));
  },
});
