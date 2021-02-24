<template>
  <div class="protfolio">
    <div class="protfolio__main">
      <ul class="protfolio__main__tabs">
        <li class="tab-link">
          實習履歷
        </li>
        <li class="tab-link">
          打工經驗
        </li>
        <li class="tab-link">
          營隊面試用
        </li>
        <li class="protfolio__main__tabs__add">
          <img src="@/assets/add_circle.svg" alt="">
        </li>
      </ul>
      <div class="protfolio__main__content">
        <div class="content-header">
          <h3 class="content-header__title">
            寰宇補習班工讀
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
    <div class="protfolio__menu" />
  </div>
</template>

<script>
import AbilityCard from '@/components/AbilityCard.vue'

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

export default {
  components: {
    AbilityCard
  },
  setup () {
    return { cards }
  }
}
</script>

<style lang="scss">
@import "../scss/variables";
@import "../scss/mixins";

.protfolio {
  display: grid;
  grid-template-columns: 7fr 3fr;
  gap: 0 30px;
  height: 100%;
  max-width: 1110px;
  padding: 26px 0;
  margin: 0 auto;
}
.protfolio__main {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 10px 10px 0 0;
  box-shadow: 0px 0px 30px rgba(241, 90, 96, 0.05), 0px 0px 25px rgba(241, 90, 96, 0.1);
  overflow-y: auto;
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
    overflow-y: auto;
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
  overflow-y: auto;
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

.protfolio__menu {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 30px rgba(241, 90, 96, 0.05), 0px 0px 25px rgba(241, 90, 96, 0.1);
}
</style>
