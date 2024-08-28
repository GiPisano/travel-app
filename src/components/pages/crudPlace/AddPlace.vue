<template>
  <div>
    <h2>Aggiungi un Nuovo Posto</h2>
    <form @submit.prevent="submitForm">
      <div style="display: flex; flex-direction: column">
        <div style="display: flex; align-items: center">
          <input
            v-model="name"
            placeholder="Nome del posto"
            required
            @input="debouncedSearchLocation"
          />
          <button @click="searchLocation" type="button">Cerca</button>
        </div>
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
      <input type="file" @change="handleFileChange" />
      <input v-model="startDate" type="date" required />
      <input v-model="endDate" type="date" required />
      <textarea
        v-model="description"
        placeholder="Descrizione"
        required
      ></textarea>
      <button type="submit">Aggiungi Posto</button>
    </form>
  </div>
</template>

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
      debounceTimeout: null, // Timeout per il debounce
    };
  },
  components: { MapComponent },

  methods: {
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
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
      this.name = suggestion.address.freeformAddress;
      this.searchLocation(); // Cerca nuovamente con il suggerimento selezionato
      this.suggestions = [];
    },
    searchLocation() {
      if (this.name.trim() === "") return; // Evita ricerche con stringhe vuote
      this.$refs.mapComponent.searchPlace(this.name);
    },
    debouncedSearchLocation() {
      clearTimeout(this.debounceTimeout);
      this.debounceTimeout = setTimeout(() => {
        this.searchLocation();
      }, 300); // Debounce di 300ms per limitare le chiamate all'API
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
};
</script>

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
}
.suggestions-list li {
  padding: 10px;
  cursor: pointer;
}
.suggestions-list li:hover {
  background-color: #f0f0f0;
}
</style>
