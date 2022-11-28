<template>
  <div class='experience__window__table__wrapper'>
    <div class='exp-edit-toolbar'>
      <ExpQuickEditToolbar
        :selected-all='selectExpIds.length === fullExpIds.length'
        :selected-none='selectExpIds.length === 0'
        @select-all='selectAllExp'
        @delete-exp='deleteExp'
      />
    </div>
    <ExperienceListBlock
      v-for='(semesterData, semester) in filteredExps'
      :key='semester'
      :semester='semester'
    >
      <ExpQuickEditItem
        v-for='exp in semesterData'
        :key='exp.id'
        :exp='exp'
        :selected='selectExpIds.includes(exp.id)'
        @toggle-exp-select='onSelectExp'
      />
    </ExperienceListBlock>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

import ExperienceListBlock from '@/components/Experience/ExperienceList/ViewMode/ExpListBlock'
import ExpQuickEditToolbar from '@/components/Experience/ExperienceList/QuickEditMode/ExpQuickEditToolbar'
import ExpQuickEditItem from '@/components/Experience/ExperienceList/QuickEditMode/ExpQuickEditItem'
import { mapValues, omitBy } from 'lodash-es'

export default {
  name: 'EditMode',
  components: {
    ExpQuickEditItem,
    ExpQuickEditToolbar,
    ExperienceListBlock,
  },
  props: {
    expType: {
      type: String,
      default: 'course',
    },
    experiences: {
      type: Object,
      default() {
        return {}
      }
    },
  },
  setup(props) {
    const store = useStore()
    const selectExpIds = ref([])
    const deletedExpIds = computed(() => store.state.expQuickEdit.deleteExpIds)

    const filteredExps = computed(() => {
      if (deletedExpIds.value?.length > 0) {
        const filteredExp = mapValues(props.experiences, sem => {
          return sem.filter((exp) => !deletedExpIds.value.includes(exp.id))
        })

        return omitBy(filteredExp, (sem) => sem.length < 1)
      } else {
        return props.experiences
      }
    })
    const fullExpIds = computed(() => {
      const ids = []
      Object.values(props.experiences).forEach(sem => {
        Object.values(sem).forEach(exp => ids.push(exp.id))
      })
      return ids
    })

    const selectAllExp = () => {
      if (selectExpIds.value.length !== fullExpIds.value.length) {
        selectExpIds.value = fullExpIds.value
      } else {
        selectExpIds.value = []
      }
    }

    const onSelectExp = ({ expId, select }) => {
      if (select && !selectExpIds.value.includes(expId)) {
        selectExpIds.value.push(expId)
      } else if (!select) {
        selectExpIds.value = selectExpIds.value.filter(target => target !== expId)
      }
    }

    const deleteExp = () => {
      store.commit('expQuickEdit/APPEND_DELETE_EXP_ID', selectExpIds.value)
      selectExpIds.value = []
    }

    return {
      selectAllExp,
      onSelectExp,
      deleteExp,
      filteredExps,
      fullExpIds,
      selectExpIds,
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
