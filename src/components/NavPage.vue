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
    deletePlace(place) {
      store.removePlace(place);

      if (store.places.length > 0) {
        this.$router.push({ name: "holiday" });
      } else {
        this.$router.push({ name: "home" });
      }
    },
    editPlace(place) {
      this.$router.push({ name: "EditPlace", params: { id: place.id } });
    },
  },
};
</script>

<template>
  <div class="container-nav">
    <div>
      Add place
      <span class="btn" @click="goToAddPlace"
        ><i class="fa-solid fa-plus"></i
      ></span>
    </div>
    <div>
      <div class="box-place">
        <div v-for="place in places" :key="place.id" class="container-place">
          <div class="circle">
            <img :src="place.img" alt="Preview" />
          </div>
          <div class="details">
            <p>WERE: {{ place.name }}</p>
            <p>START: {{ place.startDate }}</p>
            <p>END: {{ place.endDate }}</p>
          </div>
          <div class="buttons-utility">
            <button @click="editPlace(place)" class="pen">
              <i class="fa-regular fa-pen-to-square"></i>
            </button>
            <button @click="deletePlace(place)" class="trash">
              <i class="fa-regular fa-trash-can"></i>
            </button>
          </div>
          <hr class="white" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.box-place {
  .container-place {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
}

.container-nav {
  margin: 20px;
  .btn {
    color: white;
  }
  .btn:hover {
    border: 1px solid white;
  }
  div {
    .buttons-utility {
      display: flex;

      justify-content: end;
      flex-direction: column;
      gap: 0.5rem;

      button {
        background-color: white;
        color: black;
        padding: 4px 8px;
        border-radius: 20px;
      }

      .pen:hover {
        background-color: green;
        color: white;
      }

      .trash:hover {
        background-color: red;
        color: white;
      }
    }
  }
}
.circle {
  width: 100px;
  height: 100px;
  margin: 0 auto;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
p {
  margin: 0;
}

.white {
  color: white;
}
</style>
