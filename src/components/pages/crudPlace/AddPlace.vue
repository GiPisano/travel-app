<script>
import { store } from "../../../store/store.js";
import MapComponent from "../../MapComponent.vue";

export default {
  data() {
    return {
      name: "",
      img: null,
      startDate: "",
      endDate: "",
      description: "",
      suggestions: [],
      isSuggestionSelected: false,
      todayDate: new Date().toISOString().split("T")[0], // Data di oggi in formato YYYY-MM-DD
      errorMessage: "", // Per mostrare un messaggio di errore se il file non è un'immagine
    };
  },
  components: { MapComponent },

  methods: {
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
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
        if (!validImageTypes.includes(file.type)) {
          alert(
            "Please select a valid image file (JPEG, PNG, GIF, WebP, AVIF, BMP, TIFF, SVG, HEIF, HEIC, ICO)"
          );
          this.img = null;
          event.target.value = ""; // Resetta l'input file
          return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
          this.img = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    updateSuggestions(suggestions) {
      this.suggestions = suggestions;
    },
    selectSuggestion(suggestion) {
      this.isSuggestionSelected = true;
      this.name = suggestion.address.freeformAddress;
      this.searchLocation();
      this.suggestions = [];
    },
    searchLocation() {
      if (this.isSuggestionSelected) {
        this.isSuggestionSelected = false;
        return;
      }

      if (this.name.trim() === "") return;
      this.$refs.mapComponent.searchPlace(this.name);
    },
    debouncedSearchLocation() {
      clearTimeout(this.debounceTimeout);
      this.debounceTimeout = setTimeout(() => {
        this.searchLocation();
      }, 300); // Chiamata API limitata
    },
    getDays() {
      const startDate = new Date(this.startDate);
      const endDate = new Date(this.endDate);
      const days = [];
      let dayCount = 1;

      for (
        let date = new Date(startDate);
        date <= endDate;
        date.setDate(date.getDate() + 1)
      ) {
        days.push({
          label: `Giorno ${dayCount}`,
          date: date.toISOString().split("T")[0],
        });
        dayCount++;
      }

      return days;
    },
    submitForm() {
      const newPlace = {
        id: Date.now(),
        name: this.name,
        img: this.img,
        startDate: this.startDate,
        endDate: this.endDate,
        description: this.description,
        days: this.getDays(),
      };
      store.addPlace(newPlace);
      this.$router.push({ name: "DetailPlace", params: { id: newPlace.id } });
    },
  },
  watch: {
    startDate(newStartDate) {
      if (newStartDate) {
        // Se la endDate è inferiore alla nuova startDate, resetta endDate
        if (new Date(this.endDate) < new Date(newStartDate)) {
          this.endDate = "";
        }
      }
    },
  },
};
</script>

<template>
  <div class="add-place">
    <h2>Add Destination</h2>

    <form @submit.prevent="submitForm">
      <div class="row">
        <div class="col-md-6">
          <div class="container-search-location-name">
            <input
              class="search-location-name"
              v-model="name"
              placeholder="Destination name.."
              required
              @input="debouncedSearchLocation"
            />

            <ul v-if="suggestions.length" class="suggestions-list">
              <li
                v-for="(suggestion, index) in suggestions"
                :key="index"
                @click="selectSuggestion(suggestion)"
              >
                {{ suggestion.address.freeformAddress }}
              </li>
            </ul>
          </div>
          <MapComponent
            ref="mapComponent"
            @update-suggestions="updateSuggestions"
          />
        </div>

        <div class="col-md-6">
          <div class="mb-3">
            <label for="start-date" class="form-label">Start Date</label>
            <input
              v-model="startDate"
              type="date"
              id="start-date"
              class="form-control"
              :min="todayDate"
              required
            />
          </div>
          <div class="mb-3">
            <label for="end-date" class="form-label">End Date</label>
            <input
              v-model="endDate"
              type="date"
              id="end-date"
              class="form-control"
              :min="startDate || todayDate"
              required
            />
          </div>

          <div class="mb-3">
            <label for="add-img-place" class="form-label">Add img</label>
            <input
              class="form-control"
              type="file"
              id="add-img-place"
              aria-describedby="button-addon2"
              multiple
              @change="handleFileChange"
              required
            />
          </div>
          <div class="mb-3">
            <label for="textarea-description" class="form-label"
              >Description</label
            >
            <textarea
              v-model="description"
              placeholder="Description..."
              required
              class="form-control"
              id="textarea-description"
              rows="3"
            ></textarea>
          </div>
          <div class="mb-3">
            <button type="submit">Add Destination</button>
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
.suggestions-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  background-color: white;
  border: 1px solid #ccc;
  max-height: 150px;
  overflow-y: auto;
  z-index: 1000;
  color: black;
  position: absolute;
  width: 100%;
}
.suggestions-list li {
  padding: 10px;
  cursor: pointer;
}
.suggestions-list li:hover {
  background-color: #f0f0f0;
}
.search-location-name {
  width: 100%;
}
.container-search-location-name {
  position: relative;
}

.add-place {
  padding: 20px;
}
</style>
