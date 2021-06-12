<template>
  <div class="modal-bg" @click.self="leaveForm">
    <div class="form-modal">
      <div class="form-modal__content">
        <p class="form-modal__hint">
          有*欄位代表必填
        </p>
        <div v-if="showedFieldText.name">
          <label for="experienceName" class="form-label">{{
            showedFieldText.name.text
          }}</label>
          <input
            id="experienceName"
            v-model="formData.name"
            type="text"
            class="form-control"
          />
        </div>
        <div v-if="showedFieldText.position">
          <label for="experiencePosition" class="form-label">{{
            showedFieldText.position.text
          }}</label>
          <input
            id="experiencePosition"
            v-model="formData.position"
            type="text"
            class="form-control"
          />
        </div>
        <div v-if="showedFieldText.semester">
          <label class="form-label" for="experienceSemester">{{ showedFieldText.semester.text }}</label>
          <select
            v-if="formType === 'course'"
            id="experienceSemester"
            v-model="formData.semester"
            class="form-control"
          >
            <option value="" disabled>
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
          <div v-else class="form-modal__time">
            <p>開始時間</p>
            <input type="date" class="form-control" />
            <p>結束時間</p>
            <input type="date" class="form-control" />
          </div>
        </div>
        <div v-if="showedFieldText.type">
          <label class="form-label" for="experienceType">{{ showedFieldText.type.text }}</label>
          <select
            id="experienceType"
            v-model="formData.type"
            class="form-control"
          >
            <option value="" disabled>
              請選擇類別
            </option>
            <option
              v-for="type in showedFieldText.type.options"
              :key="type"
              :value="type"
            >
              {{ type }}
            </option>
          </select>
        </div>
        <div v-if="showedFieldText.description">
          <label for="experienceDescription" class="form-label">{{
            showedFieldText.description?.text
          }}</label>
          <textarea
            id="experienceDescription"
            v-model="formData.description"
            class="form-control"
            rows="2"
            :placeholder="showedFieldText.description?.placeholder"
          />
        </div>
        <div>
          <label for="" class="form-label">獲得技能Tag</label>
          <TagSelect v-model:tags="formData.tags" :options="tags" />
        </div>
        <div v-if="showedFieldText.feedback">
          <label for="experienceFeedback" class="form-label">{{
            showedFieldText.feedback.text
          }}</label>
          <textarea
            id="experienceFeedback"
            v-model="formData.feedback"
            class="form-control"
            rows="3"
            maxlength="150"
            :placeholder="showedFieldText.feedback.placeholder"
          />
        </div>
        <div>
          <label for="" class="form-label">
            <span>其他連結</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              style="cursor: pointer;"
              xmlns="http://www.w3.org/2000/svg"
              @click.stop="showMessageModal = true"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8 16C10.1217 16 12.1566 15.1571 13.6569 13.6569C15.1571 12.1566 16 10.1217 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0C5.87827 0 3.84344 0.842855 2.34315 2.34315C0.842855 3.84344 0 5.87827 0 8C0 10.1217 0.842855 12.1566 2.34315 13.6569C3.84344 15.1571 5.87827 16 8 16ZM8.93 6.588L6.64 6.875L6.558 7.255L7.008 7.338C7.302 7.408 7.36 7.514 7.296 7.807L6.558 11.275C6.364 12.172 6.663 12.594 7.366 12.594C7.911 12.594 8.544 12.342 8.831 11.996L8.919 11.58C8.719 11.756 8.427 11.826 8.233 11.826C7.958 11.826 7.858 11.633 7.929 11.293L8.93 6.588ZM8 5.5C8.26522 5.5 8.51957 5.39464 8.70711 5.20711C8.89464 5.01957 9 4.76522 9 4.5C9 4.23478 8.89464 3.98043 8.70711 3.79289C8.51957 3.60536 8.26522 3.5 8 3.5C7.73478 3.5 7.48043 3.60536 7.29289 3.79289C7.10536 3.98043 7 4.23478 7 4.5C7 4.76522 7.10536 5.01957 7.29289 5.20711C7.48043 5.39464 7.73478 5.5 8 5.5Z"
                fill="#2697C7"
              />
            </svg>
          </label>
          <input
            v-model="formData.link"
            type="text"
            class="form-control"
          />
        </div>
        <div class="form-modal__content__btns">
          <button
            v-show="!formStatus.isPending"
            class="btn"
            @click="leaveForm"
          >
            取消
          </button>
          <button
            class="btn--red"
            :disabled="formStatus.isPending"
            @click="handleFormSubmit"
          >
            {{ formStatus.isPending ? '儲存中' : '儲存' }}
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
  <MessageModal
    v-show="showMessageModal"
    message="可以將更多相關資訊（ex.照片、PPT等等）統整到自己的連結裡頭喔！"
    :show="showMessageModal"
    @close="showMessageModal = false"
  />
</template>

<script>
import ConfirmModal from '@/components/ConfirmModal.vue'
import MessageModal from '@/components/MessageModal.vue'
import { computed, reactive, ref } from 'vue'
import { addExperience, updateExperience } from '@/api/experiences'
// import { addTag } from '@/api/tags'
import useTags from '@/composables/tags/useTags'
import TagSelect from '@/components/TagSelect.vue'

const fieldText = {
  course: {
    name: { text: '*課程名稱', required: true },
    type: { text: '課程類別', required: false, options: ['必修課程', '選修課程', '通識', '工作坊', '密集課程', '線上課程'] },
    semester: { text: '*課程時間', required: true },
    description: {
      text: '課程簡介',
      placeholder: '填寫課程簡介以便日後方便回想課程內容',
      required: false
    },
    feedback: {
      text: '課程收穫及成就 (150字以內)',
      placeholder:
        '將課程中所得到的收穫及成就記錄下來，或是寫出課程內容的特色吧',
      required: false
    }
  },
  activity: {
    name: { text: '*活動名稱', required: true },
    type: { text: '活動類別', required: false, options: ['社團', '系內活動', '校內活動', '校外活動', '其他'] },
    semester: { text: '*活動時間', required: true },
    position: { text: '*活動擔任職位', required: true },
    description: {
      text: '活動簡介',
      placeholder: '填寫活動簡介以便日後方便回想活動內容',
      required: false
    },
    feedback: {
      text: '活動收穫及成就 (150字以內)',
      placeholder: '將活動中所得到的收穫及成就記錄下來吧~',
      required: false
    }
  },
  competition: {
    name: { text: '*競賽名稱', required: true },
    semester: { text: '*競賽時間', required: true },
    position: { text: '*競賽得獎名次', required: true },
    description: {
      text: '競賽簡介',
      placeholder: '填寫競賽簡介以便日後方便回想競賽內容',
      required: false
    },
    feedback: {
      text: '競賽收穫及成就 (150字以內)',
      placeholder: '將競賽中所得到的收穫及成就記錄下來吧~',
      required: false
    }
  },
  work: {
    name: { text: '*公司單位名稱', required: true },
    semester: { text: '*實習 / 工作時間', required: true },
    position: { text: '*職位職位', required: true },
    description: {
      text: '實習 / 工作內容',
      placeholder: '填寫以便日後方便回想實習 / 工作內容',
      required: false
    },
    feedback: {
      text: '收穫及成就 (150字以內)',
      placeholder: '將實習 / 工作中所得到的收穫及成就記錄下來吧~',
      required: false
    }
  },
  certificate: {
    name: { text: '*證照名稱', required: true },
    semester: { text: '*考取時間', required: true },
    position: { text: '*證照分數或等級', required: true },
    feedback: {
      text: '收穫及成就 (150字以內)',
      placeholder: '將過程中所得到的收穫及成就記錄下來吧~',
      required: false
    }
  },
  other: {
    name: { text: '*經歷名稱', required: true },
    semester: { text: '時間', required: false },
    position: { text: '經歷職位、成就', required: true },
    description: {
      text: '經歷簡介',
      placeholder: '填寫簡介以便日後方便回想經歷內容',
      required: false
    },
    feedback: {
      text: '經歷收穫及成就 (150字以內)',
      placeholder: '將過程中所得到的收穫及成就記錄下來吧~',
      required: false
    }
  }
}

export default {
  name: 'FormModal',
  components: { ConfirmModal, MessageModal, TagSelect },
  props: {
    formType: {
      type: String,
      default: 'activity',
      validator (value) {
        return ['course', 'activity', 'competition', 'work', 'certificate', 'other'].indexOf(value) !== -1
      }
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
    // === 離開時跳出確認視窗 ===
    const showConfirmModal = ref(false)
    const leaveForm = () => {
      if (formStatus.isPending) {
        return
      }
      showConfirmModal.value = true
    }

    // === 顯示提示訊息 ===
    const showMessageModal = ref(false)

    // === 顯示不同類型對應的文字 ===
    const showedFieldText = computed(() => {
      return fieldText[props.formType]
    })

    // === 產生學期選項（往前5個學期） ===
    const year = new Date().getFullYear() - 1911
    const semesters = [...Array(5).keys()]
      .map((_, i) => {
        return [`${year - i}-1`, `${year - i}-2`]
      })
      .flat()

    // === 產生所有的tag ===
    const { tags } = useTags()

    // 儲存填入的資料，若有傳入要編輯的資料，則設為預設值
    const formData = reactive({
      name: props.editData?.name || '',
      position: props.editData?.position || '',
      description: props.editData?.description || '',
      feedback: props.editData?.feedback || '',
      semester: props.editData?.semester || '',
      link: props.editData?.link || '',
      experienceType: props.formType,
      // tags: props.editData?.tags.map(tag => tag.id) || []
      tags: props.editData?.tags || []
      // TODO: 新增開始/結束時間欄位、課程/活動類別欄位
    })

    const formStatus = reactive({
      error: null,
      isPending: false
    })
    const handleFormSubmit = async () => {
      try {
        formStatus.isPending = true
        formStatus.error = null
        if (props.editData) {
          // TODO: 處理編輯錯誤
          const res = await updateExperience(props.editData.id, {
            ...formData,
            tags: formData.tags.map(tag => tag.id)
          })
          console.log(res)
        } else {
          await addExperience({
            ...formData,
            tags: formData.tags.map(tag => tag.id)
          })
        }
        context.emit('submit')
      } catch (error) {
        console.log(error)
        formStatus.error = error
      } finally {
        formStatus.isPending = false
      }
    }

    const tagsMultiselect = ref(null)
    const handleSelectTag = () => {
      tagsMultiselect.value.close()
    }

    return {
      tags,
      showConfirmModal,
      leaveForm,
      showMessageModal,
      formData,
      showedFieldText,
      semesters,
      handleFormSubmit,
      tagsMultiselect,
      handleSelectTag,
      formStatus
    }
  }
}
</script>

<style lang="scss">
@import '../scss/mixins';
@import '../scss/variables';

.form-modal {
  width: 100%;
  max-width: 770px;
  max-height: 80vh;
  padding: 25px 25px 20px;
  background-color: #fff;
  border-radius: 8px;
  display: flex;
  &__hint {
    color: $gray-3;
  }
  &__time {
    display: grid;
    align-items: center;
    grid-template-columns: auto 1fr auto 1fr;
    column-gap: 10px;
  }
}

.form-modal__content {
  @include grid(row, 20px, 0);
  width: 100%;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  select {
    appearance: none;
  }
  &__tags {
    @include grid(column, 0, 6px);
    justify-content: start;
  }
  &__btns {
    @include grid(column, 0, 18px);
    justify-content: end;
    padding-bottom: 5px;
  }
}

.multiselect-input {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}
.is-open .multiselect-input {
  border-radius: 8px 8px 0 0;
}
.is-tags .multiselect-search input {
  margin: 0;
}
.multiselect-tags {
  margin-top: 0;
  padding-top: 5px;
  padding-bottom: 5px;
  .multiselect-tag {
    display: flex;
    color: #000;
    font-weight: normal;
    background-color: #f2f2f2;
    border-radius: 50px;
    line-height: 1.5;
    padding: 4px 8px;
    margin: 0 5px 0 0;
  }
  i::before {
    color: $red;
    border-radius: 50%;
  }
  i:hover::before {
    color: $red;
    background: #ffffff;
  }
}
.multiselect-clear,
.multiselect-caret {
  display: none;
}
</style>
