<template>
  <div class='app-layout'>
    <MobileNavbar v-if='device === "mobile"' />
    <Navbar v-else />
    <main>
      <slot />
    </main>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar/Navbar'
import MobileNavbar from '@/components/Navbar/MobileNavbar'

export default {
  name: 'AppLayout',
  components: {
    MobileNavbar,
    Navbar
  },
  inject: ['mq'],
  computed: {
    device() {
      return this.mq.current
    }
  }
}
</script>

<style lang="scss" scoped>
.app-layout {
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
  main {
    overflow: auto;
  }
}
</style>
