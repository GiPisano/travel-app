<script>
import { store } from "../../../store/store.js";
import Carousel from "../../Carousel.vue";

export default {
  data() {
    return {
      day: null,
      dayNumber: null,
    };
  },
  created() {
    this.loadDayDetails();
  },
  components: {
    Carousel,
  },
  methods: {
    loadDayDetails() {
      const placeId = parseInt(this.$route.params.id);
      const dayNumber = parseInt(this.$route.params.day);
      const place = store.places.find((p) => p.id === placeId);

      if (place && place.days && place.days[dayNumber]) {
        this.day = place.days[dayNumber];
        this.dayNumber = dayNumber;
      } else {
        this.day = {
          date: new Date().toISOString().split("T")[0],
          description: "",
          lunch: "",
          dinner: "",
          placesToVisit: [],
          images: [],
        };
        this.dayNumber = dayNumber;
      }
    },
    editDay() {
      this.$router.push({
        name: "FormDay",
        params: { id: this.$route.params.id, day: this.dayNumber },
      });
    },
    backToPlace() {
      this.$router.push({
        name: "DetailPlace",
        params: { id: this.$route.params.id },
      });
    },
  },
};
</script>

<template>
  <div class="detail-day-container">
    <div class="day-info-card" v-if="day">
      <h2>Dettagli del Giorno {{ dayNumber + 1 }}</h2>

      <p v-if="day.description" class="description">
        {{ day.description }}
      </p>
      <p v-else class="no-description">Nessuna descrizione disponibile.</p>

      <div class="activities-section">
        <h3>Pranzo:</h3>
        <p v-if="day.lunch">{{ day.lunch }}</p>
        <p v-else>Nessun dettaglio pranzo disponibile.</p>

        <h3>Cena:</h3>
        <p v-if="day.dinner">{{ day.dinner }}</p>
        <p v-else>Nessun dettaglio cena disponibile.</p>
      </div>

      <div class="places-section">
        <h3>Posti da Visitare:</h3>
        <ul>
          <li v-for="(place, index) in day.placesToVisit || []" :key="index">
            {{ place }}
          </li>
        </ul>
        <p v-if="!(day.placesToVisit && day.placesToVisit.length)">
          Nessun posto da visitare disponibile.
        </p>
      </div>

      <div class="images-section">
        <h3>Immagini:</h3>
        <div v-if="day.images && day.images.length">
          <Carousel :images="day.images" />
        </div>
        <p v-else>Nessuna immagine disponibile.</p>
      </div>

      <div class="actions">
        <button class="edit-button" @click="editDay">Modifica</button>
        <button class="back-button" @click="backToPlace">
          Torna al Dettaglio del Luogo
        </button>
      </div>
    </div>
    <div v-else>Caricamento in corso...</div>
  </div>
</template>

<style scoped lang="scss">
.detail-day-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.day-info-card {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 10px;
  color: #333;
}

.description,
.no-description {
  margin-bottom: 20px;
  font-size: 16px;
  line-height: 1.5;
  color: #555;
}

.no-description {
  color: #999;
}

.activities-section,
.places-section,
.images-section {
  margin-bottom: 20px;
  color: black;
}

h3 {
  margin-bottom: 10px;
  color: #007bff;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  font-size: 16px;
  color: #555;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  button {
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
    border: none;
    transition: background-color 0.3s ease;

    &.edit-button {
      background-color: #28a745;
      color: #fff;

      &:hover {
        background-color: #218838;
      }
    }

    &.back-button {
      background-color: #007bff;
      color: #fff;

      &:hover {
        background-color: #0056b3;
      }
    }
  }
}
</style>
