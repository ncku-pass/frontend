<template>
  <teleport to="#app">
    <div
      v-show="showModal"
      class="modal-bg"
      @click.self.stop="$emit('close')"
    >
      <div class="template-modal">
        <div class="template-modal__content">
          <select v-model="selected" class="template-modal__select">
            <option
              v-for="option in options"
              :key="option"
              :value="option"
            >
              {{ option }}
            </option>
          </select>
          <p class="template-modal__intro">
            {{ intro }}
          </p>
          <div ref="templatePreview" class="template-modal__preview">
            <div class="template-modal__preview__content">
              <img
                v-show="selected === '升學備審'"
                src="@/assets/Portfolio/升學備審.png"
                alt="升學備審範本"
                rel="preload"
              />
              <img
                v-show="selected === '工作履歷'"
                src="@/assets/Portfolio/工作履歷.png"
                alt="工作履歷範本"
                rel="preload"
              />
              <img
                v-show="selected === '個人整理'"
                src="@/assets/Portfolio/個人整理.png"
                alt="個人整理範本"
                rel="preload"
              />
              <img
                v-show="selected === '實習履歷'"
                src="@/assets/Portfolio/實習履歷.png"
                alt="實習履歷範本"
                rel="preload"
              />
            </div>
          </div>
          <p class="template-modal__hint">
            模板樣本
          </p>
          <div class="template-modal__btns">
            <button class="btn" @click.stop="$emit('close')">
              取消
            </button>
            <button class="btn--red" @click.stop="handleAddTemplate">
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import { computed, ref, watch } from 'vue'
const options = ['升學備審', '工作履歷', '個人整理', '實習履歷']
const intros = {
  升學備審: '自我介紹、必修優異課程、特殊經歷、研究計畫、語言證照',
  工作履歷: '自我介紹、專長科目、英文教學經驗、語言證照、優異課程',
  個人整理: '行銷設計、創意執行能力、簡報力、語言能力證明',
  實習履歷: '自我介紹、設計軟體、產品規劃及表達、專案執行、課外活動、語言證照'
}
const template = {
  升學備審: [
    ...generateCard('text', ['自我介紹']),
    ...generateCard('experience', ['必修優異課程', '特殊經歷', '研究計畫', '語言證照'])
  ],
  工作履歷: [
    ...generateCard('text', ['自我介紹']),
    ...generateCard('experience', ['專長科目', '特殊經歷', '英文教學經驗', '語言證照', '優異課程'])
  ],
  個人整理: [
    ...generateCard('text', ['行銷設計']),
    ...generateCard('experience', ['創意執行能力', '簡報力', '語言能力證明'])
  ],
  實習履歷: [
    ...generateCard('text', ['自我介紹']),
    ...generateCard('experience', ['設計軟體', '產品規劃及表達', '專案執行', '課外活動', '語言證照'])
  ]
}

export default {
  name: 'TemplateModal',
  props: {
    showModal: {
      type: Boolean,
      required: true
    }
  },
  emits: ['close', 'choose'],
  setup (props, { emit }) {
    const selected = ref(options[0])
    const templatePreview = ref(null)

    const intro = computed(() => {
      return intros[selected.value]
    })

    watch(selected, () => {
      templatePreview.value.scrollTop = 0
    })

    const handleAddTemplate = () => {
      emit('choose', {
        name: selected.value,
        cards: template[selected.value]
      })
    }

    return {
      templatePreview,
      selected,
      options,
      intro,
      handleAddTemplate
    }
  }
}

function generateCard (type = 'experience', names = []) {
  return names.map(name => {
    return {
      id: 0,
      name,
      experiences: [],
      text: '',
      type
    }
  })
}
</script>

<style lang="scss" scoped>
@import '~@/scss/variables';
@import "~@/scss/mixins";

.template-modal {
  display: flex;
  position: relative;
  // width: 100%;
  max-width: 770px;
  max-height: 80vh;
  padding: 28px;
  background-color: #fff;
  border-radius: 8px;
  overflow-y: auto;
  &__content {
    display: flex;
    display: grid;
    grid-auto-flow: row;
    gap: 20px 0;
    justify-content: center;
    overflow-y: auto;
  }
  &__select {
    margin: 0 auto;
    padding: 6px 20px;
    border-radius: 5px;
    border-color: $gray-4;
    color: $gray-1;
  }
  &__intro {
    text-align: center;
  }
  &__preview {
    overflow-y: auto;
    &__content {
      overflow-y: auto;
    }
    img {
      width: 100%;
    }
  }
  &__hint {
    text-align: center;
    color: $gray-3;
  }
  &__btns {
    @include grid(column, 0, 10px);
    justify-content: center;
  }
}
</style>
