<script>
import { store } from "../store/store";

export default {
  data() {
    return {
      places: store.places,
    };
  },
};
</script>

<template>
  <div id="header">
    <router-link
      :to="{ name: 'home' }"
      class="nav-link"
      :class="{ active: $route.name === 'home' }"
      >Home</router-link
    >

    <router-link
      v-if="this.places.length"
      :to="{ name: 'holiday' }"
      class="nav-link"
      :class="{ active: $route.name === 'holiday' }"
      >Holiday</router-link
    >

    <router-link
      v-if="this.places.length"
      :to="{ name: 'NavPage' }"
      class="nav-link go-to-nav"
      :class="{ active: $route.name === 'NavPage' }"
      >Nav</router-link
    >
  </div>
</template>

<style lang="scss" scoped>
#header {
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 20px;
  gap: 30px;
  background-color: rgb(38, 37, 37);
  border-radius: 2rem 0 2rem;
  width: max-content;
  div {
    cursor: pointer;
  }
  .active {
    color: orange;
  }

  .nav-link:hover {
    color: orange;
  }
}
@media screen and (min-width: 992px) {
  .go-to-nav {
    display: none;
  }
}
</style>
