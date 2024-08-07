<script>
import { store } from "../../store/store.js";

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
