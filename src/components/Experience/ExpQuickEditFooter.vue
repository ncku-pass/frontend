<template>
  <div class='experience__footer'>
    <Button
      class='p-button-secondary p-button-outlined'
      label='取消'
      @click='toggleQuickEditMode'
    />
    <Button
      label='儲存變更'
      :disabled='!isQuickEditDirty'
      @click='saveQuickEditChanges'
    />
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'ExpQuickEditFooter',
  components: {
  },
  setup() {
    const store = useStore()
    const isQuickEditDirty = computed(() => store.getters['expQuickEdit/isQuickEditDirty'])

    const toggleQuickEditMode = () => {
      store.dispatch('expQuickEdit/TOGGLE_QUICK_EDIT_MODE')
    }

    const saveQuickEditChanges = () => {
      store.dispatch('expQuickEdit/CONFIRM_QUICK_EDIT_CHANGE')
    }

    return {
      toggleQuickEditMode,
      saveQuickEditChanges,
      isQuickEditDirty
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
