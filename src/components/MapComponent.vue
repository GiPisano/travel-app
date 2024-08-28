<template>
  <div>
    <div ref="mapElement" style="width: 100%; height: 500px"></div>
  </div>
</template>

<script>
import tt from "@tomtom-international/web-sdk-maps";
import ttServices from "@tomtom-international/web-sdk-services";

export default {
  data() {
    return {
      map: null,
      apiKey: import.meta.env.VITE_TOMTOM_API_KEY, // Assicurati che questa variabile sia correttamente definita nel file .env
      searchQuery: "", // Definisci la variabile searchQuery se è necessaria
    };
  },
  mounted() {
    this.initializeMap();

    // Assegna manualmente ttServices a tt.services se è undefined
    if (typeof tt.services === "undefined") {
      tt.services = ttServices.services;
    }

    console.log(tt);
    console.log(tt.services);
  },
  methods: {
    initializeMap() {
      this.map = tt.map({
        key: this.apiKey,
        container: this.$refs.mapElement,
        center: [0, 0],
        zoom: 10,
      });
    },
    searchPlace(query) {
      if (!query) {
        console.error("Query is empty or invalid");
        return;
      }

      tt.services
        .fuzzySearch({
          key: this.apiKey,
          query: query,
        })
        .then((response) => {
          const results = response.results;
          if (results && results.length > 0) {
            const position = results[0].position;

            // Verifica se le coordinate sono valide
            if (
              position &&
              typeof position.lng === "number" &&
              typeof position.lat === "number"
            ) {
              this.map.setCenter([position.lng, position.lat]); // Usa lng e lat
              this.$emit("update-suggestions", results);
            } else {
              console.error(
                "Invalid coordinates received from geocoding service"
              );
            }
          } else {
            console.error("No results found for query:", query);
          }
        })
        .catch((error) => {
          console.error("Error during geocoding:", error);
        });
    },
  },
  watch: {
    searchQuery(newQuery) {
      this.searchPlace(newQuery);
    },
  },
};
</script>

<style scoped>
/* Assicurati che la mappa abbia uno spazio sufficiente per visualizzarsi */
</style>
