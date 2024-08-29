<script>
import HeaderPage from "./components/HeaderPage.vue";
import NavPage from "./components/NavPage.vue";

export default {
  data() {
    return {};
  },

  components: {
    HeaderPage,
    NavPage,
  },
};
</script>

<template>
  <div class="container-app">
    <nav>
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

  nav {
    display: none;
  }

  @media screen and (min-width: 1400px) {
    nav {
      display: block;
    }
    main {
      width: 70%;
    }
  }
}
</style>
