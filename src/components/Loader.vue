<template>
  <div v-if='loading' class='loader'>
    <Pencil color='#5D141F' size='60px' />
    <p>Loading...</p>
  </div>
</template>

<script>
import { Pencil } from 'vue-loading-spinner'

export default {
  name: 'Loader',
  components: {
    Pencil
  },
  props: {
    loading: {
      type: Boolean,
      required: true,
    }
  }
}
</script>

<style lang='scss' scoped>
.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  p {
    margin-top: 20px;
  }
}
</style>
