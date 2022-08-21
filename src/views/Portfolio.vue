<template>
  <div class='portfolio'>
    <Loader :loading='loading' />

    <template v-if='!loading'>
      <PortfolioMain />
      <PortfolioMenu />
    </template>

    <ConfirmModal
      v-if='showConfirmModal'
      confirm-type='customize'
      message='尚未儲存履歷，確定要離開嗎？'
      @cancel='confirmLeaving(false)'
      @confirm='confirmLeaving(true)'
    >
      <button class='btn--red' @click.stop='confirmLeaving(false)'>
        留下存檔
      </button>
      <button class='btn' @click.stop='confirmLeaving(true)'>
        確定離開
      </button>
    </ConfirmModal>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { onBeforeRouteLeave } from 'vue-router'
import Loader from '@/components/Loader'
import PortfolioMain from '@/components/Portfolio/PortfolioMain'
import PortfolioMenu from '@/components/Portfolio/PortfolioMenu'
import ConfirmModal from '@/components/ConfirmModal'

export default {
  name: 'Portfolio',
  components: {
    PortfolioMain,
    PortfolioMenu,
    ConfirmModal,
    Loader,
  },
  setup() {
    const store = useStore()

    const someResumesNotSaved = computed(() => store.getters['resumes/someResumesNotSaved'])
    const resumesNotReady = computed(() => store.state.resumes.isPending && !store.state.resumes.resumes)
    const experiencesNotReady = computed(() => store.state.experiences.isPending)
    const loading = computed(() => resumesNotReady.value || experiencesNotReady.value)

    // ===== 若未儲存時，跳出確認視窗 =====
    const showConfirmModal = ref(false)
    const confirmLeaving = ref(null)

    const openConfirmModal = () => {
      showConfirmModal.value = true
      return new Promise((resolve) => {
        confirmLeaving.value = resolve
      })
    }

    onBeforeRouteLeave(async(to, from) => {
      if (someResumesNotSaved.value) {
        const confirm = await openConfirmModal()
        showConfirmModal.value = false
        return confirm
      }
    })

    return {
      loading,
      showConfirmModal,
      confirmLeaving
    }
  }
}
</script>

<style lang="scss" scoped>
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
