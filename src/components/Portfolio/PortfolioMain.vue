<template>
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
              v-model:abilityTopic="card.topic"
              @delete-experience="handleDeleteExperience($event, card)"
            />
          </div>
          <button class="content-body__add" @click="handleAddCard">
            <template v-if="cards.length">
              + 新增主題
            </template>
            <template v-else>
              + 目前還沒主題 趕快新增一個吧
            </template>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import AbilityCard from '@/components/Portfolio/AbilityCard.vue'

export default {
  name: 'PortfolioMain',
  components: {
    AbilityCard
  },
  setup () {
    const tabs = ref(['實習履歷', '打工經驗', '營隊面試用'])
    const tabNow = ref(tabs.value[0])

    const cards = ref([])
    const handleAddCard = () => {
      cards.value.push({
        id: cards.value.length,
        topic: '',
        experiences: []
      })
    }
    const handleDeleteExperience = (experienceIndex, card) => {
      card.experiences.splice(experienceIndex, 1)
      console.log('delete')
    }

    return { tabs, tabNow, cards, handleAddCard, handleDeleteExperience }
  }
}
</script>

<style lang="scss">
@import "~@/scss/variables";
@import "~@/scss/mixins";

.portfolio__main {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 10px 10px 0 0;
  &-container {
    overflow-y: auto;
    padding: 26px 0;
    filter: drop-shadow(-2px 4px 30px rgba(241, 90, 96, 0.05)) drop-shadow(-2px 4px 30px rgba(241, 90, 96, 0.1));
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
</style>
