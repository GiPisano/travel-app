<script>
import { store } from "../../../store/store.js";

export default {
  data() {
    return {
      id: null,
      name: "",
      startDate: "",
      endDate: "",
      description: "",
      img: null,
    };
  },
  created() {
    this.loadPlace();
  },

  watch: {
    // Osserva i cambiamenti nel parametro 'id' della route
    // Quando il parametro 'id' cambia, chiama il metodo 'loadPlace' per aggiornare i dati del posto
    "$route.params.id": "loadPlace",
  },
  methods: {
    loadPlace() {
      const placeId = parseInt(this.$route.params.id);
      const place = store.places.find((p) => p.id === placeId);
      if (place) {
        this.id = place.id;
        this.name = place.name;
        this.startDate = place.startDate;
        this.endDate = place.endDate;
        this.description = place.description;
        this.img = place.img;
      }
    },
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
    submitForm() {
      const updatedPlace = {
        id: this.id,
        name: this.name,
        startDate: this.startDate,
        endDate: this.endDate,
        description: this.description,
        img: this.img,
      };
      store.editPlace(updatedPlace);
      this.$router.push({
        name: "DetailPlace",
        params: { id: updatedPlace.id },
      });
    },
  },
};
</script>

<template>
  <div>
    <h2>Edit Place</h2>
    <form @submit.prevent="submitForm">
      <input v-model="name" placeholder="Name of the place" required />
      <input v-model="startDate" type="date" required />
      <input v-model="endDate" type="date" required />
      <input type="file" @change="handleFileChange" />
      <img
        :src="img"
        v-if="img"
        alt="Preview"
        style="max-width: 100%; margin-top: 10px"
      />
      <textarea
        v-model="description"
        placeholder="Description"
        required
      ></textarea>
      <button type="submit">Save Changes</button>
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
