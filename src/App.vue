<script>
import HeaderPage from "./components/HeaderPage.vue";
import NavPage from "./components/NavPage.vue";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import { store } from "./store/store";

export default {
  data() {
    return {
      places: store.places,
    };
  },

  components: {
    HeaderPage,
    NavPage,
  },
};
</script>

<template>
  <div class="container-app">
    <nav :style="this.places.length ? { width: '30%' } : { display: 'none' }">
      <nav-page></nav-page>
    </nav>
    <main>
      <header-page></header-page>
      <router-view></router-view>
    </main>
  </div>
</template>

<style lang="scss">
@use "./styles/general.scss";
@import url("https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/maps.css");

body {
  background-color: black;
  color: white;
}

.container-app {
  margin: 30px;
  display: flex;
  gap: 1rem;
  nav {
    width: 30%;
    height: calc(100vh - 60px);
    overflow: scroll;
    border-radius: 2rem;
    background-color: rgb(43, 43, 43);
  }

  main {
    width: 100%;
    height: calc(100vh - 60px);
    border-radius: 2rem;
    background-color: rgb(43, 43, 43);
    overflow: scroll;
  }
}

@media screen and (max-width: 992px) {
  body {
    background-color: blue;
  }
  nav {
    display: none;
  }
  main {
    width: 100%;
  }
}
</style>
