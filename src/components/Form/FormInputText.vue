<template>
  <!-- eslint-disable vue/no-mutating-props -->
  <div>
    <InputText
      v-model='value'
      type='text'
      :class='{ "p-invalid": validateState?.$invalid }'
      @input='$emit("input", $event)'
    />
    <small v-if='validateState?.$invalid' class='p-error'>
      {{ validateState?.required.$message.replace('Value', label) }}
    </small>
  </div>
</template>

<script>
import { ref } from 'vue'
import InputText from 'primevue/inputtext'

export default {
  name: 'FromInputText',
  components: { InputText },
  props: {
    label: {
      type: String,
      required: true,
    },
    initValue: {
      type: String,
      default: ''
    },
    validateState: {
      type: Object,
      default: undefined,
    },
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
