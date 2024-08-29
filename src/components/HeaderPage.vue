<script></script>

<template>
  <div id="header">
    <router-link
      :to="{ name: 'home' }"
      class="nav-link home"
      :class="{ active: $route.name === 'home' }"
      >Home</router-link
    >
    <router-link
      :to="{ name: 'holiday' }"
      class="nav-link"
      :class="{ active: $route.name === 'holiday' }"
      >Holiday</router-link
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
  .home {
    display: none;
  }
}

@media screen and (max-width: 1400px) {
  #header {
    .home {
      display: block;
    }
  }
}
</style>
