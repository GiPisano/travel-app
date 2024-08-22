<script>
import { store } from "../../store/store.js";

export default {
  data() {
    return {
      places: store.places,
    };
  },
  methods: {
    viewDetails(place) {
      this.$router.push({ name: "DetailPlace", params: { id: place.id } });
    },
  },
};
</script>
<template>
  <div class="row m-2 g-5">
    <div v-for="place in places" class="col-md-3">
      <div class="container-place" @click="viewDetails(place)">
        <div class="circle">
          <img :src="place.img" alt="Preview" />
          <div class="name">{{ place.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.container-place {
  cursor: pointer;
  .circle {
    width: 150px;
    height: 150px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  .name {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
