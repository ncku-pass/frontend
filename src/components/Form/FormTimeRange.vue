<template>
  <!--  <div v-for='(key, idx) in inputKey' :key='key'>-->
  <!--    <label :for='key'> {{ subLabels[idx] }} </label>-->
  <!--    <Calendar-->
  <!--      v-model='value[idx]'-->
  <!--      :inputId='key'-->
  <!--      dateFormat='dd/mm/yy'-->
  <!--      placeholder='dd/mm/yyyy'-->
  <!--      :showIcon='true'-->
  <!--      :manualInput='false'-->
  <!--    />-->
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
    }
  },
  emits: ['input'],
  setup(props, { emit }) {
    const value = ref(props.inputKey.map((key) => props.initValue[key] === null ? null : new Date(props.initValue[key])))

    const onDateSelect = (val) => {
      const idx = value.value.findIndex((item) => item === val)

      // start date, clear end date
      if (idx === 0) {
        emit('input', { subKey: props.inputKey[idx + 1], value: null })
      }
      emit('input', { subKey: props.inputKey[idx], value: val })
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
