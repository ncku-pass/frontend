<template>
  <!-- eslint-disable vue/no-mutating-props -->
  <InputText v-model='value' type='text' @input='$emit("input", $event)' />
</template>

<script>
import { ref } from 'vue'
import InputText from 'primevue/inputtext'

export default {
  name: 'FromInputText',
  components: { InputText },
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
