<template>
  <!-- eslint-disable vue/no-mutating-props -->
  <InputNumber v-model='value' mode='decimal' @input='$emit("input", $event)' />
</template>

<script>
import { ref } from 'vue'
import InputNumber from 'primevue/inputnumber'

export default {
  name: 'FormInputNumber',
  components: { InputNumber },
  props: {
    initValue: {
      type: [String, Number],
      default: ''
    }
  },
  emits: ['input'],
  setup(props) {
    const value = ref(props.initValue === '' ? null : parseInt(props.initValue))
    return { value }
  },
}
</script>

<style lang='scss' scoped>

</style>
