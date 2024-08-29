<script>
import Carousel from "../../Carousel.vue";

import { store } from "../../../store/store.js";

export default {
  components: {
    Carousel,
  },
  data() {
    return {
      place: {},
      day: {},
      dayNumber: 0,
      newPlace: "",
      previewImages: [],
    };
  },
  created() {
    this.loadDayDetails();
  },
  methods: {
    loadDayDetails() {
      const placeId = parseInt(this.$route.params.id);
      const dayIndex = parseInt(this.$route.params.day);
      this.dayNumber = dayIndex;
      this.place = store.places.find((p) => p.id === placeId);
      this.day = { ...this.place.days[dayIndex] };
    },
    addPlace() {
      if (this.newPlace.trim()) {
        this.day.placesToVisit = this.day.placesToVisit || [];
        this.day.placesToVisit.push(this.newPlace.trim());
        this.newPlace = "";
      }
    },
    removePlace(index) {
      this.day.placesToVisit.splice(index, 1);
    },
    handleImageUpload(event) {
      const files = event.target.files;
      for (const file of files) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.previewImages.push(e.target.result);
          this.day.images = this.day.images || [];
          this.day.images.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    },
    saveDayDetails() {
      this.place.days[this.dayNumber] = this.day;

      store.updatePlace(this.place);

      alert("Dettagli del giorno salvati con successo!");
      this.goBack();
    },
    goBack() {
      this.$router.push({ name: "DetailPlace", params: { id: this.place.id } });
    },
  },
};
</script>

<style>
form {
  display: flex;
  flex-direction: column;
}
label {
  margin-bottom: 10px;
}
input,
textarea,
button {
  font-size: 16px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.image-preview {
  max-width: 100px;
  margin-right: 10px;
}
</style>
