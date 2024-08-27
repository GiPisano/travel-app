<template>
  <div>
    <h2>{{ place.name }}</h2>
    <img :src="place.img" alt="Immagine del Posto" />
    <p>{{ place.description }}</p>

    <div v-if="place.days.length">
      <h3>Giorni:</h3>
      <ul>
        <li
          v-for="(day, index) in place.days"
          :key="index"
          @click="handleDayClick(index)"
        >
          {{ `Giorno ${index + 1}: ${day.date}` }}
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Nessun giorno disponibile</p>
    </div>
  </div>
</template>

<script>
import { store } from "../../../store/store.js";

export default {
  data() {
    return {
      place: {},
    };
  },
  created() {
    this.loadPlace();
  },
  methods: {
    loadPlace() {
      const placeId = parseInt(this.$route.params.id);
      const storedPlace = store.places.find((p) => p.id === placeId);
      if (storedPlace) {
        this.place = storedPlace;
      }
    },
    handleDayClick(dayIndex) {
      const dayDetails = this.place.days[dayIndex];
      const dayHasDetails =
        dayDetails.description ||
        dayDetails.lunch ||
        dayDetails.dinner ||
        dayDetails.placesToVisit?.length ||
        dayDetails.images?.length;

      this.$router.push({
        name: dayHasDetails ? "DetailDay" : "FormDay",
        params: { id: this.place.id, day: dayIndex },
      });
    },
  },
};
</script>

<style>
img {
  max-width: 100%;
  height: auto;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
}
li:hover {
  background-color: #e0e0e0;
}
</style>
