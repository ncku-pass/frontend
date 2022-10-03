<template>
  <!-- eslint-disable vue/no-mutating-props -->
  <div>
    <TreeSelect
      v-model='value'
      :class='{ "p-invalid": validateState?.$invalid }'
      :options='options'
      display='chip'
      selectionMode='single'
      @change='onChange($event)'
    />
    <small v-if='validateState?.$invalid' class='p-error'>
      {{ validateState?.required.$message.replace('Value', label) }}
    </small>
  </div>
</template>

<script>
import { ref } from 'vue'
import TreeSelect from 'primevue/treeselect'

export default {
  name: 'FormSelect',
  components: { TreeSelect },
  props: {
    label: {
      type: String,
      required: true,
    },
    initValue: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      required: true,
    },
    validateState: {
      type: Object,
      default: undefined,
    },
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
