<template>
  <div class='experience-list-item'>
    <Checkbox v-model='checked' :value='exp.id' :binary='true' />
    <h4 class='experience-list-item__title'>
      {{ exp.name }}
    </h4>
    <div class='experience-list-item__tags'>
      <Chip v-for='tag in exp.tags' :key='tag.id' class='tag--small' :label='tag.name' />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import Checkbox from 'primevue/checkbox'
import Chip from 'primevue/chip'

export default {
  name: 'ExpQuickEditItem',
  components: {
    Checkbox,
    Chip
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
