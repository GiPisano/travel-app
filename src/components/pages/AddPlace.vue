<script>
import { store } from "../../store/store.js";

export default {
  name: "AddPlace",
  data() {
    return {
      placeName: "",
      description: "",
      startDate: "",
      endDate: "",
      daysDifference: null,
    };
  },
  methods: {
    handleSubmit() {
      const newPlace = {
        name: this.placeName,
        description: this.description,
        startDate: this.startDate,
        endDate: this.endDate,
        daysDifference: this.daysDifference,
      };

      store.addPlace(newPlace);

      this.placeName = "";
      this.description = "";
      this.startDate = "";
      this.endDate = "";
      this.daysDifference = null;

      this.$router.push({ name: "Home" });
    },
    calculateDays() {
      if (this.startDate && this.endDate) {
        const start = new Date(this.startDate);
        const end = new Date(this.endDate);
        const difference = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        this.daysDifference = difference;
      } else {
        this.daysDifference = null;
      }
    },
  },
};
</script>

<template>
  <div class="add-place">
    <h2>Add Place Form</h2>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="place-name">Place Name:</label>
        <input
          type="text"
          v-model="placeName"
          id="place-name"
          name="placeName"
          required
        />
      </div>
      <div>
        <label for="description">Description:</label>
        <textarea
          v-model="description"
          id="description"
          name="description"
          required
        ></textarea>
      </div>
      <div>
        <label for="start-date">Start Date:</label>
        <input
          type="date"
          v-model="startDate"
          id="start-date"
          name="startDate"
          required
        />
      </div>
      <div>
        <label for="end-date">End Date:</label>
        <input
          type="date"
          v-model="endDate"
          id="end-date"
          name="endDate"
          required
          @change="calculateDays"
        />
      </div>
      <div v-if="daysDifference !== null">
        <p>Number of days: {{ daysDifference }}</p>
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<style scoped lang="scss">
.add-place {
  margin: 20px;
  form {
    display: flex;
    flex-direction: column;
    div {
      margin-bottom: 10px;
    }
    button {
      align-self: flex-start;
      padding: 5px 10px;
    }
  }
}
</style>
