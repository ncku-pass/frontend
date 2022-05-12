<template>
  <component :is='layout'>
    <slot />
  </component>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from './DefaultLayout.vue'
import AppLayout from './AppLayout.vue'

export default {
  name: 'LayoutWrapper',
  components: {
    DefaultLayout,
    AppLayout
  },
  setup() {
    const route = useRoute()

    const layout = computed(() => {
      return route.meta.layout || 'DefaultLayout'
    })

    return { layout }
  }
}
</script>
