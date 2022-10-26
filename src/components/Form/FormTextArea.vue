<template>
  <!-- eslint-disable vue/no-mutating-props -->
  <Textarea
    v-model='value'
    type='text'
    :autoResize='true'
    :rows='2'
    @input='$emit("input", $event)'
  />
</template>

<script>
import { ref } from 'vue'
import Textarea from 'primevue/textarea'

export default {
  name: 'FormTextArea',
  components: { Textarea },
  props: {
    initValue: {
      type: String,
      default: ''
    }
  },
  emits: ['input'],
  setup(props) {
    const value = ref(props.initValue)
    return { value }
  },
}
</script>

<style lang='scss' scoped>

</style>
