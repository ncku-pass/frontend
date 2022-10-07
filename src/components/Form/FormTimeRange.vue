<template>
  <div>
    <Calendar
      v-model='value'
      dateFormat='dd/mm/yy'
      placeholder='dd/mm/yyyy'
      selectionMode='range'
      :showIcon='true'
      :manualInput='false'
      @date-select='onDateSelect'
    />
    <small v-if='validateState?.$invalid' class='p-error'>
      {{ validateState?.required.$message.replace('Value', validateState.label) }}
    </small>
  </div>
</template>

<script>
import { ref } from 'vue'
import Calendar from 'primevue/calendar'

export default {
  name: 'FormTimeRange',
  components: { Calendar },
  props: {
    inputKey: {
      type: Array,
      required: true,
    },
    initValue: {
      type: Object,
      default() {
        return {}
      }
    },
    validateState: {
      type: Object,
      default: undefined,
    },
  },
  emits: ['input'],
  setup(props, { emit }) {
    // return null if every element is null, or else wrap with new Date() if has value
    const value = ref(props.inputKey.every((key) => !props.initValue[key])
      ? null
      : props.inputKey.map((key) => props.initValue[key] === null ? null : new Date(props.initValue[key])))

    const onDateSelect = (val) => {
      // primevue gives date in format Tue Jun 15 2021 00:00:00 GMT+0800 (Taipei Standard Time)
      // find the index before converting
      const idx = value.value.findIndex((item) => item === val)
      const convertedDate = new Date(Date.UTC(val.getFullYear(), val.getMonth(), val.getDate())).toISOString()

      // start date, clear end date
      if (idx === 0) {
        emit('input', { subKey: props.inputKey[idx + 1], value: null })
      }
      emit('input', { subKey: props.inputKey[idx], value: convertedDate })
    }

    return {
      value,
      onDateSelect
    }
  },
}
</script>

<style lang='scss' scoped>

</style>
