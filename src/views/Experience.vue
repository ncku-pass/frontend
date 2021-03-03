<template>
  <div class="experience">
    <div class="experience__window">
      <ul class="experience__window__tabs">
        <li>
          <router-link
            class="tab-link"
            :class="{'router-link-active': type === 'class'}"
            :to="{name: 'Experience', params: { type: 'class' }}"
          >
            課程紀錄
          </router-link>
        </li>
        <li>
          <router-link
            class="tab-link"
            :to="{name: 'Experience', params: { type: 'activity' }}"
          >
            活動經驗
          </router-link>
        </li>
        <li>
          <router-link
            class="tab-link"
            :to="{name: 'Experience', params: { type: 'competition' }}"
          >
            競賽經驗
          </router-link>
        </li>
        <li>
          <router-link
            class="tab-link"
            :to="{name: 'Experience', params: { type: 'work' }}"
          >
            工作經驗
          </router-link>
        </li>
        <li>
          <router-link
            class="tab-link"
            :to="{name: 'Experience', params: { type: 'certificate' }}"
          >
            外語能力或證照
          </router-link>
        </li>
        <li>
          <router-link
            class="tab-link"
            :to="{name: 'Experience', params: { type: 'others' }}"
          >
            其他
          </router-link>
        </li>
      </ul>
      <div class="experience__window__table">
        <div class="shadow-container" @scroll.capture="setShadows">
          <div ref="scrollContent" class="experience__window__table__wrapper">
            <ExperienceListBlock
              v-for="semesterData in allData"
              :key="semesterData.semester"
              :semester="semesterData.semester"
            >
              <ExperienceListItem
                v-for="experience in semesterData.experiences"
                :key="experience.name"
                v-bind="experience"
              />
            </ExperienceListBlock>
          </div>
        </div>
        <button class="experience__window__table__add" @click="showFormModal = true">
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.71431 22.3811H13.2913V13.4791H21.7733V9.0701H13.2913V0.126143H8.71431V9.0701H0.232251V13.4791H8.71431V22.3811Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
  <FormModal v-if="showFormModal" @cancel="showFormModal = false" />
</template>

<script>
import ExperienceListItem from '@/components/ExperienceListItem.vue'
import ExperienceListBlock from '@/components/ExperienceListBlock.vue'
import FormModal from '@/components/FormModal.vue'
import { ref, onMounted, onUpdated } from 'vue'
import useScrollShadow from '@/composables/useScrollShadow'

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
  },
  {
    semester: '107-2',
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
    ExperienceListBlock,
    FormModal
  },
  props: {
    // 目前顯示的TAB種類
    type: {
      type: String,
      default: 'class'
    }
  },
  setup () {
    const showFormModal = ref(false)
    const { setShadows, initShadows } = useScrollShadow()

    const scrollContent = ref(null)
    onMounted(() => {
      initShadows(scrollContent.value)
    })
    onUpdated(() => {
      initShadows(scrollContent.value)
    })

    return { allData, showFormModal, setShadows, initShadows, scrollContent }
  }
}
</script>

<style lang="scss">
@import "../scss/variables";
@import "../scss/mixins";

.experience {
  height: 100%;
  padding: 26px 0;
  display: flex;
  justify-content: center;
}

.experience__window {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  box-shadow: 0px 0px 30px rgba(241, 90, 96, 0.05), 0px 0px 25px rgba(241, 90, 96, 0.1);
  width: 100%;
  max-width: 1110px;
}

.experience__window__tabs {
  display: flex;
  justify-content: space-between;
  padding: 8px 10px;
  list-style: none;
  box-shadow: 0px 4px 15px rgba(241, 90, 96, 0.06);
}

.experience__window__table {
  position: relative;
  padding: 0 0 104px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  &__wrapper {
    overflow-y: auto;
    padding: 24px 96px;
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
    transition: box-shadow .3s;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  }
}

@media (max-width: 1440px) {
  .experience__window {
    max-width: 930px;
  }
  .experience__window__table__wrapper {
    padding: 24px 80px;
  }
}
</style>
