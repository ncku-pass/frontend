<template>
  <div class="experience">
    <div class="experience__window">
      <ul class="experience__window__tabs">
        <li>
          <router-link
            class="tab-link"
            :class="{ 'router-link-active': type === 'course' }"
            :to="{ name: 'Experience', params: { type: 'course' } }"
          >
            課程紀錄
          </router-link>
        </li>
        <li>
          <router-link
            class="tab-link"
            :to="{ name: 'Experience', params: { type: 'activity' } }"
          >
            活動經驗
          </router-link>
        </li>
        <li>
          <router-link
            class="tab-link"
            :to="{ name: 'Experience', params: { type: 'competition' } }"
          >
            競賽經驗
          </router-link>
        </li>
        <li>
          <router-link
            class="tab-link"
            :to="{ name: 'Experience', params: { type: 'work' } }"
          >
            工作經驗
          </router-link>
        </li>
        <li>
          <router-link
            class="tab-link"
            :to="{ name: 'Experience', params: { type: 'certificate' } }"
          >
            外語能力或證照
          </router-link>
        </li>
        <li>
          <router-link
            class="tab-link"
            :to="{ name: 'Experience', params: { type: 'other' } }"
          >
            其他
          </router-link>
        </li>
      </ul>
      <div class="experience__window__table">
        <div
          ref="shadowContainer"
          class="shadow-container"
          @scroll.capture="setShadows"
        >
          <div class="experience__window__table__wrapper">
            <ExperienceListBlock
              v-for="(semesterData, semester) in classifiedData[type]"
              :key="semester"
              :semester="semester"
            >
              <ExperienceListItem
                v-for="experience in semesterData"
                :key="experience.id"
                :experience="experience"
                @delete="handleDelete"
                @edit="handleEditExperience"
              />
            </ExperienceListBlock>
            <button
              class="experience__window__table__add"
              @click="handleAddExperience"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.71431 22.3811H13.2913V13.4791H21.7733V9.0701H13.2913V0.126143H8.71431V9.0701H0.232251V13.4791H8.71431V22.3811Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <FormModal
    v-if="showFormModal"
    :form-type="type"
    :edit-data="experienceToEdit"
    @close="showFormModal = false"
    @submit="handleSubmit"
  />
</template>

<script>
import { ref, onMounted, onUpdated, reactive } from 'vue'
import ExperienceListItem from '@/components/ExperienceListItem.vue'
import ExperienceListBlock from '@/components/ExperienceListBlock.vue'
import FormModal from '@/components/FormModal.vue'
import useScrollShadow from '@/composables/useScrollShadow'
import { getExperiences } from '@/api/experiences'

export default {
  name: 'Experience',
  components: {
    ExperienceListItem,
    ExperienceListBlock,
    FormModal
  },
  props: {
    // 目前顯示的TAB種類
    type: {
      type: String,
      default: 'course'
    }
  },
  setup (props) {
    const experiences = ref(null)
    const classifiedData = reactive({})

    const loadData = async () => {
      const { data } = await getExperiences()
      experiences.value = data

      for (const type in data) {
        classifiedData[type] = classifySemester(data[type])
      }
    }
    loadData()

    const classifySemester = (arr) => {
      return arr.reduce((obj, experience) => {
        if (Array.isArray(obj[experience.semester])) {
          obj[experience.semester].push(experience)
        } else {
          obj[experience.semester] = [experience]
        }
        return obj
      }, {})
    }

    // 新增活動表單
    const showFormModal = ref(false)
    const handleAddExperience = () => {
      showFormModal.value = true
      experienceToEdit.value = null
    }

    // ===設定滾動容器陰影===
    const { setShadows, initShadows } = useScrollShadow()
    const shadowContainer = ref(null)
    onMounted(() => {
      initShadows(shadowContainer.value)
    })
    onUpdated(() => {
      initShadows(shadowContainer.value)
    })

    // 處理表單送出
    const handleSubmit = () => {
      showFormModal.value = false
      loadData()
    }

    // 處理經驗刪除
    const handleDelete = () => {
      loadData()
    }

    // 處理編輯經歷
    const experienceToEdit = ref(null)
    const handleEditExperience = (experienceId) => {
      showFormModal.value = true;
      [experienceToEdit.value] = experiences.value[props.type].filter(exp => {
        return exp.id === experienceId
      })
    }

    return { classifiedData, loadData, showFormModal, handleAddExperience, setShadows, shadowContainer, handleSubmit, handleDelete, handleEditExperience, experienceToEdit }
  }
}
</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

.experience {
  height: 100%;
  padding: 26px 0;
  display: flex;
  justify-content: center;
}

.experience__window {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  box-shadow: 0px 0px 30px rgba(241, 90, 96, 0.05),
    0px 0px 25px rgba(241, 90, 96, 0.1);
  width: 100%;
  max-width: 1110px;
}

.experience__window__tabs {
  display: flex;
  justify-content: space-between;
  padding: 8px 10px;
  min-height: 50px;
  list-style: none;
  box-shadow: 0px 4px 15px rgba(241, 90, 96, 0.06);
  overflow-x: auto;
}

.experience__window__table {
  position: relative;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  &__wrapper {
    overflow-y: auto;
    padding: 24px 96px;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  &__add {
    display: grid;
    place-items: center;
    margin: 0 auto;
    height: 60px;
    width: 60px;
    border: none;
    border-radius: 50px;
    background-color: $red;
    font-weight: $weight-bold;
    font-size: 42px;
    color: #fff;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  }
}

@media (max-width: 1440px) {
  .experience__window {
    max-width: 930px;
  }
  .experience__window__table__wrapper {
    padding: 24px 80px;
  }
}

@media (max-width: 767px) {
  .experience {
    padding: 0;
  }
  .experience__window__table {
    &__wrapper {
      padding: 12px 24px;
    }
  }
}
</style>
