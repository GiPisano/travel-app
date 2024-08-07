<script>
import { store } from "../../store/store.js";

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
    submitForm() {
      const newPlace = {
        id: Date.now(),
        name: this.name,
        img: this.img,
        startDate: this.startDate,
        endDate: this.endDate,
        description: this.description,
      };
      store.addPlace(newPlace);
      this.$router.push("/");
    },
  },
};
</script>

<template>
  <div>
    <h2>Add a New Place</h2>
    <form @submit.prevent="submitForm">
      <input v-model="name" placeholder="Name of the place" required />
      <input type="file" @change="handleFileChange" />
      <input v-model="startDate" type="date" required />
      <input v-model="endDate" type="date" required />
      <textarea
        v-model="description"
        placeholder="Description"
        required
      ></textarea>
      <button type="submit">Add Place</button>
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
