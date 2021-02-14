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
        <div class="experience__window__table__wrapper">
          <ExperienceListBlock v-for="semesterData in allData" :key="semesterData.semester" :semester="semesterData.semester">
            <ExperienceListItem v-for="experience in semesterData.experiences" :key="experience.name" v-bind="experience"/>
          </ExperienceListBlock>
        </div>
        <button class="experience__window__table__add">
          <svg width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.71431 22.3811H13.2913V13.4791H21.7733V9.0701H13.2913V0.126143H8.71431V9.0701H0.232251V13.4791H8.71431V22.3811Z" fill="white"/>
          </svg>
        </button>
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
  position: relative;
  padding: 24px 80px 104px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  &__wrapper {
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  &__add {
    position: absolute;
    bottom: 24px;
    left: 50%;
    display: grid;
    place-items: center;
    height: 60px;
    width: 60px;
    transform: translateX(-50%);
    border: none;
    border-radius: 50px;
    background-color: $red;
    font-weight: $weight-bold;
    font-size: 42px;
    color: #fff;
    filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25));
  }
}
</style>
