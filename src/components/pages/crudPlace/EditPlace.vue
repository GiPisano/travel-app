<script>
import { store } from "../../../store/store.js";
import MapComponent from "../../MapComponent.vue";

export default {
  data() {
    return {
      place: {},
    };
  },
  components: { MapComponent },
  created() {
    this.loadPlace();
  },
  watch: {
    "$route.params.id": "loadPlace",
    "place.name"(newName) {
      if (newName) {
        this.$nextTick(() => {
          if (this.$refs.mapComponent) {
            this.$refs.mapComponent.searchPlace(newName);
          }
        });
      }
    },
  },
  methods: {
    loadPlace() {
      const placeId = parseInt(this.$route.params.id);
      const originalPlace = store.places.find((p) => p.id === placeId);
      if (originalPlace) {
        this.place = JSON.parse(JSON.stringify(originalPlace)); // Copia profonda

        // Dopo aver caricato il luogo, aggiorna la mappa
        this.$nextTick(() => {
          this.$refs.mapComponent.searchPlace(this.place.name);
        });
      }
    },

    handleFileChange(event) {
      const validImageTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
        "image/avif",
        "image/bmp",
        "image/tiff",
        "image/svg+xml",
        "image/heif",
        "image/heic",
        "image/x-icon",
      ];

      const files = event.target.files;
      this.place.img = []; // Pulisce la lista delle immagini esistenti

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (!validImageTypes.includes(file.type)) {
          alert(
            "Please select valid image files (JPEG, PNG, GIF, WebP, AVIF, BMP, TIFF, SVG, HEIF, HEIC, ICO)"
          );
          continue; // Salta il file non valido
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          this.place.img.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    },

    getDaysWithinRange(startDate, endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const days = [];

      for (
        let date = new Date(start);
        date <= end;
        date.setDate(date.getDate() + 1)
      ) {
        days.push({
          date: date.toISOString().split("T")[0],
        });
      }

      return days;
    },
    updatePlace() {
      const newDays = this.getDaysWithinRange(
        this.place.startDate,
        this.place.endDate
      );
      this.place.days = newDays.map((newDay, index) => ({
        ...this.place.days[index],
        date: newDay.date,
      }));

      store.updatePlace(this.place);
      localStorage.setItem("places", JSON.stringify(store.places));
      this.$router.push({ name: "DetailPlace", params: { id: this.place.id } });
    },
  },
};
</script>

<template>
  <div>
    <h2>Edit Destination</h2>
    <form @submit.prevent="updatePlace">
      <div class="row">
        <div class="col-md-6">
          <div class="mb-3">
            <p class="place-name">Name: {{ place.name }}</p>
          </div>
          <MapComponent :searchQuery="place.name" ref="mapComponent" />
        </div>

        <div class="col-md-6">
          <div class="mb-3">
            <label for="start-date" class="form-label">Start Date</label>
            <input
              v-model="place.startDate"
              type="date"
              id="start-date"
              class="form-control"
              required
            />
          </div>
          <div class="mb-3">
            <label for="end-date" class="form-label">End Date</label>
            <input
              v-model="place.endDate"
              type="date"
              id="end-date"
              class="form-control"
              required
            />
          </div>

          <div class="mb-3">
            <label for="formFileMultiple" class="form-label"
              >Upload Images</label
            >
            <input
              class="form-control"
              type="file"
              id="formFileMultiple"
              multiple
              @change="handleFileChange"
            />
          </div>

          <div class="mb-3">
            <label for="textarea-description" class="form-label"
              >Description</label
            >
            <textarea
              v-model="place.description"
              class="form-control"
              id="textarea-description"
              rows="3"
              placeholder="Description..."
              required
            ></textarea>
          </div>

          <div class="mb-3">
            <button type="submit" class="btn btn-primary">Save Changes</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<style>
form {
  display: flex;
  flex-direction: column;
}

.place-name {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
}

input,
textarea {
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
}

button {
  padding: 10px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
