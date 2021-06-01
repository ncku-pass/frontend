<template>
  <LayoutWrapper>
    <router-view v-slot="{ Component }">
      <keep-alive :include="['Portfolio']">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </LayoutWrapper>
</template>

<script>
import useGrab from '@/composables/useGrab'
import { watchEffect } from '@vue/runtime-core'
import LayoutWrapper from '@/layouts/LayoutWrapper.vue'

export default {
  name: 'Home',
  components: {
    LayoutWrapper
  },
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
@import './scss/variables';

#app {
  height: 100vh;
  background: $pink;
}
</style>
