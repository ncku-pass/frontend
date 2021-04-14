<template>
  <div class="modal-bg" @click.self="showConfirmModal = true">
    <div class="form-modal">
      <div class="form-modal__content">
        <div v-if="showedFieldText.name">
          <label for="" class="form-label">{{ showedFieldText.name.text }}</label>
          <input
            v-model="formData.name"
            type="text"
            class="form-control"
          >
        </div>
        <div v-if="showedFieldText.semester">
          <label for="" class="form-label">{{ showedFieldText.semester.text }}</label>
          <select v-model="formData.semester" class="form-control">
            <option
              value=""
              selected
            >
              請選擇時間
            </option>
            <option
              v-for="semester in semesters"
              :key="semester"
              :value="semester"
            >
              {{ semester }}
            </option>
          </select>
        </div>
        <div v-if="showedFieldText.description">
          <label for="" class="form-label">{{ showedFieldText.description?.text }}</label>
          <textarea
            v-model="formData.description"
            class="form-control"
            rows="3"
            draggable="false"
            :placeholder="showedFieldText.description?.placeholder"
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
        <div v-if="showedFieldText.feedback">
          <label for="" class="form-label">{{ showedFieldText.feedback.text }}</label>
          <textarea
            v-model="formData.feedback"
            class="form-control"
            rows="3"
            draggable="false"
            :placeholder="showedFieldText.feedback.placeholder"
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
          <button class="btn--danger" @click="handleFormSubmit">
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
    @confirm="$emit('close')"
  />
</template>

<script>
import ConfirmModal from '@/components/ConfirmModal.vue'
import { computed, reactive, ref } from 'vue'
import { addExperience, updateExperience } from '@/api/experiences'

const fieldText = {
  course: {
    name: { text: '*課程名稱', required: true },
    semester: { text: '*課程時間', required: true },
    description: { text: '課程簡介', placeholder: '填寫課程簡介以便日後方便回想課程內容', required: false },
    feedback: { text: '課程收穫及成就 (150字以內)', placeholder: '將課程中所得到的收穫極成就記錄下來吧~', required: false }
  },
  activity: {
    name: { text: '*活動名稱', required: true },
    semester: { text: '*活動時間', required: true },
    position: { text: '*活動擔任職位', required: true },
    description: { text: '活動簡介', placeholder: '填寫活動簡介以便日後方便回想課程內容', required: false },
    feedback: { text: '活動收穫及成就 (150字以內)', placeholder: '將活動中所得到的收穫及成就記錄下來吧~', required: false }
  },
  competition: {
    name: { text: '*競賽名稱', required: true },
    semester: { text: '*競賽時間', required: true },
    position: { text: '*競賽得獎名次', required: true },
    description: { text: '競賽簡介', placeholder: '填寫競賽簡介以便日後方便回想課程內容', required: false },
    feedback: { text: '競賽收穫及成就 (150字以內)', placeholder: '將競賽中所得到的收穫及成就記錄下來吧~', required: false }
  },
  work: {
    name: { text: '*公司單位名稱', required: true },
    semester: { text: '*實習 / 工作時間', required: true },
    position: { text: '*職位職位', required: true },
    description: { text: '實習 / 工作內容', placeholder: '填寫以便日後方便回想實習 / 工作內容', required: false },
    feedback: { text: '收穫及成就 (150字以內)', placeholder: '將實習 / 工作中所得到的收穫及成就記錄下來吧~', required: false }
  },
  certificate: {
    name: { text: '*證照名稱', required: true },
    semester: { text: '*考取時間', required: true },
    position: { text: '*證照分數或等級', required: true },
    feedback: { text: '收穫及成就 (150字以內)', placeholder: '將過程中所得到的收穫及成就記錄下來吧~', required: false }
  },
  other: {
    name: { text: '*經歷名稱', required: true },
    semester: { text: '時間', required: false },
    position: { text: '經歷職位、成就', required: true },
    description: { text: '經歷簡介', placeholder: '填寫簡介以便日後方便回想經歷內容', required: false },
    feedback: { text: '經歷收穫及成就 (150字以內)', placeholder: '將過程中所得到的收穫及成就記錄下來吧~', required: false }
  }
}

export default {
  components: { ConfirmModal },
  props: {
    formType: {
      type: String,
      default: 'activity'
    },
    editData: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  emits: ['close', 'submit'],
  setup (props, context) {
    const showConfirmModal = ref(false)

    // 顯示不同類型對應的文字
    const showedFieldText = computed(() => {
      return fieldText[props.formType]
    })

    // 產生學期選項（往前10個學期）
    const year = new Date().getFullYear() - 1911
    const semesters = [...Array(10).keys()]
      .map((_, i) => {
        return [`${year - i}-1`, `${year - i}-2`]
      })
      .flat()

    // 儲存填入的資料，若有傳入要編輯的資料，則設為預設值
    const formData = reactive({
      name: props.editData?.name || '',
      position: props.editData?.position || '',
      description: props.editData?.description || '',
      feedback: props.editData?.feedback || '',
      semester: props.editData?.semester || '',
      link: props.editData?.link || '',
      experienceType: props.formType,
      addTags: props.editData?.tags || []
    })

    const handleFormSubmit = async () => {
      try {
        if (props.editData) {
          // TODO: 處理編輯錯誤
          await updateExperience(formData)
        } else {
          await addExperience(formData)
        }
        context.emit('submit')
      } catch (error) {
        console.log(error)
      }
    }

    return { showConfirmModal, formData, showedFieldText, semesters, handleFormSubmit }
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
