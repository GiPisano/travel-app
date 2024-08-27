// store.js
import { reactive } from "vue";

// Inizializzazione dello store reattivo
export const store = reactive({
  // Carica i posti dal localStorage se disponibili, altrimenti inizializza un array vuoto
  places: JSON.parse(localStorage.getItem("places")) || [],

  /**
   * Aggiunge un nuovo posto all'array dei posti e salva l'array aggiornato nel localStorage.
   * @param {Object} place - Il nuovo posto da aggiungere.
   */
  addPlace(place) {
    this.places.push(place); // Aggiungi il nuovo posto all'array
    this.savePlaces(); // Salva l'array aggiornato nel localStorage
  },

  /**
   * Aggiorna un posto esistente nell'array dei posti e salva l'array aggiornato nel localStorage.
   * @param {Object} updatedPlace - Il posto aggiornato da salvare.
   */
  updatePlace(updatedPlace) {
    const index = this.places.findIndex((p) => p.id === updatedPlace.id);
    if (index !== -1) {
      this.places[index] = updatedPlace; // Aggiorna il posto esistente
      this.savePlaces(); // Salva l'array aggiornato nel localStorage
    }
  },

  /**
   * Rimuove un posto dall'array dei posti e salva l'array aggiornato nel localStorage.
   * @param {Object} placeToRemove - Il posto da rimuovere.
   */
  removePlace(placeToRemove) {
    const index = this.places.findIndex(
      (place) => place.id === placeToRemove.id
    );
    if (index > -1) {
      this.places.splice(index, 1); // Rimuove il posto dall'array
      this.savePlaces(); // Salva l'array aggiornato nel localStorage
    }
  },

  /**
   * Salva l'array dei posti nel localStorage.
   */
  savePlaces() {
    try {
      localStorage.setItem("places", JSON.stringify(this.places)); // Salva l'array come JSON nel localStorage
    } catch (error) {
      console.error("Errore durante il salvataggio nel localStorage:", error);
    }
  },
});
