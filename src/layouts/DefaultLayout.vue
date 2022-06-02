<template>
  <main>
    <slot />
  </main>
</template>

<script>
export default {
  name: 'AppLayout'
}
</script>

<style lang="scss" scoped>
main {
  height: 100vh;
}
</style>
