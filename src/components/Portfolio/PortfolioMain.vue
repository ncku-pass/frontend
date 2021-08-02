<template>
  <div class="portfolio__main-container">
    <div v-if="resumes" class="portfolio__main">
      <ul class="portfolio__main__tabs">
        <li
          v-for="(resume, index) in resumes"
          :key="resume.id"
          class="tab-link"
          :class="{ 'is-active': selectedIndex === index }"
          @click="selectedIndex = index"
        >
          {{ resume.name || '請輸入名稱' }}
        </li>
        <li class="portfolio__main__tabs__add" @click="openTemplateModal">
          <PlusCircleIcon />
        </li>
      </ul>
      <div class="portfolio__main__content">
        <template v-if="showedResume">
          <div class="content-header">
            <input
              v-model="showedResume.name"
              placeholder="請輸入名稱"
              class="content-header__title"
              type="text"
            />
            <div class="content-header__btns">
              <button class="btn--red">
                刪除
              </button>
              <button
                class="btn content-header__save"
                :disabled="isPending"
                @click="handleSave()"
              >
                {{ isPending ? '存檔中' : '存檔' }}
                <!-- TODO: 顯示尚未存檔 -->
                <!-- <div class="content-header__save__hint" /> -->
              </button>
            </div>
          </div>
          <div class="content-body">
            <div class="content-body__card-list">
              <draggable
                :list="showedResume.cards"
                :group="{ name: 'ability' }"
                handle=".ability-card__grab-area"
                item-key="id"
              >
                <template #item="{element, index}">
                  <AbilityCard
                    v-model:abilityTopic="element.name"
                    v-bind="element"
                    @delete-experience="handleDeleteExperience(experienceIndex, element)"
                    @delete-ability="handleDeleteCard(index)"
                  />
                </template>
              </draggable>
              <div v-show="!showedResume.cards.length" class="content-body__card-list--empty">
                <img src="@/assets/Portfolio/man-with-coffee.png" alt="man-with-coffee" />
              </div>
            </div>
            <div class="content-body__btns">
              <button class="content-body__add" @click="handleAddCard('experiences')">
                + 新增經歷區塊
              </button>
              <button class="content-body__add" @click="handleAddCard('text')">
                + 新增文字區塊
              </button>
            </div>
          </div>
        </template>
        <template v-else>
          尚未選擇履歷
        </template>
      </div>
    </div>
    <!-- TODO: 顯示Loading -->
    <TemplateModal
      :show-modal="showTemplateModal"
      @close="handleCloseTemplateModal"
      @choose="handleAddResume"
    />
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import draggable from 'vuedraggable'
import { PlusCircleIcon } from '@heroicons/vue/outline'
import AbilityCard from '@/components/Portfolio/AbilityCard.vue'
import TemplateModal from '@/components/Portfolio/TemplateModal.vue'

export default {
  name: 'PortfolioMain',
  components: {
    AbilityCard,
    TemplateModal,
    draggable,
    PlusCircleIcon
  },
  setup () {
    const store = useStore()

    const resumes = computed(() => store.state.resumes.resumes)
    const error = computed(() => store.state.resumes.error)
    const isPending = computed(() => store.state.resumes.isPending)
    const saveResume = () => store.dispatch('saveResume')

    // === 顯示當前履歷 ===
    const selectedIndex = ref(0)
    const showedResume = computed(() => {
      return resumes.value[selectedIndex.value]
    })

    // === 新增履歷 ===
    const showTemplateModal = ref(false)
    const openTemplateModal = () => {
      // resumes.value.push({
      //   id: resumes.value.length,
      //   name: '新的履歷',
      //   cards: []
      // })
      showTemplateModal.value = true
    }
    const handleAddResume = ({ name, cards }) => {
      showTemplateModal.value = false
      resumes.value.push({
        id: resumes.value.length,
        name,
        cards
      })
    }
    const handleCloseTemplateModal = () => {
      showTemplateModal.value = false
    }

    // === 新增 / 刪除卡片 ===
    const handleAddCard = (cardType = 'experiences') => {
      const card = {
        id: showedResume.value.cards.length,
        name: '',
        experiences: [],
        text: '',
        cardType
      }
      showedResume.value.cards.push(card)
    }
    const handleDeleteCard = (abilityIndex) => {
      showedResume.value.cards.splice(abilityIndex, 1)
    }

    // === 刪除卡片內的經驗 ===
    const handleDeleteExperience = (experienceIndex, topic) => {
      topic.experiences.splice(experienceIndex, 1)
    }

    const handleSave = async () => {
      const cards = showedResume.value.cards.map(topic => {
        return { ...topic, experienceId: topic.experiences.map(exp => exp.id) }
      })
      await saveResume(showedResume.value.id, { ...showedResume.value, cards })
      if (!error.value) {
        console.log('儲存成功')
      } else {
        console.log('儲存失敗')
      }
    }

    return {
      resumes,
      showedResume,
      selectedIndex,
      showTemplateModal,
      openTemplateModal,
      handleCloseTemplateModal,
      handleAddResume,
      handleAddCard,
      handleDeleteExperience,
      handleDeleteCard,
      handleSave,
      isPending
    }
  }
}
</script>

<style lang="scss">
@import '~@/scss/variables';
@import '~@/scss/mixins';

.portfolio__main {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  background-color: #fff;
  border-radius: 10px 10px 0 0;
  &-container {
    overflow-y: auto;
    padding: 26px 0;
    filter: drop-shadow(-2px 4px 30px rgba(241, 90, 96, 0.05))
      drop-shadow(-2px 4px 30px rgba(241, 90, 96, 0.1));
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
      svg {
        width: 24px;
        height: 24px;
        color: $red;
        transition: all 0.3s;
        &:hover {
          transform: rotate(90deg)
        }
      }
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
    outline: none;
  }
  &__btns {
    @include grid(column, 0, 25px);
    flex: 0 0 auto;
  }
  &__save {
    position: relative;
    &__hint {
      position: absolute;
      right: -5px;
      top: -5px;
      height: 15px;
      width: 15px;
      border-radius: 10px;
      background-color: $red-light;
    }
  }
}

.content-body {
  &__btns {
    display: flex;
    justify-content: center;
    gap: 12px;
    padding: 12px;
  }
  &__add {
    display: block;
    padding: 10px 60px;
    border: none;
    border-radius: 8px;
    background-color: $blue-dark;
    color: $white;
  }
  &__card-list--empty {
    display: flex;
    justify-content: center;
    img {
      margin: 40px;
      height: 200px;
    }
  }
}
</style>
