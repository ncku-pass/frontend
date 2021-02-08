<template>
  <nav class="navbar">
    <h1 class="navbar__brand">
      <a href="./" class="navbar__brand__link">E-protfolio</a>
    </h1>
    <ul class="navbar__links">
      <li>
        <router-link class="navbar__links__link" to="/">學習歷程</router-link>
      </li>
      <li>
        <router-link class="navbar__links__link" to="./protfolio">Protfolio</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {

}
</script>

<style lang="scss">
@import "../scss/variables";

.navbar {
  height: $navbar-height;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  background-color: #fff;
  z-index: 10;
}

.navbar__brand {
  margin: 0;
  &__link {
    display: block;
    height: 32px;
    width: 160px;
    background-image: url('../assets/brand_icon.svg');
    text-indent: 101%;
    overflow: hidden;
  }
}

.navbar__links {
  display: grid;
  margin: 0;
  padding: 0;
  grid-auto-flow: column;
  gap: 0 10px;
  list-style: none;
  &__link {
    display: block;
    padding: 8px 24px;
    text-decoration: none;
    color: $gray-4;
    letter-spacing: 0.05em;
    font-weight: $weight-medium;
  }
}

.router-link-active {
  color: $gray-1;
  box-shadow: 0px 3px 0px #F15A60;
}
</style>
