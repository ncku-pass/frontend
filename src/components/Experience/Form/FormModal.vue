<template>
  <teleport to='#app'>
    <div class='modal-bg' @mousedown.self='leaveForm'>
      <div class='form-modal'>
        <form class='form-modal__content' autocomplete='off' @submit.prevent='handleFormSubmit'>
          <div class='form-modal__hint'>
            <p>有*欄位代表必填</p>
            <mdicon name='close' @click='leaveForm' />
          </div>
          <div v-if='showedFieldText.name'>
            <label for='experienceName' class='form-label'>{{ showedFieldText.name.text }}</label>
            <input
              id='experienceName'
              v-model='formData.name'
              :placeholder='showedFieldText.name?.placeholder'
              type='text'
              class='form-control'
              :required='showedFieldText.name.required'
            />
          </div>
          <div v-if='showedFieldText.position'>
            <label for='experiencePosition' class='form-label'>
              {{ showedFieldText.position.text }}
              <InformationCircleIcon v-if='showedFieldText.position.showInfo' class='form-label__info' @click.stop='openMessageModal("score")' />
            </label>
            <input
              id='experiencePosition'
              v-model='formData.position'
              :type='get(showedFieldText, "position.type", "text")'
              class='form-control'
              :required='showedFieldText.position.required'
            />
          </div>
          <div v-if='showedFieldText.semester'>
            <label class='form-label' for='experienceSemester'>{{ showedFieldText.semester.text }}</label>
            <select
              v-if='formType === "course"'
              id='experienceSemester'
              v-model='formData.semester'
              class='form-control'
              :class='{ "not-selected": !formData.semester }'
              :required='showedFieldText.semester.required'
            >
              <option value='' disabled>
                請選擇時間
              </option>
              <option v-for='semester in semesters' :key='semester' :value='semester'>
                {{ semester }}
              </option>
            </select>
            <div v-else class='form-modal__time'>
              <p>*開始時間</p>
              <input v-model='formData.dateStart' type='date' class='form-control' :max='todayString' required />
              <p>結束時間</p>
              <input v-model='formData.dateEnd' type='date' class='form-control' :min='formData.dateStart' />
            </div>
          </div>
          <div v-if='showedFieldText.categories'>
            <label class='form-label'>{{ showedFieldText.categories.text }}</label>
            <Multiselect
              v-model='formData.categories'
              :options='showedFieldText.categories.options'
              :required='showedFieldText.categories.required'
              mode='tags'
            >
              <template #tag='{ option, handleTagRemove, disabled }'>
                <div class='multiselect-tag tag--large'>
                  {{ option.value }}
                  <i v-if='!disabled' @click.prevent @mousedown.prevent.stop='handleTagRemove(option, $event)' />
                </div>
              </template>
            </Multiselect>
          </div>
          <div v-if='showedFieldText.description'>
            <label for='experienceDescription' class='form-label'>{{ showedFieldText.description?.text }}</label>
            <textarea
              id='experienceDescription'
              v-model='formData.description'
              class='form-control'
              rows='2'
              maxlength='500'
              :placeholder='showedFieldText.description?.placeholder'
              :required='showedFieldText.description.required'
            />
          </div>
          <details v-if='formData.coreAbilities'>
            <summary title='（點擊展開/收合）'>
              核心能力
            </summary>
            <p>{{ formData.coreAbilities }}</p>
          </details>
          <div>
            <label class='form-label'>
              <span>獲得技能Tag</span>
              <InformationCircleIcon class='form-label__info' @click.stop='openMessageModal("tags")' />
            </label>
            <TagSelect v-model:selectedTags='formData.tags' />
          </div>
          <div v-if='showedFieldText.feedback'>
            <label for='experienceFeedback' class='form-label'>{{ showedFieldText.feedback.text }}</label>
            <textarea
              id='experienceFeedback'
              v-model='formData.feedback'
              class='form-control'
              rows='3'
              maxlength='500'
              :placeholder='showedFieldText.feedback.placeholder'
              :required='showedFieldText.feedback.required'
            />
          </div>
          <div>
            <label for='experienceLink' class='form-label'>
              <span>{{ showedFieldText.link.text }}</span>
              <InformationCircleIcon class='form-label__info' @click.stop='openMessageModal("link")' />
            </label>
            <input id='experienceLink' v-model='formData.link' type='text' class='form-control' />
          </div>
          <div class='form-modal__content__btns'>
            <button v-show='!requestStatus.isPending' class='btn' type='button' @click='leaveForm'>
              取消
            </button>
            <button class='btn--red' :disabled='requestStatus.isPending' type='submit'>
              {{ requestStatus.isPending ? '儲存中' : '儲存' }}
            </button>
          </div>
        </form>
      </div>
    </div>
    <ConfirmModal
      v-if='showConfirmModal'
      confirm-message='確定離開'
      cancel-message='留下'
      @cancel='showConfirmModal = false'
      @confirm='$emit("close")'
    />
    <MessageModal :duration='6000' :show='showMessageModal' :messageType='messageType' @close='showMessageModal = false' />
  </teleport>
</template>

<script>
import { computed, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import Multiselect from '@vueform/multiselect'
import { InformationCircleIcon } from '@heroicons/vue/solid'
import { useToast } from 'vue-toastification'
import { get } from 'lodash-es'
import ConfirmModal from '@/components/ConfirmModal.vue'
import MessageModal from '@/components/MessageModal.vue'
import TagSelect from '@/components/Experience/Form/TagSelect.vue'

const fieldText = {
  course: {
    name: { text: '*課程名稱', required: true },
    categories: {
      text: '課程類別',
      required: false,
      options: ['必修課程', '選修課程', '通識', '工作坊', '密集課程', '線上課程']
    },
    semester: { text: '*課程時間', required: true },
    position: { text: '課程分數', required: false, type: 'number', showInfo: true },
    description: {
      text: '課程簡介 (500字以內)',
      placeholder: '填寫課程簡介以便日後方便回想課程內容',
      required: false
    },
    feedback: {
      text: '課程收穫及成就 (500字以內)',
      placeholder: '將課程中所得到的收穫及成就記錄下來，或是寫出課程內容的特色吧',
      required: false
    },
    link: {
      text: '作品和相關證明'
    }
  },
  activity: {
    name: { text: '*活動名稱', required: true },
    categories: { text: '活動類別', required: false, options: ['社團', '系內活動', '校內活動', '校外活動', '其他'] },
    semester: { text: '*活動時間', required: true },
    position: { text: '*活動擔任職位', required: true, showInfo: false },
    description: {
      text: '活動簡介 (500字以內)',
      placeholder: '填寫活動簡介以便日後方便回想活動內容',
      required: false
    },
    feedback: {
      text: '活動收穫及成就 (500字以內)',
      placeholder: '將活動中所得到的收穫及成就記錄下來吧～若有辦理相關活動也可紀錄下來唷',
      required: false
    },
    link: {
      text: '作品和相關證明'
    }
  },
  competition: {
    name: { text: '*競賽名稱', required: true, placeholder: '可以填入競賽名稱、組別、獲獎類別（國內/國外）、類型（個人/團體）' },
    semester: { text: '*競賽時間', required: true },
    position: { text: '*競賽獲得獎項', required: true, showInfo: false },
    description: {
      text: '競賽簡介 (500字以內)',
      placeholder: '填寫競賽簡介以便日後方便回想競賽內容',
      required: false
    },
    feedback: {
      text: '競賽收穫及成就 (500字以內)',
      placeholder: '將競賽中所得到的收穫及成就記錄下來吧~',
      required: false
    },
    link: {
      text: '作品和相關證明'
    }
  },
  work: {
    name: { text: '*公司單位名稱', required: true },
    semester: { text: '*實習 / 工作時間', required: true },
    position: { text: '*職位', required: true, showInfo: false },
    description: {
      text: '實習 / 工作內容 (500字以內)',
      placeholder: '填寫以便日後方便回想實習 / 工作內容',
      required: false
    },
    feedback: {
      text: '收穫及成就 (500字以內)',
      placeholder: '將實習 / 工作中所得到的收穫及成就記錄下來吧~',
      required: false
    },
    link: {
      text: '相關證明'
    }
  },
  certificate: {
    name: { text: '*證照/檢定名稱', required: true },
    semester: { text: '*考取時間', required: true },
    position: { text: '*證照分數或等級', required: true, showInfo: false },
    feedback: {
      text: '收穫及成就 (500字以內)',
      placeholder: '將過程中所得到的收穫及成就記錄下來吧~',
      required: false
    },
    link: {
      text: '相關證明'
    }
  },
  other: {
    name: { text: '*經歷名稱', required: true },
    semester: { text: '時間', required: false },
    position: { text: '*經歷職位、成就', required: true, showInfo: false },
    description: {
      text: '經歷簡介 (500字以內)',
      placeholder: '填寫簡介以便日後方便回想經歷內容',
      required: false
    },
    feedback: {
      text: '經歷收穫及成就 (500字以內)',
      placeholder: '將過程中所得到的收穫及成就記錄下來吧~',
      required: false
    },
    link: {
      text: '其他連結'
    }
  }
}

export default {
  name: 'FormModal',
  components: { Multiselect, InformationCircleIcon, ConfirmModal, MessageModal, TagSelect },
  props: {
    formType: {
      type: String,
      default: 'activity',
      validator(value) {
        return ['course', 'activity', 'competition', 'work', 'certificate', 'other'].includes(value)
      }
    },
    editData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  emits: ['close', 'submit'],
  setup(props, { emit }) {
    const store = useStore()
    const toast = useToast()

    // === 離開時跳出確認視窗 ===
    const showConfirmModal = ref(false)
    const leaveForm = () => {
      if (requestStatus.isPending) {
        return
      }
      showConfirmModal.value = true
    }

    // === 顯示提示訊息 ===
    const showMessageModal = ref(false)
    const messageType = ref('')
    const openMessageModal = (type) => {
      messageType.value = type
      showMessageModal.value = true
    }

    // === 顯示不同類型對應的文字 ===
    const showedFieldText = computed(() => {
      return fieldText[props.formType]
    })

    // === 產生學期選項（往前5個學期） ===
    const year = new Date().getFullYear() - 1911
    const semesters = [...Array(5).keys()]
      .map((_, i) => {
        return [`${year - i}-2`, `${year - i}-1`]
      })
      .flat()

    // === 產生所有的tag ===
    const tags = computed(() => store.state.tags.tags)

    // 儲存填入的資料，若有傳入要編輯的資料，則設為預設值
    const todayString = new Date(+new Date() + 8 * 3600 * 1000).toISOString().substring(0, 10)
    const formData = reactive({
      id: props.editData?.id || null,
      name: props.editData?.name || '',
      position: props.editData?.position || '',
      description: props.editData?.description || '',
      feedback: props.editData?.feedback || '',
      semester: props.editData?.semester || '',
      link: props.editData?.link || '',
      type: props.formType,
      coreAbilities: props.editData?.coreAbilities || '',
      tags: props.editData?.tags || [],
      categories: props.editData?.categories || [],
      dateStart: props.editData?.dateStart?.slice(0, 10) || null,
      dateEnd: props.editData?.dateEnd?.slice(0, 10) || null
    })
    const requestStatus = reactive({
      error: null,
      isPending: null
    })

    const addExperience = experience => store.dispatch('experiences/addExperience', experience)
    const updateExperience = (id, experience) => store.dispatch('experiences/updateExperience', { id, experience })

    const handleFormSubmit = async() => {
      try {
        requestStatus.isPending = true
        requestStatus.error = null
        const newFormData = {
          ...formData,
          tags: formData.tags.map(tag => tag.id),
          dateStart: new Date(formData.dateStart).toISOString(),
          dateEnd: formData.dateEnd ? new Date(formData.dateEnd).toISOString() : null
        }
        if (props.editData) {
          await updateExperience(formData.id, newFormData)
        } else {
          await addExperience(newFormData)
        }
        emit('submit')
      } catch (error) {
        requestStatus.error = error
        toast.error('儲存出錯，請再次嘗試')
      } finally {
        requestStatus.isPending = false
      }
    }

    return {
      get,
      tags,
      showConfirmModal,
      leaveForm,
      showMessageModal,
      messageType,
      openMessageModal,
      todayString,
      formData,
      showedFieldText,
      semesters,
      handleFormSubmit,
      requestStatus,
    }
  }
}
</script>

<style lang="scss">
@import '~@/scss/mixins';
@import '~@/scss/variables';

.form-modal {
  width: 100%;
  max-width: 770px;
  max-height: 80vh;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  display: flex;
  animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  animation: slideDown .3s;
  &__hint {
    color: $grey-4;
    display: flex;
    justify-content: space-between;
  }
  &__time {
    display: grid;
    align-items: center;
    grid-template-columns: auto 1fr auto 1fr;
    column-gap: 10px;
    color: $grey-6;
  }
  summary {
    cursor: pointer;
    color: #1c7ba3;
    line-height: 24px;
    font-weight: 500;
    letter-spacing: 0.05em;
    margin-bottom: 8px;
  }
}

.form-modal__content {
  display: flex;
  flex-direction: column;
  gap: 20px 0;
  width: 100%;
  overflow-y: auto;
  padding: 5px;
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
  }
}

.multiselect-input {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  min-height: 46px;
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
  padding-left: 12px;
  gap: 5px;
  .multiselect-tag {
    display: flex;
    color: #000;
    font-weight: normal;
    background-color: #f2f2f2;
    border-radius: 50px;
    line-height: 1.5;
    padding: 4px 8px;
    margin: 0;
  }
  i::before {
    color: $red-5;
    border-radius: 50%;
  }
  i:hover::before {
    color: $red-5;
    background: #ffffff;
  }
}
.multiselect-clear,
.multiselect-caret {
  display: none;
}

@keyframes slideDown {
  0% {
    opacity: 0;
    transform: translateY(-30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
