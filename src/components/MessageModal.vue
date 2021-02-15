<template>
  <div
    class="message-modal"
    @click.self="$emit('close')"
  >
    <div class="message-modal__content">
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'MessageModal',
  props: {
    message: {
      type: String,
      default: '訊息'
    },
    duration: {
      type: Number,
      default: 1000
    }
  },
  emits: ['close'],
  setup (props, context) {
    setTimeout(() => {
      context.emit('close')
    }, props.duration)

    return {}
  }
}
</script>

<style lang="scss">
.message-modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: grid;
  place-items: center;
  background-color: rgba(0, 0, 0, 0.25);
  &__content {
    padding: 11px 12px;
    width: 230px;
    line-height: 24px;
    text-align: center;
    background-color: #fff;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
  }
}
</style>
