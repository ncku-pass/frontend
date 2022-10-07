<template>
  <!-- eslint-disable vue/no-mutating-props -->
  <MultiSelect
    ref='multiSelectRef'
    v-model='value'
    :options='options'
    display='chip'
    @change='onValueChange'
    @show='checkNeedShowPanel'
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
  setup(props, { emit }) {
    const value = ref(props.initValue)
    const multiSelectRef = ref(null)
    const isDeleteItem = ref(false)

    const checkNeedShowPanel = () => {
      if (isDeleteItem.value) {
        multiSelectRef.value.hide()
        isDeleteItem.value = false
      }
    }

    const onValueChange = (evt) => {
      isDeleteItem.value = props.initValue?.length > evt.value?.length
      emit('input', evt)
    }

    return {
      value,
      multiSelectRef,
      checkNeedShowPanel,
      onValueChange,
    }
  },
}
</script>
