<template>
  <!-- eslint-disable vue/no-mutating-props -->
  <MultiSelect
    v-model='value'
    :options='options'
    display='chip'
    @change='$emit("input", $event)'
  />
</template>

<script>
import { ref } from 'vue'
import MultiSelect from 'primevue/multiselect'

export default {
  name: 'FormMultiSelect',
  components: { MultiSelect },
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
