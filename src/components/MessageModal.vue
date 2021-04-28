<template>
  <div
    class="message-modal modal-bg"
    @click.self="handleClick"
  >
    <div class="message-modal__content">
      {{ message }}
    </div>
  </div>
</template>

<script>
import { ref, watchEffect } from '@vue/runtime-core'
export default {
  name: 'MessageModal',
  props: {
    message: {
      type: String,
      default: '訊息'
    },
    duration: {
      type: Number,
      default: 1500
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close'],
  setup (props, context) {
    const timer = ref(null)

    const handleClick = () => {
      clearTimeout(timer.value)
      context.emit('close')
    }

    watchEffect(() => {
      if (props.show) {
        timer.value = setTimeout(() => {
          context.emit('close')
        }, props.duration)
      }
    })

    return { handleClick }
  }
}
</script>

<style lang="scss">
.message-modal__content {
  padding: 11px 12px;
  width: 230px;
  line-height: 24px;
  text-align: center;
  background-color: #fff;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
}
</style>
