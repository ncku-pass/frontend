<template>
  <div class="portfolio__main-container">
    <div v-if="resumes" class="portfolio__main">
      <div class="portfolio__main__tabs">
        <button class="scroll-left-btn" @click="scrollHorizontal(-200)">
          <ChevronLeftIcon />
        </button>
        <ul ref="tabWrapperRef" class="tabs-wrapper">
          <li
            v-for="(resume, index) in resumes"
            :key="resume.id"
            :ref="setTabRef"
            class="tab-link"
            :class="{ 'is-active': selectedIndex === index }"
            :title="resume.name"
            @click="handleSelectResume(index)"
          >
            {{ resume.name || '請輸入名稱' }}
          </li>
          <li class="portfolio__main__tabs__add" @click="openTemplateModal">
            <PlusCircleIcon />
          </li>
        </ul>
        <button class="scroll-right-btn" @click="scrollHorizontal(200)">
          <ChevronRightIcon />
        </button>
      </div>
      <div class="portfolio__main__content">
        <template v-if="showedResume">
          <div class="content-header">
            <input
              v-model="showedResume.name"
              placeholder="請輸入名稱"
              class="content-header__title"
              type="text"
              maxlength="25"
            />
            <div class="content-header__btns">
              <button class="btn--red" @click="confirmDelete">
                刪除
              </button>
              <button class="btn content-header__save" :disabled="isPending || !notSaved" @click="handleSave()">
                {{ isPending ? '存檔中' : '存檔' }}
                <div v-show="notSaved && !isPending" class="content-header__save__hint" />
              </button>
            </div>
          </div>
          <div class="content-body">
            <div class="content-body__card-list">
              <draggable
                :list="showedResume.cards"
                :group="{ name: 'ability' }"
                handle=".ability-card__grab-area"
                :itemKey="resume => resume.id || resume.vForKey"
              >
                <template #item="{element, index}">
                  <AbilityCard
                    v-model:abilityTopic="element.name"
                    v-model:text="element.text"
                    :cardType="element.type"
                    v-bind="element"
                    @delete-experience="handleDeleteExperience($event, element)"
                    @delete-ability="handleDeleteCard(index)"
                  />
                </template>
              </draggable>
              <div v-show="!showedResume.cards.length" class="content-body__card-list--empty">
                <img src="@/assets/Portfolio/man-with-coffee.png" alt="man-with-coffee" />
              </div>
            </div>
            <div class="content-body__btns">
              <button class="content-body__add" @click="handleAddCard('experience')">
                + 新增經歷區塊
              </button>
              <button class="content-body__add" @click="handleAddCard('text')">
                + 新增文字區塊
              </button>
            </div>
          </div>
        </template>
        <div v-else class="content-body--empty">
          <img src="@/assets/Portfolio/man-with-coffee.png" alt="man-with-coffee" />
          <p>點擊上方 + 來新增第一份履歷吧</p>
        </div>
      </div>
    </div>
    <TemplateModal :show-modal="showTemplateModal" @close="handleCloseTemplateModal" @choose="handleAddResume" />
    <ConfirmModal
      v-if="showConfirmModal"
      confirm-type="customize"
      message="確定刪除此項履歷？"
      @cancel="closeConfirmModal"
    >
      <button v-show="!deleteStatus.isPending" class="btn" @click.stop="closeConfirmModal">
        取消
      </button>
      <button class="btn--red" :disabled="deleteStatus.isPending" @click.stop="handleDeleteResume()">
        {{ deleteStatus.isPending ? '刪除中' : '確定刪除' }}
      </button>
    </ConfirmModal>
  </div>
</template>

<script>
import { computed, ref, onBeforeUpdate, nextTick } from 'vue'
import { useStore } from 'vuex'
import draggable from 'vuedraggable'
import { isEqual } from 'lodash-es'
import { PlusCircleIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/outline'
import AbilityCard from '@/components/Portfolio/AbilityCard.vue'
import TemplateModal from '@/components/Portfolio/TemplateModal.vue'
import ConfirmModal from '@/components/ConfirmModal'
import { useDeleteModal } from '@/composables/useDeleteModal'

export default {
  name: 'PortfolioMain',
  components: {
    ConfirmModal,
    AbilityCard,
    TemplateModal,
    draggable,
    PlusCircleIcon,
    ChevronLeftIcon,
    ChevronRightIcon
  },
  setup () {
    const store = useStore()

    const originResumes = computed(() => store.state.resumes.resumes)
    const resumes = computed(() => store.state.resumes.localResumes)
    const error = computed(() => store.state.resumes.error)
    const isPending = computed(() => store.state.resumes.isPending)
    const saveResume = resume => store.dispatch('resumes/saveResume', { resume })
    const deleteResume = ({ resumeId }) => store.dispatch('resumes/deleteResume', { resumeId })

    // === 履歷的Tab ===
    const selectedIndex = ref(0)
    const tabRefs = ref([])
    const setTabRef = el => {
      if (el) {
        tabRefs.value.push(el)
      }
    }
    onBeforeUpdate(() => {
      tabRefs.value = []
    })
    const handleSelectResume = index => {
      selectedIndex.value = index
      if (index >= 0) {
        tabRefs.value[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
      }
    }
    const showedResume = computed(() => {
      return resumes.value[selectedIndex.value]
    })
    const tabWrapperRef = ref(null)
    const scrollHorizontal = pixel => {
      tabWrapperRef.value.scrollTo({
        top: 0,
        left: tabWrapperRef.value.scrollLeft + pixel,
        behavior: 'smooth'
      })
    }

    // === 新增履歷 ===
    const showTemplateModal = ref(false)
    const openTemplateModal = () => {
      showTemplateModal.value = true
    }
    const handleAddResume = async ({ name, cards }) => {
      showTemplateModal.value = false
      resumes.value.push({
        id: `${Math.random()}`.slice(2, 7),
        name,
        cards,
        isLocal: true
      })
      await nextTick()
      handleSelectResume(resumes.value.length - 1)
    }
    const handleCloseTemplateModal = () => {
      showTemplateModal.value = false
    }

    // === 刪除履歷 ===
    const { showConfirmModal, deleteStatus, closeConfirmModal, confirmDelete } = useDeleteModal()
    const handleDeleteResume = async () => {
      if (showedResume.value.isLocal) {
        resumes.value.splice(selectedIndex.value, 1)
      } else {
        try {
          deleteStatus.isPending = true
          deleteStatus.error = null
          await deleteResume({ resumeId: showedResume.value.id })
        } catch (error) {
          deleteStatus.error = error
        } finally {
          deleteStatus.isPending = false
        }
      }
      if (selectedIndex.value === resumes.value.length) {
        handleSelectResume(resumes.value.length - 1)
      } else {
        handleSelectResume(selectedIndex.value)
      }
      showConfirmModal.value = false
    }

    // === 新增 / 刪除卡片 ===
    const handleAddCard = (type = 'experiences') => {
      const card = {
        id: 0,
        vForKey: `${Math.random()}`.slice(2, 7),
        name: '',
        experiences: [],
        text: '',
        type
      }
      showedResume.value.cards.push(card)
    }
    const handleDeleteCard = abilityIndex => {
      showedResume.value.cards.splice(abilityIndex, 1)
    }

    // === 刪除卡片內的經驗 ===
    const handleDeleteExperience = (experienceIndex, card) => {
      card.experiences.splice(experienceIndex, 1)
    }

    // === 儲存履歷 ===
    const notSaved = computed(() => {
      if (showedResume.value.isLocal) {
        return true
      }
      return !isEqual(
        showedResume.value,
        originResumes.value.find(res => res.id === showedResume.value.id)
      )
    })
    const handleSave = async () => {
      if (showedResume.value.name.length > 25) {
        console.log('超過了') // TODO: 新增toast
        return
      }
      await saveResume({ ...showedResume.value })
      if (!error.value) {
        console.log('儲存成功')
      } else {
        console.log('儲存失敗')
      }
    }

    return {
      resumes,
      showedResume,
      notSaved,
      selectedIndex,
      tabRefs,
      setTabRef,
      handleSelectResume,
      tabWrapperRef,
      scrollHorizontal,
      showTemplateModal,
      openTemplateModal,
      deleteStatus,
      confirmDelete,
      showConfirmModal,
      closeConfirmModal,
      handleCloseTemplateModal,
      handleAddResume,
      handleDeleteResume,
      handleAddCard,
      handleDeleteExperience,
      handleDeleteCard,
      handleSave,
      isPending
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/scss/variables';
@import '~@/scss/mixins';

.portfolio__main {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  background-color: #fff;
  border-radius: 10px 10px 0 0;
  // 修復 ipad scroll 卡頓的問題
  transform: translate3d(0, 0, 0);
  -webkit-transform: translate3d(0, 0, 0);
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
    flex-shrink: 0;
    padding: 0 10px;
    min-height: 48px;
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
          transform: rotate(90deg);
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
.tabs-wrapper {
  position: relative;
  display: flex;
  justify-content: flex-start;
  flex-shrink: 0;
  flex: 1;
  overflow: hidden;
  padding: 6px 0;
  &:hover {
    overflow: scroll;
    padding-bottom: 0;
  }
}
.scroll-left-btn,
.scroll-right-btn {
  width: 30px;
  background-color: transparent;
  border: none;
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
    flex: 1;
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
  &--empty {
    margin: 0 auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 160px;
      margin-bottom: 20px;
    }
    p {
      padding: 10px 75px;
      line-height: 26px;
      color: $blue-dark;
      background: $gray-blue;
      border-radius: 8px;
    }
  }
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
