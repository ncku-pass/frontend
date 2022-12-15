<template>
  <div class='experience-list-item'>
    <Checkbox v-model='checked' :value='exp.id' :binary='true' />
    <h4 class='experience-list-item__title'>
      {{ exp.name }}
    </h4>
    <div class='exp-tag-list-wrapper'>
      <div class='exp-tag-list'>
        <Chip
          v-for='tag in exp.tags'
          :key='tag.id'
          class='exp-tag'
          :label='tag.name'
          :removable='true'
          removeIcon='pi pi-times'
          @remove='removeTagFromExp(exp.id, tag.id)'
        />
      </div>
      <Chip class='exp-tag__ext'>
        <mdicon name='plus' size='14' />
      </Chip>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import Checkbox from 'primevue/checkbox'
import Chip from 'primevue/chip'
import { useStore } from 'vuex'

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

    const store = useStore()
    const removeTagFromExp = (expId, tagId) => {
      store.dispatch('expQuickEdit/REMOVE_TAG_FROM_EXP', { expId, tagId })
    }
    return {
      checked,
      removeTagFromExp
    }
  }
}
</script>

<style lang='scss'>
</style>
