<template>
  <div class='experience__window__table__wrapper'>
    <ExpListBlock
      v-for='(semesterData, semester) in experiences[expType]'
      :key='semester'
      :semester='semester'
    >
      <ExpListItem
        v-for='experience in semesterData'
        :key='experience.id'
        :experience='experience'
        @edit='$emit("edit-exp", experience.id)'
        @click='openExpViewDialog(experience)'
      />
    </ExpListBlock>

    <ExpViewDialog
      :visible='showExpViewDialog'
      :exp-type='expType'
      :experience='experienceToShow'
      @close-view-dialog='showExpViewDialog = false'
    />
  </div>
</template>

<script>
import ExpListItem from '@/components/Experience/ExperienceList/ViewMode/ExpListItem'
import ExpListBlock from '@/components/Experience/ExperienceList/ViewMode/ExpListBlock'
import ExpViewDialog from '@/components/Experience/ExperienceList/ViewMode/ExpViewDialog'

import { ref } from 'vue'

export default {
  name: 'ViewMode',
  components: {
    ExpListItem,
    ExpListBlock,
    ExpViewDialog,
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
  emits: ['refresh-exp', 'edit-exp'],
  setup() {
    // === EXP VIEWER MODAL ===
    const showExpViewDialog = ref(false)
    const experienceToShow = ref(null)

    const openExpViewDialog = (experience) => {
      experienceToShow.value = experience
      showExpViewDialog.value = true
    }

    return {
      showExpViewDialog,
      experienceToShow,
      openExpViewDialog
    }
  },
}
</script>

<style lang='scss' scoped>

</style>
