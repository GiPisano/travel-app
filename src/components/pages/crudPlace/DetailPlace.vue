<script>
import { store } from "../../../store/store.js";

export default {
  data() {
    return {
      place: null,
    };
  },
  created() {
    this.loadPlace();
  },
  methods: {
    loadPlace() {
      const placeId = parseInt(this.$route.params.id);
      this.place = store.places.find((p) => p.id === placeId);
    },

    getDays() {
      if (!this.place || !this.place.startDate || !this.place.endDate)
        return [];

      const startDate = new Date(this.place.startDate);
      const endDate = new Date(this.place.endDate);
      const days = [];

      let dayCount = 1;
      for (
        let date = new Date(startDate);
        date <= endDate;
        date.setDate(date.getDate() + 1)
      ) {
        const formattedDate = date.toISOString().split("T")[0];
        days.push({
          label: `${dayCount}`,
          date: formattedDate,
        });
        dayCount++;
      }

      return days;
    },
    handleDayClick(day) {
      console.log("Giorno selezionato:", day);
    },
  },
};
</script>

<template>
  <div v-if="place">
    <div class="container-detail">
      <div class="circle">
        <img :src="place.img" alt="Preview" />
      </div>
      <div class="details">
        <h2>{{ place.name }}</h2>
        <p><strong>Start Date:</strong> {{ place.startDate }}</p>
        <p><strong>End Date:</strong> {{ place.endDate }}</p>
        <p><strong>Description:</strong> {{ place.description }}</p>
      </div>
    </div>
    <div class="container">
      <div class="days-container">
        <div>
          <div class="row g-3">
            <div
              class="col-3"
              @click="handleDayClick(day)"
              :key="day"
              v-for="day in getDays()"
            >
              <div class="card">
                <div class="card-header">DAY: {{ day.label }}</div>
                <div class="card-body">{{ day.date }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container-detail {
  display: flex;
  align-items: center;
  margin: 2rem;
  .circle {
    width: 150px;
    height: 150px;
    margin-right: 2rem;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .details {
    h2 {
      margin: 0 0 1rem;
    }
    p {
      margin: 0.5rem 0;
    }
  }
}
</style>
