<template>
  <Checkbox v-model='checked' :value='exp.id' :binary='true' />
  {{ exp.name }}
</template>

<script>
import Checkbox from 'primevue/checkbox'
import { computed } from 'vue'

export default {
  name: 'ExpQuickEditItem',
  components: {
    Checkbox
  },
  props: {
    exp: {
      type: Object,
      default() {
        return {}
      }
    },
    selected: {
      type: Boolean,
      required: true,
    }
  },
  emits: ['toggle-exp-select'],
  setup(props, { emit }) {
    const checked = computed({
      get: () => props.selected,
      set: (val) => emit('toggle-exp-select', { expId: props.exp.id, select: val })
    })

    return {
      checked
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
