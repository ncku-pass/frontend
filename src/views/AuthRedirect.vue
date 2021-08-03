<template>
  <div class="auth-redirect">
    redirecting...
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default {
  name: 'AuthRedirect',
  setup () {
    const router = useRouter()
    const route = useRoute()
    if (!route.query.param) {
      router.push('/')
      return
    }
    try {
      const { key, keyval } = JSON.parse(route.query.param)
      const store = useStore()
      const error = computed(() => store.state.auth.error)

      onMounted(async () => {
        await store.dispatch('auth/checkNCKULogin', { key, keyval })

        if (error.value) {
          router.push({ name: 'Landing' })
        } else {
          router.push({ name: 'Experience' })
        }
      })
    } catch (err) {
      router.push('/')
    }
  }
}
</script>
