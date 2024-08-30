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
    <div class="form-controls">
      <button @click="backToPlace" class="back-button">
        Back to Place Details
      </button>
    </div>
    <div class="day-info">
      <h2>Details for Day {{ dayNumber + 1 }}</h2>

      <p v-if="day.description" class="description">
        {{ day.description }}
      </p>
      <p v-else class="no-description">No description available.</p>

      <div class="activities-section">
        <h3>Lunch:</h3>
        <p v-if="day.lunch">{{ day.lunch }}</p>
        <p v-else>No lunch details available.</p>

        <h3>Dinner:</h3>
        <p v-if="day.dinner">{{ day.dinner }}</p>
        <p v-else>No dinner details available.</p>
      </div>

      <div class="places-section">
        <h3>Places to Visit:</h3>
        <ul class="places-list">
          <li v-for="(place, index) in day.placesToVisit || []" :key="index">
            <strong>Place {{ index + 1 }}:</strong> {{ place }}
          </li>
        </ul>
        <p v-if="!(day.placesToVisit && day.placesToVisit.length)">
          No places to visit available.
        </p>
      </div>

      <div class="images-section">
        <h3>Images:</h3>
        <div v-if="day.images && day.images.length">
          <Carousel :images="day.images" />
        </div>
        <p v-else>No images available.</p>
      </div>

      <div class="actions">
        <button class="edit-button" @click="editDay">Edit</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.detail-day-container {
  padding: 20px;

  color: #fff; /* White text for contrast */
}

.form-controls {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;

  .back-button {
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    background-color: #6c757d; /* Secondary color */
    color: #fff;
    transition: background-color 0.3s;

    &:hover {
      background-color: #5a6268; /* Darker shade for hover effect */
    }
  }
}

.day-info {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background-color: transparent; /* No card effect, transparent background */
  border-radius: 0;
  box-shadow: none; /* No shadow */
}

h2 {
  font-size: 24px;
  color: #fff;
}

.description,
.no-description {
  font-size: 16px;
  line-height: 1.5;
  color: #ddd;
}

.no-description {
  color: #aaa;
}

.activities-section,
.places-section,
.images-section {
  color: #ddd;
}

h3 {
  margin-bottom: 10px;
  color: #007bff; /* Primary color */
}

.places-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 5px;

  li {
    font-size: 16px;
    color: #ddd;
    padding: 10px;
    border: 1px solid white;
    &:hover {
      background-color: white;
      color: black;
    }
  }
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
      background-color: #28a745; /* Success color */
      color: #fff;

      &:hover {
        background-color: #218838; /* Darker shade for hover effect */
      }
    }

    &.submit-button {
      background-color: #007bff; /* Primary color */
      color: #fff;

      &:hover {
        background-color: #0056b3; /* Darker shade for hover effect */
      }
    }
  }
}
</style>
