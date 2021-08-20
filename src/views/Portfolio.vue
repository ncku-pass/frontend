<template>
  <div class="portfolio">
    <template v-if="loading">
      <div class="portfolio__loading">
        <p>Loading</p>
        <div class="lds-dual-ring" />
      </div>
      <div class="portfolio__loading-left" />
      <div class="portfolio__loading-right" />
    </template>
    <template v-else>
      <PortfolioMain />
      <PortfolioMenu />
    </template>
    <ConfirmModal
      v-if="showConfirmModal"
      confirm-type="customize"
      message="尚未儲存履歷，確定要離開嗎？"
      cancelMessage="留下"
      confirmMessage="離開"
      @cancel="confirmLeaving(false)"
      @confirm="confirmLeaving(true)"
    />
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { onBeforeRouteLeave } from 'vue-router'
import PortfolioMain from '@/components/Portfolio/PortfolioMain'
import PortfolioMenu from '@/components/Portfolio/PortfolioMenu'
import ConfirmModal from '@/components/ConfirmModal'

export default {
  name: 'Portfolio',
  components: {
    PortfolioMain,
    PortfolioMenu,
    ConfirmModal
  },
  setup () {
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

    onBeforeRouteLeave(async (to, from) => {
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
@import '~@/scss/variables';

.portfolio {
  position: relative;
  display: grid;
  grid-template-columns: 7fr 3fr;
  gap: 0 30px;
  height: 100%;
  max-width: 1110px;
  margin: 0 auto;
  &__loading {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    font-size: 26px;
  }
}
.portfolio__loading-left {
  margin: 26px 0;
  background-color: $gray-6;
  filter: drop-shadow(-2px 4px 30px rgba(241, 90, 96, 0.05)) drop-shadow(-2px 4px 30px rgba(241, 90, 96, 0.1));
  border-radius: 10px 10px 0px 0px;
  height: 70%;
}
.portfolio__loading-right {
  margin: 26px 0;
  background-color: $gray-6;
  border-radius: 10px;
}
</style>
