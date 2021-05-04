<template>
  <router-view v-slot="{ Component }">
    <keep-alive :exclude="['Landing']">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script>
import useGrab from '@/composables/useGrab'
import { watchEffect } from '@vue/runtime-core'

export default {
  name: 'Home',
  setup () {
    const { isGrabbing } = useGrab()
    watchEffect(() => {
      if (isGrabbing.value) {
        document.documentElement.classList.add('draggable-cursor')
      } else {
        document.documentElement.classList.remove('draggable-cursor')
      }
    })
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
}

main {
  height: calc(100vh - #{$navbar-height});
}
</style>
