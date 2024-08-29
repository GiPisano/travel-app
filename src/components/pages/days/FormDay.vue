<script>
import Carousel from "../../Carousel.vue";

import { store } from "../../../store/store.js";

export default {
  components: {
    Carousel,
  },
  data() {
    return {
      place: {},
      day: {},
      dayNumber: 0,
      newPlace: "",
      previewImages: [],
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
      this.place.days[this.dayNumber] = this.day;

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
  <div class="container">
    <h2>Details for Day {{ dayNumber + 1 }}</h2>
    <div class="form-controls">
      <button @click="goBack" class="back-button">Go Back</button>
    </div>
    <form @submit.prevent="saveDayDetails" class="day-form">
      <div class="form-group">
        <label for="description">Description:</label>
        <textarea
          id="description"
          v-model="day.description"
          placeholder="Add a description"
        ></textarea>
      </div>
      <div class="form-group">
        <label for="lunch">Lunch:</label>
        <input
          id="lunch"
          v-model="day.lunch"
          placeholder="Where are you going for lunch?"
        />
      </div>
      <div class="form-group">
        <label for="dinner">Dinner:</label>
        <input
          id="dinner"
          v-model="day.dinner"
          placeholder="Where are you going for dinner?"
        />
      </div>
      <div class="form-group">
        <label>Places to Visit:</label>
        <div class="places-input">
          <input
            v-model="newPlace"
            placeholder="Add a place to visit"
            @keyup.enter="addPlace"
          />
          <button type="button" @click="addPlace" class="add-button">
            Add
          </button>
        </div>
        <ul class="places-list">
          <li v-for="(place, index) in day.placesToVisit" :key="index">
            {{ place }}
            <button
              type="button"
              @click="removePlace(index)"
              class="remove-button"
            >
              Remove
            </button>
          </li>
        </ul>
      </div>
      <div class="form-group">
        <label for="imageUpload">Images (Select files):</label>
        <input
          id="imageUpload"
          type="file"
          @change="handleImageUpload"
          multiple
        />
      </div>
      <Carousel :images="previewImages" class="carousel" />
      <button type="submit" class="submit-button">Save</button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;

  h2 {
    margin-bottom: 20px;
    font-size: 24px;
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
      background-color: #6c757d;
      color: #fff;
      transition: background-color 0.3s;

      &:hover {
        background-color: #5a6268;
      }
    }
  }

  .day-form {
    display: flex;
    flex-direction: column;
    gap: 20px;

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 10px;

      label {
        font-weight: bold;
        margin-bottom: 5px;
      }

      input,
      textarea {
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 16px;
        width: 100%;
      }

      textarea {
        resize: vertical;
      }

      input[type="file"] {
        padding: 0;
      }

      .places-input {
        display: flex;
        gap: 10px;
        align-items: center;

        input {
          flex: 1;
        }

        .add-button {
          padding: 8px 12px;
          border: none;
          background-color: #007bff;
          color: #fff;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
          transition: background-color 0.3s;

          &:hover {
            background-color: #0056b3;
          }
        }
      }

      .places-list {
        list-style-type: none;
        padding: 0;
        margin: 0;

        li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px;
          border-bottom: 1px solid #ddd;

          &:last-child {
            border-bottom: none;
          }
        }

        .remove-button {
          padding: 5px 10px;
          border: none;
          background-color: #dc3545;
          color: #fff;
          border-radius: 5px;
          cursor: pointer;
          font-size: 14px;
          transition: background-color 0.3s;

          &:hover {
            background-color: #c82333;
          }
        }
      }
    }

    .carousel {
      margin-top: 20px;
    }

    .submit-button {
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
      background-color: #28a745; /* Success color */
      color: #fff;
      transition: background-color 0.3s;

      &:hover {
        background-color: #218838; /* Darker shade for hover effect */
      }
    }
  }
}
</style>
