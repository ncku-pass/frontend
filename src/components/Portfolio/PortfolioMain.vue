<template>
  <div class="portfolio__main-container">
    <div class="portfolio__main">
      <ul class="portfolio__main__tabs">
        <li
          v-for="(portfolio, index) in portfolios"
          :key="portfolio.id"
          class="tab-link"
          :class="{'is-active': selectedIndex === index}"
          @click="selectedIndex = index"
        >
          {{ portfolio.name || '請輸入名稱' }}
        </li>
        <li class="portfolio__main__tabs__add" @click="handleAddPortfolio">
          <img src="@/assets/add_circle.svg" alt="">
        </li>
      </ul>
      <div class="portfolio__main__content">
        <div class="content-header">
          <input
            v-model="portfolio.name"
            placeholder="請輸入名稱"
            class="content-header__title"
            type="text"
          >
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
            <!-- <AbilityCard
              v-for="card in portfolio.cards"
              :key="card.id"
              v-bind="card"
              v-model:abilityTopic="card.topic"
              @delete-experience="handleDeleteExperience($event, card)"
            /> -->
            <draggable
              :list="portfolio.cards"
              :group="{ name: 'ability' }"
              item-key="id"
            >
              <template #item="{element}">
                <AbilityCard
                  v-model:abilityTopic="element.topic"
                  v-bind="element"
                  @delete-experience="handleDeleteExperience($event, element)"
                />
              </template>
            </draggable>
          </div>
          <button class="content-body__add" @click="handleAddCard">
            <template v-if="portfolio.cards.length">
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
import { computed, ref } from 'vue'
import draggable from 'vuedraggable'
import AbilityCard from '@/components/Portfolio/AbilityCard.vue'

export default {
  name: 'PortfolioMain',
  components: {
    AbilityCard,
    draggable
  },
  setup () {
    const selectedIndex = ref(0)
    const portfolios = ref([
      {
        id: 0,
        name: '實習履歷',
        cards: []
      },
      {
        id: 1,
        name: '打工經驗',
        cards: []
      },
      {
        id: 2,
        name: '營隊面試用',
        cards: []
      }
    ])
    const portfolio = computed(() => {
      return portfolios.value[selectedIndex.value]
    })

    const handleAddPortfolio = () => {
      portfolios.value.push({
        id: portfolios.value.length,
        name: '新的履歷',
        cards: []
      })
    }

    const handleAddCard = () => {
      portfolio.value.cards.push({
        id: portfolio.value.cards.length,
        topic: '',
        experiences: []
      })
    }
    const handleDeleteExperience = (experienceIndex, card) => {
      card.experiences.splice(experienceIndex, 1)
      console.log('delete')
    }

    return { portfolios, portfolio, selectedIndex, handleAddPortfolio, handleAddCard, handleDeleteExperience }
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
    &::-webkit-scrollbar {
      display: none;
    }
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
    border: none;
    outline: none
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
