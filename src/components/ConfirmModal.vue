<template>
  <div class="confirm-modal" @click.self="$emit('cancel')">
    <div class="confirm-modal__content">
      <span v-if="confirmType === 'customize'">{{ message }}</span>
      <span v-else-if="confirmType === 'leave'">離開則無法儲存資料喔！</span>
      <span v-else>確定要刪除<span class="text--red">{{ message }}</span>此項歷程？</span>

      <div class="confirm-modal__btns">
        <button class="btn" @click="$emit('cancel')">
          取消
        </button>
        <button class="btn--danger" @click="$emit('confirm')">
          {{ confirmMessage }}
        </button>
      </div>
    </div>
  </div>
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
    confirmType: {
      type: String,
      default: 'leave',
      validator (value) {
        return ['leave', 'delete', 'customize'].indexOf(value) !== -1
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
.confirm-modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: grid;
  place-items: center;
  background-color: rgba(0, 0, 0, 0.25);
  &__content {
    padding: 10px 24px;
    width: 230px;
    line-height: 24px;
    text-align: center;
    background-color: #fff;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
  }
  &__btns {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
}
</style>
