<template>
  <div>
    <h2>Modifica Posto</h2>
    <form @submit.prevent="updatePlace">
      <input v-model="place.name" placeholder="Nome del posto" required />
      <input type="file" @change="handleFileChange" />
      <input v-model="place.startDate" type="date" required />
      <input v-model="place.endDate" type="date" required />
      <textarea
        v-model="place.description"
        placeholder="Descrizione"
        required
      ></textarea>
      <button type="submit">Salva Modifiche</button>
    </form>
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
      const originalPlace = store.places.find((p) => p.id === placeId);
      if (originalPlace) {
        this.place = JSON.parse(JSON.stringify(originalPlace)); // Copia profonda
      }
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.place.img = e.target.result;
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
</style>
