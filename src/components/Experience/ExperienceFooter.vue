<template>
  <div class='experience__footer'>
    <AddExperienceButton
      :show-badge='showButtonBadge'
      @add-experience='$emit("add-experience")'
      @import-ncku-data='$emit("import-ncku-data")'
    />
    <MqResponsive target='tablet+'>
      <Button class='btn-icon' @click='toggleQuickEditMode'>
        <mdicon name='squareEditOutline' />
        <p>快速編輯</p>
      </Button>
    </MqResponsive>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { MqResponsive } from 'vue3-mq'

import AddExperienceButton from '@/components/Experience/ExperienceEdit/ExpEditButton'

export default {
  name: 'ExperienceFooter',
  components: {
    AddExperienceButton,
    MqResponsive,
  },
  props: {
    showButtonBadge: {
      type: Boolean,
      required: true,
    }
  },
  emits: ['add-experience', 'import-ncku-data'],
  setup() {
    const store = useStore()

    const toggleQuickEditMode = () => {
      store.commit('expQuickEdit/TOGGLE_QUICK_MODE')
    }

    return {
      toggleQuickEditMode
    }
  }
}
</script>

<style lang='scss' scoped>
@import '~@/scss/mixins';

.experience__footer {
  @include grid(column, 0, 20px);
  margin-left: auto;
  margin-right: auto;
  flex-shrink: 0;

  .btn-icon {
    height: 37px;
  }
}
</style>
