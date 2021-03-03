import { ref } from 'vue'
/**
 * 用來取得設置在.shadow-container上的Event Handler (setShadows)
 * @example <div class="shadow-container" v-on:scroll.capture="setShadows">
 */
const useScrollShadow = () => {
  const isScrolling = ref(false)
  /**
   * 設定滾動容器的上下陰影。
   *  不在頂端加上.off-top、
   *  不在底部加上.off-bottom
   */
  const setShadows = (event) => {
    const shadowContainer = event.currentTarget
    const scrollContent = event.target
    if (!isScrolling.value) {
      window.requestAnimationFrame(() => {
        if (scrollContent.scrollTop > 0) {
          shadowContainer.classList.add('off-top')
        } else {
          shadowContainer.classList.remove('off-top')
        }
        if (scrollContent.offsetHeight + scrollContent.scrollTop < scrollContent.scrollHeight) {
          shadowContainer.classList.add('off-bottom')
        } else {
          shadowContainer.classList.remove('off-bottom')
        }
        isScrolling.value = false
      })
      isScrolling.value = true
    }
  }

  const initShadows = (scrollContent) => {
    const shadowContainer = scrollContent.parentNode
    if (scrollContent.offsetHeight + scrollContent.scrollTop < scrollContent.scrollHeight) {
      shadowContainer.classList.add('off-bottom')
    } else {
      shadowContainer.classList.remove('off-bottom')
    }
  }

  return { setShadows, initShadows }
}

export default useScrollShadow
