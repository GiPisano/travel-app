<script>
import { store } from "../../../store/store.js";
import MapComponent from "../../MapComponent.vue";

export default {
  data() {
    return {
      place: {},
    };
  },
  components: {
    MapComponent,
  },
  created() {
    this.loadPlace();
  },
  computed: {
    getDayDetailText() {
      return (dayIndex) => {
        const dayDetails = this.place.days[dayIndex];
        const dayHasDetails =
          dayDetails.description ||
          dayDetails.lunch ||
          dayDetails.dinner ||
          dayDetails.placesToVisit?.length ||
          dayDetails.images?.length;

        return dayHasDetails ? "Detail Available" : "Add Detail";
      };
    },
    isDayPast() {
      return (dayIndex) => {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1); // Imposta la data a ieri
        const dayDate = new Date(this.place.days[dayIndex].date);
        // Considera passato solo se il giorno è inferiore a ieri
        return dayDate < yesterday;
      };
    },
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

      if (this.isDayPast(dayIndex)) {
        this.$router.push({
          name: "DetailDay",
          params: { id: this.place.id, day: dayIndex },
        });
      } else {
        this.$router.push({
          name: dayHasDetails ? "DetailDay" : "FormDay",
          params: { id: this.place.id, day: dayIndex },
        });
      }
    },
  },
  watch: {
    "place.name"(newName) {
      if (newName) {
        this.$nextTick(() => {
          if (this.$refs.mapComponent) {
            this.$refs.mapComponent.searchPlace(newName);
          }
        });
      }
    },
  },
};
</script>

<template>
  <div class="place-detail">
    <h2 class="place-title">{{ place.name }}</h2>
    <div class="place-content row">
      <div class="place-image-container col-md-6">
        <img :src="place.img" alt="Place Image" class="place-image" />
      </div>
      <div class="map-container col-md-6">
        <MapComponent :searchQuery="place.name" ref="mapComponent" />
      </div>
    </div>

    <p class="place-description">{{ place.description }}</p>

    <div v-if="place.days.length" class="days-list">
      <h3>Days:</h3>
      <ul>
        <li
          v-for="(day, index) in place.days"
          :key="index"
          @click="handleDayClick(index)"
          :class="{ 'day-item': true, 'day-past': isDayPast(index) }"
        >
          {{ `Day ${index + 1}: ${day.date}` }} - {{ getDayDetailText(index) }}
        </li>
      </ul>
    </div>
    <div v-else class="no-days">
      <p>No days available</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.place-detail {
  padding: 20px;
  .place-title {
    font-size: 28px;
    margin-bottom: 20px;
  }

  .place-content {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;

    .place-image-container {
      flex: 1;

      .place-image {
        width: 100%;
        height: 378px;
        object-fit: cover;
        border-radius: 8px;
      }
    }
  }

  .place-description {
    margin-top: 20px;
    font-size: 16px;
  }

  .days-list {
    margin-top: 20px;

    h3 {
      margin-bottom: 10px;
      font-size: 20px;
      color: #007bff;
    }

    ul {
      list-style-type: none;
      padding: 0;
      margin: 0;

      .day-item {
        padding: 15px;
        margin-bottom: 10px;
        border: 1px solid #ddd;
        border-radius: 8px;
        cursor: pointer;

        transition: background-color 0.3s, color 0.3s;

        &:hover {
          background-color: #007bff;
          color: #fff;
        }

        &.day-past {
          background-color: #f8d7da;
          border-color: #f5c6cb;
          color: #721c24;

          &:hover {
            background-color: #f5c6cb;
            color: #721c24;
          }
        }
      }
    }
  }

  .no-days {
    margin-top: 20px;
    font-size: 16px;
    color: #999;
  }
}
</style>
