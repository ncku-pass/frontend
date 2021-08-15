<template>
  <teleport to="#app">
    <div v-show="show" class="message-modal modal-bg" @click.self.stop="handleClick">
      <div class="message-modal__content">
        <slot>
          <template v-if="messageType === 'link'">
            <p>可以將更多相關資訊（ex.照片、PPT等等）統整到自己的連結裡頭喔！</p>
            <p>若有多個連結，使用<code class="inline-code">,</code>將連結隔開</p>
          </template>
          <div v-if="messageType === 'tags'" class="message-modal__tags">
            <b>創建Tag</b>
            <p>在Tag前面加上<code class="inline-code">#</code>，輸入完畢後按下<code class="inline-code">Enter</code>新增</p>
            <b>搜尋Tag</b>
            <p>直接輸入要搜尋的Tag名稱</p>
          </div>
        </slot>
      </div>
    </div>
  </teleport>
</template>

<script>
import { ref, watchEffect } from '@vue/runtime-core'
export default {
  name: 'MessageModal',
  props: {
    duration: {
      type: Number,
      default: 1500
    },
    show: {
      type: Boolean,
      default: false
    },
    messageType: {
      type: String,
      default: ''
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

<style lang="scss" scoped>
@import '~@/scss/variables';

.message-modal__content {
  padding: 11px 12px;
  width: 300px;
  line-height: 24px;
  text-align: center;
  background-color: #fff;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
}

.message-modal__tags {
  display: flex;
  flex-direction: column;
  gap: 5px;
  b {
    color: $blue-dark;
  }
}
</style>
