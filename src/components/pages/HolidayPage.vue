<script>
import { store } from "../../store/store.js";

export default {
  data() {
    return {
      place: {
        id: "",
        name: "",
        description: "",
        startDate: "",
        endDate: "",
      },
      daysDifference: null,
    };
  },
  created() {
    const placeId = this.$route.params.placeId;
    const place = store.places.find((place) => place.id === placeId);
    if (place) {
      this.place = { ...place };
      this.calculateDays();
    }
  },
  methods: {
    handleSubmit() {
      const index = store.places.findIndex((p) => p.id === this.place.id);
      if (index > -1) {
        store.places.splice(index, 1, this.place);
        localStorage.setItem("places", JSON.stringify(store.places));
      }
      this.$router.push({ name: "Home" });
    },
    calculateDays() {
      if (this.place.startDate && this.place.endDate) {
        const start = new Date(this.place.startDate);
        const end = new Date(this.place.endDate);
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
  <div class="edit-place" v-if="this.place">
    <h2>Edit Place</h2>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="place-name">Place Name:</label>
        <input
          type="text"
          v-model="place.name"
          id="place-name"
          name="placeName"
          required
        />
      </div>
      <div>
        <label for="description">Description:</label>
        <textarea
          v-model="place.description"
          id="description"
          name="description"
          required
        ></textarea>
      </div>
      <div>
        <label for="start-date">Start Date:</label>
        <input
          type="date"
          v-model="place.startDate"
          id="start-date"
          name="startDate"
          required
        />
      </div>
      <div>
        <label for="end-date">End Date:</label>
        <input
          type="date"
          v-model="place.endDate"
          id="end-date"
          name="endDate"
          required
          @change="calculateDays"
        />
      </div>
      <div v-if="daysDifference !== null">
        <p>Number of days: {{ daysDifference }}</p>
      </div>
      <button type="submit">Save</button>
    </form>
  </div>

  <div v-for="day in daysDifference">
    <div class="circle">day {{ day }}</div>
  </div>
</template>

<style scoped lang="scss">
.edit-place {
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
