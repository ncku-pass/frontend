<template>
  <component
    :is='schema.type'
    :init-value='data'
    v-bind='schema'
    @input='updateData(schema.key, $event)'
  />
</template>

<script>
import FormInputText from './FormInputText'
import FormInputNumber from './FormInputNumber'
import FormTextArea from './FormTextArea'
import FormMultiSelect from './FormMultiSelect'
import FormSelect from './FormSelect'
import FormSelectTag from './FormSelectTag'

export default {
  name: 'DynamicFormRenderer',
  components: {
    FormInputText,
    FormInputNumber,
    FormTextArea,
    FormMultiSelect,
    FormSelect,
    FormSelectTag,
  },
  props: {
    schema: {
      type: Object,
      required: true,
    },
    data: {
      type: [String, Number, Array],
      default: ''
    },
  },
  emits: ['input'],
  setup(props, { emit }) {
    const updateData = (key, event) => {
      // some input type return { originalEvent, value }
      const value = typeof event.target?.value === 'undefined' ? event.value : event.target.value
      emit('input', { key, value })
    }

    return { updateData }
  },
  methods: {

  },
}
</script>
