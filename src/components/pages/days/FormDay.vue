<script>
import { store } from "../../../store/store.js";

export default {
  data() {
    return {
      place: {}, // Per memorizzare i dettagli del luogo
      day: {}, // Per memorizzare i dettagli del giorno
      dayNumber: 0, // Per tracciare il numero del giorno
      newPlace: "", // Per memorizzare un nuovo posto da aggiungere
      previewImages: [], // Per memorizzare le immagini di anteprima
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
      // Aggiorna i dettagli del giorno nel posto
      this.place.days[this.dayNumber] = this.day;

      // Salva il posto aggiornato nello store
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

<template>
  <div>
    <h2>Dettagli del Giorno {{ dayNumber + 1 }}</h2>
    <form @submit.prevent="saveDayDetails">
      <label>
        Descrizione:
        <textarea
          v-model="day.description"
          placeholder="Aggiungi una descrizione"
        ></textarea>
      </label>
      <label>
        Pranzo:
        <input v-model="day.lunch" placeholder="Cosa hai mangiato a pranzo?" />
      </label>
      <label>
        Cena:
        <input v-model="day.dinner" placeholder="Cosa hai mangiato a cena?" />
      </label>
      <label>
        Posti da Visitare:
        <input
          v-model="newPlace"
          placeholder="Aggiungi un posto da visitare"
          @keyup.enter="addPlace"
        />
        <button type="button" @click="addPlace">Aggiungi</button>
      </label>
      <ul>
        <li v-for="(place, index) in day.placesToVisit" :key="index">
          {{ place }}
          <button type="button" @click="removePlace(index)">Rimuovi</button>
        </li>
      </ul>
      <label>
        Immagini (Seleziona file):
        <input type="file" @change="handleImageUpload" multiple />
      </label>
      <div v-for="(image, index) in previewImages" :key="index">
        <img :src="image" alt="Immagine Anteprima" class="image-preview" />
      </div>
      <button type="submit">Salva</button>
    </form>
    <button @click="goBack">Torna indietro</button>
  </div>
</template>

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
  margin-bottom: 10px;
  padding: 10px;
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
