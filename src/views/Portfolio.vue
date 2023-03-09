<template>
  <div class='portfolio'>
    <Loader :loading='loading' />
    <template v-if='!loading'>
      <PortfolioMain />
      <PortfolioMenu />
    </template>
    <ConfirmDialog ref='confirmDialogRef' class='no-header no-icon' group='delete-profile' />
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { onBeforeRouteLeave } from 'vue-router'
import { useConfirm } from 'primevue/useconfirm'

import Loader from '@/components/Loader'
import PortfolioMain from '@/components/Portfolio/PortfolioMain'
import PortfolioMenu from '@/components/Portfolio/PortfolioMenu'

export default {
  name: 'Portfolio',
  components: {
    PortfolioMain,
    PortfolioMenu,
    Loader,
  },
  setup() {
    const store = useStore()
    store.dispatch('resumes/initResumes')

    const someResumesNotSaved = computed(() => store.getters['resumes/someResumesNotSaved'])
    const resumesNotReady = computed(() => store.state.resumes.isPending && !store.state.resumes.resumes)
    const experiencesNotReady = computed(() => store.state.experiences.isPending)
    const loading = computed(() => resumesNotReady.value || experiencesNotReady.value)

    // === CONFIRMATION MODEL ===
    const confirmDialogRef = ref(null)
    const confirmLeaving = ref(null)
    const confirm = useConfirm()

    onBeforeRouteLeave(async(to, from) => {
      if (someResumesNotSaved.value) {
        confirm.require({
          group: 'delete-profile',
          message: '尚未儲存履歷，確定要離開嗎？',
          acceptLabel: '確定離開',
          rejectLabel: '留下存檔',
          rejectClass: 'p-button-secondary p-button-outlined',
          accept: () => {
            confirmLeaving.value = true
          },
          reject: () => {
            confirmLeaving.value = false
          }
        })

        return waitUntilConfirmClosed()
      }
    })

    const waitUntilConfirmClosed = async() => {
      return new Promise((resolve) => {
        const intervalCheck = setInterval(() => {
          if (!confirmDialogRef.value.visible) {
            clearInterval(intervalCheck)
            resolve(confirmLeaving.value)
          }
        }, 500)
      })
    }

    return { loading, confirmDialogRef }
  }
}
</script>

<style lang='scss' scoped>
.portfolio {
  position: relative;
  display: grid;
  grid-template-columns: 7fr 3fr;
  gap: 0 30px;
  height: 100%;
  max-width: 1110px;
  margin: 0 auto;
}
</style>
