<template>
  <div class='experience' :class='`experience--${device}`'>
    <div class='experience__window' :class='`experience__window--${device}`'>
      <ExperienceNavbar />
      <div class='experience__window__table'>
        <component
          :is='currentMode'
          :experiences='classifiedExperiences[activeTab]'
          @edit-exp='editSingleExp'
        />
      </div>
    </div>
    <ExpQuickEditFooter
      v-if='currentMode === "EditMode"'
    />
    <ExperienceFooter
      v-else
      :show-button-badge='showButtonBadge'
      @add-experience='handleAddExperience'
      @import-ncku-data='handleImportNCKUData'
    />
  </div>

  <Toast position='top-right' />
  <ImportModal v-if='showImportModal' @close='showImportModal = false' />
  <ExpEditDialog
    :visible='showExpEditDialog'
    :exp-type='activeTab'
    :exp-id='targetExpId'
    @close-dialog='onCloseExpEditDialog'
  />
</template>

<script>
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'

import ExperienceNavbar from '@/components/Experience/ExperienceNavbar'
import ViewMode from '@/components/Experience/ExperienceList/ViewMode/ViewMode'
import LoadMode from '@/components/Experience/ExperienceList/LoadMode'
import EditMode from '@/components/Experience/ExperienceList/QuickEditMode/EditMode'
import ExperienceFooter from '@/components/Experience/ExperienceFooter'
import ExpQuickEditFooter from '@/components/Experience/ExpQuickEditFooter'
import ImportModal from '@/components/Experience/ImportModal'
import ExpEditDialog from '@/components/Experience/ExperienceEdit/ExpEditDialog'
import { isCurrentOrLastSemester } from '@/helpers/semester.helper'

export default {
  name: 'Experience',
  components: {
    ExperienceNavbar,
    ViewMode,
    LoadMode,
    EditMode,
    ExperienceFooter,
    ExpQuickEditFooter,
    ImportModal,
    ExpEditDialog,
    Toast,
  },
  inject: ['mq'],
  setup() {
    const store = useStore()
    store.dispatch('experiences/initExperiences')

    const activeTab = computed(() => store.state.experiences.activeTab)
    const isPending = computed(() => store.state.experiences.isPending)
    const isQuickEdit = computed(() => store.state.expQuickEdit.quickEditMode)
    const classifiedExperiences = computed(() => store.getters['experiences/classifiedExperiences'])
    const getExperiences = () => store.dispatch('experiences/getExperiences')

    const currentMode = computed(() => isPending.value ? 'LoadMode' : isQuickEdit.value ? 'EditMode' : 'ViewMode')

    // ===新增活動表單===
    const showExpEditDialog = ref(false)
    const handleAddExperience = () => {
      showExpEditDialog.value = true
      targetExpId.value = null

      // small circle on add exp btn
      showButtonBadge.value = false
      localStorage.setItem('add-exp-clicked', 'true')
    }

    // === EDIT EXP ===
    const targetExpId = ref(-1)
    const editSingleExp = (expId) => {
      targetExpId.value = expId
      showExpEditDialog.value = true
    }
    const onCloseExpEditDialog = (submitClose) => {
      targetExpId.value = null
      showExpEditDialog.value = false

      if (submitClose) {
        getExperiences()
      }
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
        const targetExp = classifiedExperiences.value[activeTab.value]

        if (activeTab.value === 'course' && targetExp) {
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
      activeTab,
      currentMode,
      classifiedExperiences,
      showExpEditDialog,
      handleAddExperience,
      getExperiences,
      onCloseExpEditDialog,
      editSingleExp,
      targetExpId,
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
