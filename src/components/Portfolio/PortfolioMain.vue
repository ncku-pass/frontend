<template>
  <div class='portfolio__main-container'>
    <div v-if='resumes' class='portfolio__main'>
      <div class='portfolio__main__tabs'>
        <mdicon name='chevronLeft' size='30' @click.stop='scrollHorizontal(-200)' />
        <ul ref='tabWrapperRef' class='tabs-wrapper'>
          <li
            v-for='(resume, index) in resumes'
            :key='resume.id'
            :ref='setTabRef'
            class='router-link'
            :class='{ "router-link-active": selectedIndex === index }'
            :title='resume.name'
            @click='selectDisplayPortfolio(index)'
          >
            {{ resume.name || '請輸入名稱' }}
          </li>
          <li class='portfolio__main__tabs__add'>
            <mdicon name='plusCircleOutline' size='24' @click='showSelectTempDialog = true' />
          </li>
        </ul>
        <mdicon name='chevronRight' size='30' @click.stop='scrollHorizontal(200)' />
      </div>
      <div class='portfolio__main__content'>
        <template v-if='showedResume'>
          <div class='content-header'>
            <input
              v-model='showedResume.name'
              placeholder='請輸入名稱'
              class='content-header__title'
              type='text'
              maxlength='25'
            />
            <div class='content-header__btns'>
              <Button
                class='p-button-secondary p-button-outlined'
                @click='showDeleteConfirm'
              >
                刪除
              </Button>
              <div :style='{ "position": "relative" }'>
                <Button
                  :loading='isPending'
                  :disabled='isPending || !notSaved'
                  label='存檔'
                  @click='handleSave'
                />
                <div v-if='notSaved && !isPending' class='button-badge' />
              </div>
            </div>
          </div>
          <div class='content-body'>
            <div class='content-body__card-list'>
              <draggable
                v-model='showedResume.cards'
                v-bind='draggableOptions'
                handle='.ability-card-header__btn-drag'
                :itemKey='resume => resume.id || resume.vForKey'
              >
                <template #item='{element, index}'>
                  <AbilityCard
                    v-model:abilityTopic='element.name'
                    v-model:text='element.text'
                    :cardType='element.type'
                    v-bind='element'
                    @delete-experience='handleDeleteExperience($event, element)'
                    @delete-ability='handleDeleteCard(index)'
                    @duplicate-ability='onDuplicateCard(index)'
                  />
                </template>
              </draggable>
              <div v-show='!showedResume.cards.length' class='content-body__card-list--empty'>
                <img src='@/assets/Portfolio/man-with-coffee.png' alt='man-with-coffee' />
              </div>
            </div>
            <div class='content-body__btns'>
              <Button @click='handleAddCard("experience")'>
                + 新增經歷區塊
              </Button>
              <Button @click='handleAddCard("text")'>
                + 新增文字區塊
              </Button>
            </div>
          </div>
        </template>
        <div v-else class='content-body--empty' @click='showSelectTempDialog = true'>
          <img src='@/assets/Portfolio/man-with-coffee.png' alt='man-with-coffee' />
          <p>點擊這裡新增第一份履歷吧</p>
        </div>
      </div>
    </div>
    <SelectTemplateDialog
      :visible='showSelectTempDialog'
      @close-template-dialog='showSelectTempDialog = false'
      @select-template='selectPortfolioTemp'
    />
    <ConfirmDialog class='no-header no-icon' group='delete-resume' />
    <Toast group='copy-ability-text' :closable='false' />
    <Toast group='update-resume' position='top-right' />
  </div>
</template>

<script>
import { computed, ref, onBeforeUpdate, nextTick, reactive } from 'vue'
import { useStore } from 'vuex'
import draggable from 'vuedraggable'
import { isEqual } from 'lodash-es'
import { useConfirm } from 'primevue/useconfirm'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'

import AbilityCard from '@/components/Portfolio/AbilityCard.vue'
import SelectTemplateDialog from '@/components/Portfolio/SelectTemplateDialog'

export default {
  name: 'PortfolioMain',
  components: {
    AbilityCard,
    SelectTemplateDialog,
    draggable,
    Toast
  },
  setup() {
    const store = useStore()
    const toast = useToast()

    const originResumes = computed(() => store.state.resumes.resumes)
    const resumes = computed(() => store.state.resumes.localResumes)
    const error = computed(() => store.state.resumes.error)
    const isPending = computed(() => store.state.resumes.isPending)
    const saveResume = resume => store.dispatch('resumes/saveResume', { resume })
    const deleteResume = ({ resumeId }) => store.dispatch('resumes/deleteResume', { resumeId })

    const draggableOptions = {
      animation: 200,
      group: { name: 'ability' }
    }

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
    const selectDisplayPortfolio = index => {
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

    // ===== ADD PORTFOLIO =====
    const showSelectTempDialog = ref(false)
    const selectPortfolioTemp = async({ name, cards }) => {
      showSelectTempDialog.value = false
      resumes.value.push({
        id: `${Math.random()}`.slice(2, 7),
        name,
        cards,
        isLocal: true
      })
      await nextTick()
      selectDisplayPortfolio(resumes.value.length - 1)
    }

    // === CONFIRMATION PORTFOLIO MODAL ===
    const deleteStatus = reactive({
      isPending: false,
      error: null
    })
    const confirm = useConfirm()
    const showDeleteConfirm = () => {
      confirm.require({
        group: 'delete-resume',
        message: '確定刪除此項履歷？',
        acceptLabel: '確定刪除',
        rejectLabel: '取消',
        rejectClass: 'p-button-secondary p-button-outlined',
        accept: () => {
          deletePortfolio()
        },
      })
    }

    const deletePortfolio = async() => {
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
        selectDisplayPortfolio(resumes.value.length - 1)
      } else {
        selectDisplayPortfolio(selectedIndex.value)
      }
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
    const onDuplicateCard = (abilityIndex) => {
      const target = { ...showedResume.value.cards[abilityIndex] }
      target.id = 0
      showedResume.value.cards.splice(abilityIndex + 1, 0, target)
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
    const handleSave = async() => {
      if (showedResume.value.name.length > 25) {
        toast.add({ group: 'update-resume', severity: 'error', summary: '儲存失敗 :(', detail: '履歷名字最長為 25 字元', life: 10000 })
        return
      }
      await saveResume(showedResume.value)
      if (error.value) {
        toast.add({ group: 'update-resume', severity: 'error', summary: '儲存失敗 :(', detail: '無法儲存經歷，請稍後再次嘗試', life: 10000 })
      } else {
        toast.add({ group: 'update-resume', severity: 'success', summary: '儲存成功！', detail: '履歷紀錄已更新', life: 10000 })
      }
    }

    return {
      resumes,
      showedResume,
      notSaved,
      selectedIndex,
      draggableOptions,
      tabRefs,
      setTabRef,
      selectDisplayPortfolio,
      tabWrapperRef,
      scrollHorizontal,
      showSelectTempDialog,
      deleteStatus,
      showDeleteConfirm,
      selectPortfolioTemp,
      deletePortfolio,
      handleAddCard,
      onDuplicateCard,
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
    border-bottom: 2px solid $red-1;
    overflow-x: auto;
    align-items: center;
    &__add {
      display: flex;
      align-items: center;
      padding: 0 24px;
      cursor: pointer;
      .mdi {
        color: $red-5;
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
.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  &__title {
    margin: 0;
    padding: 10px 20px 10px 10px;
    font-size: 26px;
    color: $grey-6;
    line-height: 43px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    border: none;
    outline: none;
    flex: 1;
  }
  &__btns {
    @include grid(column, 0, 20px);
    flex: 0 0 auto;
  }
  &__save {
    position: relative;
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
      color: $blue-6;
      background: $grey-blue;
      border-radius: 8px;
      cursor: pointer;
    }
  }
  &__btns {
    display: flex;
    justify-content: center;
    gap: 32px;
    padding: 12px;
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
