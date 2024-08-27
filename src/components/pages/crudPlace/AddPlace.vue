<script>
import { store } from "../../../store/store.js";

export default {
  data() {
    return {
      name: "",
      img: null,
      startDate: "",
      endDate: "",
      description: "",
    };
  },
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

<template>
  <div>
    <h2>Aggiungi un Nuovo Posto</h2>
    <form @submit.prevent="submitForm">
      <input v-model="name" placeholder="Nome del posto" required />
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
