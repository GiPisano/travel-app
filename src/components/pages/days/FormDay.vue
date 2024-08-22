<script>
import { store } from "../../../store/store.js";

export default {
  props: ["id", "day"],
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
      this.place = store.places.find((p) => p.id === parseInt(this.id));
    },
  },
};
</script>

<template>
  <div>
    <h2>Organize day {{ day }} in {{ place.name }}</h2>
    <!-- Form per aggiungere o modificare eventi per il giorno selezionato -->
  </div>
</template>

<style lang="scss" scoped></style>
