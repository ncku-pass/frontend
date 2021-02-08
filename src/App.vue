<template>
  <Navbar/>
  <router-view/>
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
  height: 100vh;
  background: rgb(255,255,255);
  background: linear-gradient(90deg, white 300px, $pink 300px);
}
</style>
