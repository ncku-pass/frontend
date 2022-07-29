<template>
  <LayoutWrapper>
    <router-view v-slot='{ Component }'>
      <keep-alive :include='["Portfolio", "Experience"]'>
        <component :is='Component' />
      </keep-alive>
    </router-view>
  </LayoutWrapper>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import useGrab from '@/composables/useGrab'
import { watch, watchEffect } from '@vue/runtime-core'
import LayoutWrapper from '@/layouts/LayoutWrapper.vue'

export default {
  name: 'Home',
  components: {
    LayoutWrapper
  },
  setup() {
    const store = useStore()
    const tokenStr = computed(() => store.state.auth.tokenStr)

    watch(tokenStr, () => {
      if (tokenStr.value) {
        store.dispatch('tags/initTags')
        store.dispatch('experiences/initExperiences')
        store.dispatch('resumes/initResumes')
      }
    }, { immediate: true })

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
  background: $red-1;
}
</style>
