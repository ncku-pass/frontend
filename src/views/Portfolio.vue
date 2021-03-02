<template>
  <div class="portfolio">
    <div class="portfolio__main-container">
      <div class="portfolio__main">
        <ul class="portfolio__main__tabs">
          <li
            v-for="tab in tabs"
            :key="tab"
            class="tab-link"
            :class="{'is-active': tabNow === tab}"
            @click="tabNow = tab"
          >
            {{ tab }}
          </li>
          <li class="portfolio__main__tabs__add">
            <img src="@/assets/add_circle.svg" alt="">
          </li>
        </ul>
        <div class="portfolio__main__content">
          <div class="content-header">
            <h3 class="content-header__title">
              {{ tabNow }}
            </h3>
            <div class="content-header__btns">
              <button class="btn">
                匯出
              </button>
              <button class="btn">
                存檔
              </button>
            </div>
          </div>
          <div class="content-body">
            <div class="content-body__card-list">
              <AbilityCard
                v-for="card in cards"
                :key="card.id"
                v-bind="card"
              />
            </div>
            <button class="content-body__add">
              <span v-if="cards.length">+ 新增主題</span>
              <span v-else>+ 目前還沒主題 趕快新增一個吧</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="portfolio__menu">
      <div class="portfolio__menu__header">
        <span>經驗列表</span>
        <svg
          width="13"
          height="8"
          viewBox="0 0 13 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4.33333 7.42857C4.33333 7.27702 4.3904 7.13167 4.49198 7.02451C4.59357 6.91735 4.73134 6.85714 4.875 6.85714H8.125C8.26866 6.85714 8.40644 6.91735 8.50802 7.02451C8.6096 7.13167 8.66667 7.27702 8.66667 7.42857C8.66667 7.58012 8.6096 7.72547 8.50802 7.83263C8.40644 7.9398 8.26866 8 8.125 8H4.875C4.73134 8 4.59357 7.9398 4.49198 7.83263C4.3904 7.72547 4.33333 7.58012 4.33333 7.42857ZM2.16667 4C2.16667 3.84845 2.22374 3.7031 2.32532 3.59594C2.4269 3.48878 2.56467 3.42857 2.70833 3.42857H10.2917C10.4353 3.42857 10.5731 3.48878 10.6747 3.59594C10.7763 3.7031 10.8333 3.84845 10.8333 4C10.8333 4.15155 10.7763 4.2969 10.6747 4.40406C10.5731 4.51122 10.4353 4.57143 10.2917 4.57143H2.70833C2.56467 4.57143 2.4269 4.51122 2.32532 4.40406C2.22374 4.2969 2.16667 4.15155 2.16667 4ZM0 0.571429C0 0.419876 0.0570684 0.274531 0.158651 0.167368C0.260233 0.060204 0.398008 0 0.541667 0H12.4583C12.602 0 12.7398 0.060204 12.8414 0.167368C12.9429 0.274531 13 0.419876 13 0.571429C13 0.722981 12.9429 0.868326 12.8414 0.975489C12.7398 1.08265 12.602 1.14286 12.4583 1.14286H0.541667C0.398008 1.14286 0.260233 1.08265 0.158651 0.975489C0.0570684 0.868326 0 0.722981 0 0.571429Z"
            fill="#4F4F4F"
          />
        </svg>
      </div>
      <div class="portfolio__menu__filter" />
      <div class="shadow-container" @scroll.capture="setShadows">
        <ul class="portfolio__menu__body">
          <li
            v-for="i in Array(20)"
            :key="i"
            class="menu-card"
          >
            <div class="menu-card__type">
              課
            </div>
            <span class="menu-card__name">系統分析與設計</span>
            <svg
              width="15"
              height="10"
              viewBox="0 0 15 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L7.5 8L14 1"
                stroke="#4F4F4F"
                stroke-width="2"
              />
            </svg>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import AbilityCard from '@/components/AbilityCard.vue'
import { ref } from 'vue'
import useScrollShadow from '@/composables/useScrollShadow'

const cards = [
  {
    id: 0,
    experiences: [
      { name: '系統分析與設計', tags: ['國際視野', '數理能力'], description: '這段話令我陷入了沈思。本人也是經過了深思熟慮，在每個日日夜夜思考這個問題。想必大家都能了解心得的重要性。' },
      { name: '互動介面設計松', tags: ['設計能力', '介面設計'], description: ' 蘇霍姆林斯基在過去曾經講過，熱愛祖國，這是一種最純潔、最高尚、最強烈、最溫柔、最無情、最溫存、最嚴酷的感情。這段話令我陷入了沈思。本人也是經過了深思熟慮，在每個日日夜夜思考這個問題。想必大家都能了解心得的重要性。' },
      { name: '大數據分析與資料探勘', tags: ['python', '數據分析'] }
    ]
  },
  {
    id: 1,
    experiences: [
      { name: '系統分析與設計', tags: ['國際視野', '數理能力'], description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident fuga debitis enim, alias dolor harum tempora fugit maiores accusamus eius?' },
      { name: '互動介面設計松', tags: ['設計能力', '介面設計'] },
      { name: '大數據分析與資料探勘', tags: ['python', '數據分析'] }
    ]
  },
  {
    id: 2,
    experiences: []
  }
]
const tabs = ['實習履歷', '打工經驗', '營隊面試用']

export default {
  components: {
    AbilityCard
  },
  setup () {
    const tabNow = ref('實習履歷')
    const { setShadows } = useScrollShadow()

    return { cards, tabs, tabNow, setShadows }
  }
}
</script>

<style lang="scss" scoped>
@use "sass:color";
@import "../scss/variables";
@import "../scss/mixins";

.portfolio {
  display: grid;
  grid-template-columns: 7fr 3fr;
  gap: 0 30px;
  height: 100%;
  max-width: 1110px;
  margin: 0 auto;
}
.portfolio__main {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 10px 10px 0 0;
  box-shadow: 0px 0px 30px rgba(241, 90, 96, 0.05), 0px 0px 25px rgba(241, 90, 96, 0.1);
  &-container {
    overflow-y: auto;
    padding: 26px 0;
  }
  &__tabs {
    display: flex;
    justify-content: flex-start;
    flex-shrink: 0;
    padding: 5px 0;
    border-bottom: 2px solid $pink;
    overflow-x: auto;
    &__add {
      display: flex;
      align-items: center;
      padding: 0 12px;
      cursor: pointer;
    }
  }
  &__content {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 0 20px 20px;
  }
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  &__title {
    margin: 0;
    padding: 10px 20px 10px 10px;
    font-size: 26px;
    color: $gray-1;
    line-height: 43px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &__btns {
    @include grid(column, 0, 25px);
    flex: 0 0 auto;
  }
}

.content-body {
  &__add {
    display: block;
    margin: 12px auto;
    padding: 10px 60px;
    border: none;
    border-radius: 8px;
    background-color: $blue-dark;
    color: $white;
  }
}

.portfolio__menu {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 15px;
  margin: 26px 0;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 30px rgba(241, 90, 96, 0.05), 0px 0px 25px rgba(241, 90, 96, 0.1);
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
}

.menu-card {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 2px;
  padding: 5px 15px;
  background-color: $gray-blue;
  border-radius: 5px;
  &__type {
    height: 30px;
    width: 30px;
    margin-right: 10px;
    line-height: 30px;
    text-align: center;
    border-radius: 10px;
    background-color: $blue;
  }
  &__name {
    margin-right: auto;
  }
}
</style>
