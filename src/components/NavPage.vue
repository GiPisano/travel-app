<template>
  <div class="container-nav">
    <div>
      Add place
      <span class="btn" @click="goToAddPlace"
        ><i class="fa-solid fa-plus"></i
      ></span>
    </div>
    <ul>
      <li v-for="place in places" :key="place.id">
        {{ place.name }}: {{ place.startDate }} to {{ place.endDate }}
        <button @click="removePlace(place)">Delete</button>
        <button @click="editPlace(place)">Edit</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { store } from "../store/store.js";

export default {
  computed: {
    places() {
      return store.places;
    },
  },
  methods: {
    goToAddPlace() {
      this.$router.push({ name: "AddPlace" });
    },
    removePlace(place) {
      store.removePlace(place);
    },
    editPlace(place) {
      this.$router.push({ name: "EditPlace", params: { id: place.id } });
    },
  },
};
</script>

<style scoped lang="scss">
.container-nav {
  margin: 20px;
  div {
    .btn {
      color: white;
      border: 1px solid white;
      padding: 3px 6px;
    }
  }
  ul {
    list-style: none;
    padding: 0;
    li {
      margin-bottom: 5px;
    }
  }
}
</style>
