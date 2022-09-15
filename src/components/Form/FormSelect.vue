<template>
  <!-- eslint-disable vue/no-mutating-props -->
  <TreeSelect
    v-model='value'
    :styleClass='`no-btn`'
    :options='options'
    display='chip'
    selectionMode='single'
    @change='onChange($event)'
  />
</template>

<script>
import { ref } from 'vue'
import TreeSelect from 'primevue/treeselect'

export default {
  name: 'FormSelect',
  components: { TreeSelect },
  props: {
    initValue: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      required: true,
    }
  },
  emits: ['input'],
  setup(props, { emit }) {
    const value = ref(props.initValue === '' ? null : { [props.initValue]: true })

    const onChange = (evt) => {
      // evt is { selectedOpt: true }
      emit('input', { value: Object.keys(evt)[0] })
    }

    return { value, onChange }
  },
}
</script>
