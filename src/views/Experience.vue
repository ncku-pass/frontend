<template>
  <div class='experience' :class='`experience--${device}`'>
    <div class='experience__window' :class='`experience__window--${device}`'>
      <Toast position='top-right' />
      <ExperienceNavbar :active-tab='activeTab' :redirected='redirected' />
      <Loader :loading='isPending' />
      <div v-if='!isPending' class='experience__window__table'>
        <div class='experience__window__table__wrapper'>
          <ExperienceListBlock
            v-for='(semesterData, semester) in classifiedExperiences[activeTab]'
            :key='semester'
            :semester='semester'
          >
            <ExperienceListItem
              v-for='experience in semesterData'
              :key='experience.id'
              :experience='experience'
              @delete='handleDelete'
              @edit='handleEditExperience'
              @click='openViewerModal(experience)'
            />
          </ExperienceListBlock>
        </div>
      </div>
    </div>
    <AddExperienceButton
      :type='activeTab'
      :show-badge='showButtonBadge'
      @add-experience='handleAddExperience'
      @import-ncku-data='handleImportNCKUData'
    />
  </div>
  <AddExperienceDialog
    :visible='showAddExperienceDialog'
    :exp-type='activeTab'
    :exp-id='targetExpId'
    @close-dialog='onCloseAddExpDialog'
  />
  <ViewerModal
    v-if='showViewerModal'
    :experience-type='activeTab'
    :experience='experienceToShow'
    @close='showViewerModal = false'
  />
  <ImportModal v-if='showImportModal' :type='activeTab' @close='showImportModal = false' />
  <ConfirmDialog class='no-header no-icon' group='delete-exp'>
    <template #message='slotProps'>
      <div>
        確定要刪除
        <span :style='{"color": `var(--primary-500)`}'>{{ slotProps.message.message }}</span>
        此項歷程？
      </div>
    </template>
  </ConfirmDialog>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'

import Loader from '@/components/Loader'
import ExperienceNavbar from '@/components/Experience/ExperienceNavbar.vue'
import ExperienceListItem from '@/components/Experience/ExperienceListItem.vue'
import ExperienceListBlock from '@/components/Experience/ExperienceListBlock.vue'
import AddExperienceButton from '@/components/Experience/AddExp/AddExperienceButton.vue'
import AddExperienceDialog from '@/components/Experience/AddExp/AddExperienceDialog.vue'
import ViewerModal from '@/components/Experience/ViewerModal.vue'
import ImportModal from '@/components/Experience/ImportModal.vue'
import { isCurrentOrLastSemester } from '@/helpers/semester.helper'

export default {
  name: 'Experience',
  components: {
    Loader,
    ExperienceNavbar,
    ExperienceListItem,
    ExperienceListBlock,
    AddExperienceButton,
    AddExperienceDialog,
    ViewerModal,
    ImportModal,
    Toast,
  },
  inject: ['mq'],
  props: {
    activeTab: {
      type: String,
      default: 'course'
    },
    redirected: {
      type: Boolean,
      default: false,
    }
  },
  setup(props) {
    const store = useStore()
    store.dispatch('experiences/initExperiences')

    const isPending = computed(() => store.state.experiences.isPending)
    const classifiedExperiences = computed(() => store.getters['experiences/classifiedExperiences'])
    const getExperiences = () => store.dispatch('experiences/getExperiences')

    // ===新增活動表單===
    const showAddExperienceDialog = ref(false)
    const handleAddExperience = () => {
      showAddExperienceDialog.value = true
      targetExpId.value = null

      // small circle on add exp btn
      showButtonBadge.value = false
      localStorage.setItem('add-exp-clicked', 'true')
    }

    // ===處理經驗刪除===
    const handleDelete = () => {
      getExperiences()
    }

    // === EDIT EXP ===
    const targetExpId = ref(-1)
    const handleEditExperience = (expId) => {
      targetExpId.value = expId
      showAddExperienceDialog.value = true
    }
    const onCloseAddExpDialog = (submitClose) => {
      targetExpId.value = null
      showAddExperienceDialog.value = false

      if (submitClose) {
        getExperiences()
      }
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
    const handleImportNCKUData = async() => {
      localStorage.setItem('add-exp-clicked', 'true')
      showButtonBadge.value = false
      showImportModal.value = true
    }

    // === Check if need to display import exp reminder ===
    const toast = useToast()
    const showButtonBadge = ref(false)
    watch(isPending, (newValue) => {
      if (!newValue) { // finish pending
        const targetExp = classifiedExperiences.value[props.activeTab]

        if (props.activeTab === 'course' && targetExp) {
          const lastKey = Object.keys(targetExp)[0]
          // alert user to import if no new record
          if (!isCurrentOrLastSemester(lastKey)) {
            if (localStorage.getItem('add-exp-clicked') !== 'true') {
              showButtonBadge.value = true
            }
            toast.add({ severity: 'info', summary: '資料已更新！', detail: '請匯入最新課程紀錄', life: 10000 })
          }
        }
      }
    })

    return {
      isPending,
      classifiedExperiences,
      showAddExperienceDialog,
      handleAddExperience,
      handleDelete,
      onCloseAddExpDialog,
      handleEditExperience,
      targetExpId,
      showViewerModal,
      openViewerModal,
      experienceToShow,
      showImportModal,
      showButtonBadge,
      handleImportNCKUData
    }
  },
  computed: {
    device() {
      return this.mq.current
    },
  }
}
</script>

<style lang='scss'>
@import '../scss/mixins';

.experience {
  height: 100%;
  padding: 26px 0;
  display: flex;
  justify-content: center;
  color: $grey-6;

  &--desktop, &--laptop, &--tablet {
    flex-direction: column;
    align-items: center;
  }
}

.experience__window {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  box-shadow: -2px 4px 25px rgba(241, 90, 96, 0.05), 2px -4px 20px rgba(241, 90, 96, 0.1);
  width: 100%;
  max-width: 1110px;

  &--desktop, &--laptop, &--tablet {
    height: 90%;
    margin-bottom: 24px;
  }
}

.experience__window__table {
  position: relative;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  &__wrapper {
    overflow-y: auto;
    padding: 24px 80px 100px;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}

.experience--mobile {
  padding: 0;
  .experience__window__table {
    &__wrapper {
      padding: 12px 24px 100px;
    }
  }
}
</style>
