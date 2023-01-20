<template>
  <div class='experience-list-item'>
    <Checkbox v-model='checked' :value='exp.id' :binary='true' />
    <h4 class='experience-list-item__title'>
      {{ exp.name }}
    </h4>
    <ExpQuickEditSelectTag
      v-if='singleEditExpId === exp.id'
      :disable='false'
      :init-value='exp.tags'
      :need-confirm='false'
    />
    <div v-else class='exp-tag-list-wrapper'>
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
        <mdicon name='plus' size='14' @click='editExpTag(exp.id)' />
      </Chip>
    </div>
  </div>
  <small v-if='error' class='p-error'>
    {{ error }}
  </small>
</template>

<script>
import { ref, computed } from 'vue'
import Checkbox from 'primevue/checkbox'
import Chip from 'primevue/chip'
import { useStore } from 'vuex'
import ExpQuickEditSelectTag
  from '@/components/Experience/ExperienceList/QuickEditMode/ExpQuickEditSelectTag'

export default {
  name: 'ExpQuickEditItem',
  components: {
    ExpQuickEditSelectTag,
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
    const store = useStore()
    const checked = computed({
      get: () => props.selected,
      set: (val) => emit('toggle-exp-select', { expId: props.exp.id, select: val })
    })
    const error = ref(null)
    const singleEditExpId = computed(() => store.state.expQuickEdit.singleEditExpId)

    const removeTagFromExp = (expId, tagId) => {
      store.dispatch('expQuickEdit/REMOVE_TAG_FROM_EXP', { expId, tagId })
    }

    const editExpTag = (expId) => {
      try {
        store.commit('expQuickEdit/SET_SINGLE_EDIT_EXP_ID', expId)
      } catch (err) {
        error.value = err.message
        setTimeout(() => { error.value = null }, 5000)
      }
    }

    return {
      checked,
      singleEditExpId,
      error,
      removeTagFromExp,
      editExpTag
    }
  }
}
</script>

<style lang='scss'>
</style>
