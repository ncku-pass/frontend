<template>
  <Navbar />
  <main>
    <router-view />
  </main>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'Home',
  components: {
    Navbar
  }
}
</script>

<style lang="scss">
@import "./scss/variables";

#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: rgb(255,255,255);
  background:
    url('./assets/bg_dot.svg') no-repeat,
    linear-gradient(90deg, white 300px, $pink 300px);
}

main {
  height: calc(100vh - #{$navbar-height});
}
</style>
