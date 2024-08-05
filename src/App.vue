<script></script>

<template>
  <div class="container-app">
    <nav></nav>
    <main></main>
  </div>
</template>

<style lang="scss">
@use "./styles/general.scss";

body {
  background-color: black;
}

.container-app {
  margin: 30px;
  display: flex;
  gap: 1rem;
  nav {
    width: 30%;
    height: calc(100vh - 60px);
    border-radius: 2rem;
    background-color: rgb(43, 43, 43);
  }

  main {
    width: 70%;
    height: calc(100vh - 60px);
    border-radius: 2rem;
    background-color: rgb(43, 43, 43);
  }
}
</style>
