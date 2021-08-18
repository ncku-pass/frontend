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
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { onBeforeRouteLeave } from 'vue-router'
import { useToast } from 'vue-toastification'
import PortfolioMain from '@/components/Portfolio/PortfolioMain'
import PortfolioMenu from '@/components/Portfolio/PortfolioMenu'

export default {
  name: 'Portfolio',
  components: {
    PortfolioMain,
    PortfolioMenu
  },
  setup () {
    const store = useStore()
    const toast = useToast()

    const someResumesNotSaved = computed(() => store.getters['resumes/someResumesNotSaved'])
    const resumesNotReady = computed(() => store.state.resumes.isPending && !store.state.resumes.resumes)
    const tagsNotReady = computed(() => store.state.tags.isPending)
    const experiencesNotReady = computed(() => store.state.experiences.isPending)

    const loading = computed(() => resumesNotReady.value || tagsNotReady.value || experiencesNotReady.value)

    onBeforeRouteLeave((to, from) => {
      if (someResumesNotSaved.value) {
        toast.info('有尚未儲存的履歷喔！')
      }
    })

    return {
      loading
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
