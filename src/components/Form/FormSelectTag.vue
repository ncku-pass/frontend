<template>
  <!-- eslint-disable vue/no-mutating-props -->
  <Dropdown
    v-model='value'
    :options='options'
    :filter='true'
    :editable='true'
    placeholder='建立一個新的tag...'
    display='chip'
    @change='$emit("input", $event)'
  />
</template>

<script>
import { ref } from 'vue'
import Dropdown from 'primevue/dropdown'

export default {
  name: 'FormSelectTag',
  components: { Dropdown },
  props: {
    initValue: {
      type: Array,
      default() {
        return []
      }
    },
    options: {
      type: Array,
      required: true,
    }
  },
  emits: ['input'],
  setup(props) {
    const value = ref(props.initValue)
    return { value }
  },
}
</script>
