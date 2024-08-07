<script>
import { store } from "../../store/store.js";

export default {
  data() {
    return {
      places: store.places,
    };
  },
};
</script>
<template>
  <div v-for="place in places">
    {{ place.name }}
  </div>
</template>
<style lang="scss" scoped></style>
