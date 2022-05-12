<template>
  <div class='app-layout'>
    <Navbar />
    <main>
      <slot />
    </main>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'AppLayout',
  components: {
    Navbar
  }
}
</script>

<style scoped lang="scss">
.app-layout {
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
  main {
    overflow: auto;
  }
}
</style>
