<template>
  <div class="experience">
    <div class="experience__window">
      <ExperienceWindowTabs :type="type" />
      <div v-if="isPending" class="experience__loading">
        <p>Loading</p>
        <div class="lds-dual-ring" />
      </div>
      <div v-else class="experience__window__table">
        <vueScrollShadow>
          <div class="experience__window__table__wrapper">
            <ExperienceListBlock
              v-for="(semesterData, semester) in classifiedExperiences[type]"
              :key="semester"
              :semester="semester"
            >
              <ExperienceListItem
                v-for="experience in semesterData"
                :key="experience.id"
                :experience="experience"
                @delete="handleDelete"
                @edit="handleEditExperience"
                @click="openViewerModal(experience)"
              />
            </ExperienceListBlock>
            <button class="experience__window__table__add" @click="handleAddExperience">
              <svg width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8.71431 22.3811H13.2913V13.4791H21.7733V9.0701H13.2913V0.126143H8.71431V9.0701H0.232251V13.4791H8.71431V22.3811Z"
                  fill="white"
                />
              </svg>
            </button>
            <p
              v-if="type === 'course' || type === 'activity'"
              class="experience__window__table__import"
              @click="handleImportNCKUData"
            >
              導入原有資料
            </p>
          </div>
        </vueScrollShadow>
      </div>
    </div>
  </div>
  <FormModal
    v-if="showFormModal"
    :form-type="type"
    :edit-data="experienceToEdit"
    @close="showFormModal = false"
    @submit="handleSubmit"
  />
  <ViewerModal
    v-if="showViewerModal"
    :experience-type="type"
    :experience="experienceToShow"
    @close="showViewerModal = false"
  />
  <ImportModal v-if="showImportModal" :type="type" @close="showImportModal = false" />
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import ExperienceWindowTabs from '@/components/Experience/ExperienceWindowTabs.vue'
import ExperienceListItem from '@/components/Experience/ExperienceListItem.vue'
import ExperienceListBlock from '@/components/Experience/ExperienceListBlock.vue'
import FormModal from '@/components/Experience/Form/FormModal.vue'
import ViewerModal from '@/components/Experience/ViewerModal.vue'
import ImportModal from '@/components/Experience/ImportModal.vue'
import vueScrollShadow from 'vue3-scroll-shadow'

export default {
  name: 'Experience',
  components: {
    ExperienceWindowTabs,
    ExperienceListItem,
    ExperienceListBlock,
    FormModal,
    ViewerModal,
    ImportModal,
    vueScrollShadow
  },
  props: {
    // 目前顯示的TAB種類
    type: {
      type: String,
      default: 'course'
    }
  },
  setup (props) {
    const store = useStore()

    const isPending = computed(() => store.state.experiences.isPending)
    const experiences = computed(() => store.state.experiences.experiences)
    const classifiedExperiences = computed(() => store.getters['experiences/classifiedExperiences'])
    const getExperiences = () => store.dispatch('experiences/getExperiences')

    // ===新增活動表單===
    const showFormModal = ref(false)
    const handleAddExperience = () => {
      showFormModal.value = true
      experienceToEdit.value = null
    }

    // ===設定滾動容器陰影===
    const shadowContainer = ref(null)

    // ===處理表單送出===
    const handleSubmit = () => {
      showFormModal.value = false
    }

    // ===處理經驗刪除===
    const handleDelete = () => {
      getExperiences()
    }

    // ===點擊編輯的按鈕時，抓出此筆經歷，傳入表單中===
    const experienceToEdit = ref(null)
    const handleEditExperience = experienceId => {
      showFormModal.value = true
      ;[experienceToEdit.value] = experiences.value[props.type].filter(exp => {
        return exp.id === experienceId
      })
    }

    // === 點擊經歷時，跳出檢視視窗 ===
    const showViewerModal = ref(false)
    const experienceToShow = ref(null)

    const openViewerModal = experience => {
      experienceToShow.value = experience
      showViewerModal.value = true
    }
    // === 匯入學校資料 ===
    const showImportModal = ref(false)
    const handleImportNCKUData = async ({ key, keyval, type }) => {
      showImportModal.value = true
    }

    return {
      isPending,
      classifiedExperiences,
      showFormModal,
      handleAddExperience,
      shadowContainer,
      handleSubmit,
      handleDelete,
      handleEditExperience,
      experienceToEdit,
      showViewerModal,
      openViewerModal,
      experienceToShow,
      showImportModal,
      handleImportNCKUData
    }
  }
}
</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

.experience {
  height: 100%;
  padding: 26px 0;
  display: flex;
  justify-content: center;
  color: $gray-1;
  &__loading {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    font-size: 26px;
  }
}

.experience__window {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  box-shadow: 0px 0px 30px rgba(241, 90, 96, 0.05), 0px 0px 25px rgba(241, 90, 96, 0.1);
  width: 100%;
  max-width: 1110px;
}

.experience__window__table {
  position: relative;
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
    display: grid;
    place-items: center;
    margin: 0 auto 14px;
    height: 60px;
    width: 60px;
    border: none;
    border-radius: 50px;
    background-color: $red;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  }
  &__import {
    display: block;
    color: #4f4f4f;
    width: fit-content;
    margin: 0 auto;
    border-bottom: 2px solid #4f4f4f;
    cursor: pointer;
  }
}

.lds-dual-ring {
  display: inline-block;
  width: 60px;
  height: 60px;
}
.lds-dual-ring:after {
  content: ' ';
  display: block;
  width: 60px;
  height: 60px;
  box-sizing: border-box;
  border-radius: 50%;
  border: 6px solid #000;
  border-color: #000 transparent #000 transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
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

@media (max-width: 767px) {
  .experience {
    padding: 0;
  }
  .experience__window__table {
    &__wrapper {
      padding: 12px 24px;
    }
  }
}
</style>
