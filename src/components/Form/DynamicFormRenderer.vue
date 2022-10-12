<template>
  <component
    :is='schema.type'
    :init-value='data'
    :validate-state='validateState'
    v-bind='schema'
    @input='updateData(schema.inputKey, $event)'
  />
</template>

<script>
import FormInputText from './FormInputText'
import FormInputNumber from './FormInputNumber'
import FormTextArea from './FormTextArea'
import FormMultiSelect from './FormMultiSelect'
import FormSelect from './FormSelect'
import FormSelectTag from './FormSelectTag'
import FormDateRange from './FormDateRange'

export default {
  name: 'DynamicFormRenderer',
  components: {
    FormInputText,
    FormInputNumber,
    FormTextArea,
    FormMultiSelect,
    FormSelect,
    FormSelectTag,
    FormDateRange,
  },
  props: {
    schema: {
      type: Object,
      required: true,
    },
    data: {
      type: [String, Number, Array, Object],
      default: '',
    },
    validateState: {
      type: Object,
      default() {
        return undefined
      },
    },
  },
  emits: ['input'],
  setup(props, { emit }) {
    const updateData = (key, event) => {
      // some input type return { originalEvent, value }
      const value = typeof event.target?.value === 'undefined' ? event.value : event.target.value
      const inputKey = event.subKey ? event.subKey : key

      emit('input', { key: inputKey, value })
    }

    return { updateData }
  },
  methods: {

  },
}
</script>
