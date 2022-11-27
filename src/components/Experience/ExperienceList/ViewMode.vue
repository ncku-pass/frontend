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
        @delete-exp-completed='$emit("refresh-exp")'
        @edit='$emit("edit-exp", experience.id)'
        @click='openViewerModal(experience)'
      />
    </ExpListBlock>

    <ViewerModal
      v-if='showViewerModal'
      :experience-type='expType'
      :experience='experienceToShow'
      @close='showViewerModal = false'
    />
  </div>
</template>

<script>
import ExpListItem from '@/components/Experience/ExperienceList/ExpListItem'
import ExpListBlock from '@/components/Experience/ExperienceList/ExpListBlock'
import ViewerModal from '@/components/Experience/ViewerModal'

import { ref } from 'vue'

export default {
  name: 'ViewMode',
  components: {
    ExpListItem,
    ExpListBlock,
    ViewerModal,
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
    const showViewerModal = ref(false)
    const experienceToShow = ref(null)

    const openViewerModal = (experience) => {
      experienceToShow.value = experience
      showViewerModal.value = true
    }

    return {
      showViewerModal,
      experienceToShow,
      openViewerModal
    }
  },
}
</script>

<style lang='scss' scoped>

</style>
