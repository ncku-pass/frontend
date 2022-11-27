<template>
  <div class='experience__window__table__wrapper'>
    <div class='exp-edit-toolbar'>
      hello word
    </div>
    <ExperienceListBlock
      v-for='(semesterData, semester) in experiences[expType]'
      :key='semester'
      :semester='semester'
    >
      <div>
        {{ semesterData }}
      </div>
    </ExperienceListBlock>
  </div>
</template>

<script>
import ExperienceListBlock from '@/components/Experience/ExperienceList/ExpListBlock'
export default {
  name: 'EditMode',
  components: { ExperienceListBlock },
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
}
</script>

<style lang='scss' scoped>

</style>
