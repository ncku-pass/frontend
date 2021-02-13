<template>
  <div class="experience">
    <div class="experience__window">
      <ul class="experience__window__tabs">
        <li>
          <router-link class="tab" :to="{name: 'Experience', params: { type: 'class' }}">課程紀錄</router-link>
        </li>
        <li>
          <router-link class="tab" :to="{name: 'Experience', params: { type: 'activity' }}">活動經驗</router-link>
        </li>
        <li>
          <router-link class="tab" :to="{name: 'Experience', params: { type: 'competition' }}">競賽經驗</router-link>
        </li>
        <li>
          <router-link class="tab" :to="{name: 'Experience', params: { type: 'work' }}">工作經驗</router-link>
        </li>
        <li>
          <router-link class="tab" :to="{name: 'Experience', params: { type: 'certificate' }}">外語能力或證照</router-link>
        </li>
        <li>
          <router-link class="tab" :to="{name: 'Experience', params: { type: 'others' }}">其他</router-link>
        </li>
      </ul>
      <div class="experience__window__table">
        <ExperienceListBlock v-for="semesterData in allData" :key="semesterData.semester" :semester="semesterData.semester">
          <ExperienceListItem v-for="experience in semesterData.experiences" :key="experience.name" v-bind="experience"/>
        </ExperienceListBlock>
      </div>
    </div>
  </div>
</template>

<script>
import ExperienceListItem from '@/components/ExperienceListItem.vue'
import ExperienceListBlock from '@/components/ExperienceListBlock.vue'

const allData = [
  {
    semester: '106-1',
    experiences: [
      { name: '系統分析與設計', tags: ['國際視野', '數理能力'] },
      { name: '互動介面設計松', tags: ['設計能力', '介面設計'] },
      { name: '大數據分析與資料探勘', tags: ['python', '數據分析'] }
    ]
  },
  {
    semester: '106-2',
    experiences: [
      { name: '系統分析與設計', tags: ['國際視野', '數理能力'] },
      { name: '互動介面設計松', tags: ['設計能力', '介面設計'] },
      { name: '大數據分析與資料探勘', tags: ['python', '數據分析'] }
    ]
  },
  {
    semester: '107-1',
    experiences: [
      { name: '系統分析與設計', tags: ['國際視野', '數理能力'] },
      { name: '互動介面設計松', tags: ['設計能力', '介面設計'] },
      { name: '大數據分析與資料探勘', tags: ['python', '數據分析'] }
    ]
  }
]

export default {
  name: 'Experience',
  components: {
    ExperienceListItem,
    ExperienceListBlock
  },
  setup () {
    return { allData }
  }
}
</script>

<style lang="scss">
@import "../scss/variables";
@import "../scss/mixins";

.experience {
  height: 100%;
  padding: 52px 0 68px;
  display: flex;
  justify-content: center;
}

.experience__window {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  box-shadow: 0px 0px 30px rgba(241, 90, 96, 0.05), 0px 0px 25px rgba(241, 90, 96, 0.1);
}

.experience__window__tabs {
  @include grid(column, 0, 20px);
  padding: 8px 10px;
  list-style: none;
  box-shadow: 0px 4px 15px rgba(241, 90, 96, 0.06);
}

.tab {
  @include tab-link;
}

.experience__window__table {
  padding: 24px 80px 0;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
