<template>
  <div class="portfolio">
    <PortfolioMain />
    <PortfolioMenu />
  </div>
</template>

<script>
import PortfolioMain from '@/components/Portfolio/PortfolioMain'
import PortfolioMenu from '@/components/Portfolio/PortfolioMenu'

export default {
  name: 'Portfolio',
  components: {
    PortfolioMain,
    PortfolioMenu
  },
  setup () {
  }
}
</script>

<style lang="scss" scoped>
.portfolio {
  display: grid;
  grid-template-columns: 7fr 3fr;
  gap: 0 30px;
  height: 100%;
  max-width: 1110px;
  margin: 0 auto;
}
</style>
