<template>
  <teleport to="#app">
    <div class="confirm-modal modal-bg" @click.self.stop="$emit('cancel')">
      <div class="confirm-modal__content">
        <span v-if="confirmType === 'customize'">{{ message }}</span>
        <span v-else-if="confirmType === 'leave'">離開則無法儲存資料喔！</span>
        <span v-else>
          確定要刪除
          <span class="text--red">{{ message }}</span>
          此項歷程？
        </span>

        <div class="confirm-modal__content__btns">
          <slot>
            <button class="btn" @click.stop="$emit('cancel')">
              {{ cancelMessage }}
            </button>
            <button class="btn--red" @click.stop="$emit('confirm')">
              {{ confirmMessage }}
            </button>
          </slot>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
export default {
  name: 'ConfirmModal',
  props: {
    message: {
      type: String,
      default: '訊息'
    },
    confirmMessage: {
      type: String,
      default: '確定刪除'
    },
    cancelMessage: {
      type: String,
      default: '取消'
    },
    confirmType: {
      type: String,
      default: 'leave',
      validator (value) {
        return ['leave', 'delete', 'customize'].includes(value)
      }
    }
  },
  emits: ['cancel', 'confirm'],
  setup (props, context) {
    return {}
  }
}
</script>

<style lang="scss">
@import '~@/scss/mixins';

.confirm-modal__content {
  padding: 10px 24px;
  max-width: 280px;
  line-height: 24px;
  text-align: center;
  background-color: #fff;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  &__btns {
    @include grid(column, 0, 10px);
    margin-top: 10px;
    justify-content: center;
  }
}
</style>
