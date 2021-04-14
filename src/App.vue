<template>
  <router-view />
</template>

<script>
export default {
  name: 'Home',
  components: {
  }
}
</script>

<style lang="scss">
@import "./scss/variables";

#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: $pink;
  // background:
  //   url('./assets/bg_dot.svg') no-repeat,
  //   linear-gradient(90deg, white 300px, $pink 300px);
}

main {
  height: calc(100vh - #{$navbar-height});
}
</style>
