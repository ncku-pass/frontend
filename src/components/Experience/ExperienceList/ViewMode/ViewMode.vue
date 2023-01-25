<template>
  <div class='experience__content'>
    <ExpListBlock
      v-for='(semesterData, semester) in experiences'
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
      :experience='experienceToShow'
      @close-view-dialog='showExpViewDialog = false'
    />
  </div>
</template>

<script>
import { ref } from 'vue'

import ExpListItem from '@/components/Experience/ExperienceList/ViewMode/ExpListItem'
import ExpListBlock from '@/components/Experience/ExperienceList/ViewMode/ExpListBlock'
import ExpViewDialog from '@/components/Experience/ExperienceList/ViewMode/ExpViewDialog'

export default {
  name: 'ViewMode',
  components: {
    ExpListItem,
    ExpListBlock,
    ExpViewDialog,
  },
  props: {
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
