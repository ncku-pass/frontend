<template>
  <nav class="navbar">
    <h1 class="navbar__brand">
      <a href="/" class="navbar__brand__link">E-protfolio</a>
    </h1>
    <ul class="navbar__links">
      <li>
        <router-link class="navbar__links__link" :to="{name: 'Experience'}">學習歷程</router-link>
      </li>
      <li>
        <router-link class="navbar__links__link" :to="{name: 'Protfolio'}">Protfolio</router-link>
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
@import "../scss/mixins";

.navbar {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: $navbar-height;
  padding: 2px 24px 0;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  background-color: #fff;
  z-index: 10;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background-color: $red;
  }
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
  @include grid(column, 0, 10px);
  margin: 0;
  padding: 0;
  list-style: none;
  &__link {
    @include tab-link;
  }
}
</style>
