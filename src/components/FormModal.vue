<template>
  <div class="modal-bg" @click.self="showConfirmModal = true">
    <div class="form-modal">
      <div class="form-modal__content">
        <div>
          <label for="" class="form-label">{{ showedFieldText.name.text }}</label>
          <input
            v-model="formData.name"
            type="text"
            class="form-control"
            placeholder="請輸入課程名稱"
          >
        </div>
        <div>
          <label for="" class="form-label">*課程時間</label>
          <select class="form-control">
            <option
              value=""
              selected
            >
              請選擇課程時間
            </option>
          </select>
        </div>
        <div>
          <label for="" class="form-label">{{ showedFieldText.description.text }}</label>
          <textarea
            v-model="formData.description"
            class="form-control"
            rows="3"
            draggable="false"
            placeholder="填寫課程簡介以便日後方便回想課程內容"
          />
        </div>
        <div>
          <label for="" class="form-label">標籤分類</label>
          <div class="form-modal__content__tags">
            <div class="tag--large">
              國際視野
            </div>
            <div class="tag--large">
              數理能力
            </div>
          </div>
        </div>
        <div>
          <label for="" class="form-label">{{ showedFieldText.feedback.text }}</label>
          <textarea
            v-model="formData.feedback"
            class="form-control"
            rows="3"
            draggable="false"
            placeholder="將課程中所得到的收穫及成就記錄下來吧~"
          />
        </div>
        <div>
          <label for="" class="form-label">其他連結</label>
          <input
            v-model="formData.link"
            type="text"
            class="form-control"
          >
        </div>
        <div class="form-modal__content__btns">
          <button class="btn" @click="showConfirmModal = true">
            取消
          </button>
          <button class="btn--danger">
            儲存
          </button>
        </div>
      </div>
    </div>
  </div>
  <ConfirmModal
    v-if="showConfirmModal"
    confirm-message="確定離開"
    cancel-message="留下"
    @cancel="showConfirmModal = false"
    @confirm="$emit('cancel')"
  />
</template>

<script>
import ConfirmModal from '@/components/ConfirmModal.vue'
import { computed, reactive, ref } from 'vue'

const fieldText = {
  course: {
    name: { text: '*課程名稱', required: true },
    semester: { text: '*課程時間', required: true },
    description: { text: '課程簡介', placeholder: '', required: false },
    feedback: { text: '課程收穫及成就 (150字以內)', placeholder: '', required: false }
  },
  activity: {
    name: { text: '*活動名稱', required: true },
    position: { text: '*活動擔任職位', required: true },
    description: { text: '活動簡介', placeholder: '', required: false },
    feedback: { text: '活動收穫及成就 (150字以內)', placeholder: '', required: false }
  },
  competition: {
    name: { text: '*競賽名稱', required: true },
    position: { text: '*競賽得獎名次', required: true },
    description: { text: '競賽簡介', placeholder: '', required: false },
    feedback: { text: '競賽收穫及成就 (150字以內)', placeholder: '', required: false }
  },
  work: {
    name: { text: '*公司單位名稱', required: true },
    position: { text: '*職位職位', required: true },
    description: { text: '實習 / 工作內容', placeholder: '', required: false },
    feedback: { text: '收穫及成就 (150字以內)', placeholder: '', required: false }
  },
  certification: {
    name: { text: '*證照 名稱', required: true },
    position: { text: '*證照分數或等級', required: true },
    feedback: { text: '收穫及成就 (150字以內)', placeholder: '', required: false }
  },
  other: {
    name: { text: '*經歷名稱', required: true },
    position: { text: '經歷職位、成就', required: true },
    description: { text: '經歷簡介', placeholder: '', required: false },
    feedback: { text: '經歷收穫及成就 (150字以內)', placeholder: '', required: false }
  }
}

export default {
  components: { ConfirmModal },
  props: {
    formType: {
      type: String,
      default: 'activity'
    }
  },
  emits: ['cancel'],
  setup (props) {
    const showConfirmModal = ref(false)

    const showedFieldText = computed(() => {
      return fieldText[props.formType]
    })

    const formData = reactive({
      name: '',
      position: '',
      description: '',
      feedback: '',
      semester: '',
      link: '',
      experienceType: '',
      addTags: []
    })

    return { showConfirmModal, formData, showedFieldText }
  }
}
</script>

<style lang="scss">
@import "../scss/mixins";
.form-modal {
  width: 770px;
  max-height: 80vh;
  padding: 25px;
  background-color: #fff;
  border-radius: 8px;
  display: flex;
}

.form-modal__content {
  @include grid(row, 20px, 0);
  width: 100%;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  &__tags {
    @include grid(column, 0, 6px);
    justify-content: start;
  }
  &__btns {
    @include grid(column, 0, 18px);
    justify-content: end;
  }
}
</style>
