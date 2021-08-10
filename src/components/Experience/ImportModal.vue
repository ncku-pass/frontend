<template>
  <div class="modal-bg" @click.self.stop="$emit('close')">
    <div class="import-modal">
      <h1 class="import-modal__title">
        加入你想要呈現的經驗
      </h1>
      <div v-if="experiences" class="experiences__container">
        <Disclosure
          v-for="(_, semester) in experiences"
          :key="semester"
          v-slot="{ open }"
          as="div"
          :defaultOpen="true"
          class="semester-block"
        >
          <DisclosureButton as="h2" class="semester-block__title">
            {{ semester.replace('-1', '上學期').replace('-2', '下學期') }}
            <ChevronDownIcon :class="{ 'opened': open }" />
          </DisclosureButton>
          <DisclosurePanel as="ul" class="semester-block__content">
            <li
              v-for="(exp, i) in experiences[semester]"
              :key="exp.name"
              class="experience-item"
            >
              <input
                :id="`${semester}-${i}`"
                v-model="selectedExperiences"
                :value="exp"
                type="checkbox"
              />
              <label :for="`${semester}-${i}`">
                【{{ chineseOfExperienceType[exp.experienceType] }}】{{ exp.name }}
              </label>
            </li>
          </DisclosurePanel>
        </Disclosure>
      </div>
      <div v-if="experiences" class="import-modal__btns">
        <button
          v-show="!isPending"
          class="btn"
          type="button"
          @click="handleCloseModal"
        >
          取消
        </button>
        <button
          class="btn--red"
          :disabled="isPending"
          @click="handleImportExperiences"
        >
          {{ isPending ? '儲存中' : '儲存' }}
        </button>
      </div>
      <div v-else>
        loading
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel
} from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/solid'
import { getNCKUExperiences } from '@/api/ncku-portal'
import {
  semesterToDate,
  dateToSemester,
  classifyBySemester,
  orderBySemester
} from '@/helpers'
import { chineseOfExperienceType } from '@/config'

export default {
  name: 'ImportModal',
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    ChevronDownIcon
  },
  props: {
    type: {
      type: String,
      default: 'course',
      validator (value) {
        return ['course', 'activity'].indexOf(value) !== -1
      }
    }
  },
  emits: ['close'],
  setup (props, { emit }) {
    const store = useStore()

    const key = computed(() => store.state.auth.key)
    const keyval = computed(() => store.state.auth.keyval)

    const handleCloseModal = () => {
      if (isPending.value) {
        return
      }
      emit('close')
    }

    // === 取得學校資料 ===
    const experiences = ref(null)
    const getData = async () => {
      try {
        const res = await getNCKUExperiences({
          key: key.value,
          keyval: keyval.value
        })
        const data = res.data?.data
        if (!data) {
          throw res.data.msg
        }

        const activity = changeActivitiesToExperiences(
          filterDuplicateActivity(data.activity)
        )
        const club = changeClubsToExperiences(data.club)
        const course = changeCoursesToExperiences(data.course)
        experiences.value = classifyBySemester(
          orderBySemester([...activity, ...club, ...course])
        )
        console.log(experiences.value)
      } catch (error) {
        console.error(error)
      }
    }
    getData()

    // === 要匯入的資料 ===
    const error = computed(() => store.state.experiences.error)
    const isPending = computed(() => store.state.experiences.isPending)
    const importExperiences = experiences =>
      store.dispatch('experiences/importExperiences', experiences)

    const selectedExperiences = ref([])
    const handleImportExperiences = async () => {
      await importExperiences(selectedExperiences.value)
      if (!error.value) {
        emit('close')
      }
    }
    return {
      handleCloseModal,
      chineseOfExperienceType,
      experiences,
      semesterToDate,
      dateToSemester,
      selectedExperiences,
      handleImportExperiences,
      error,
      isPending
    }
  }
}

const filterDuplicateActivity = activities => {
  const record = new Set()
  const res = []
  activities.forEach(activity => {
    if (!record.has(activity.activity_name)) {
      res.push(activity)
      record.add(activity.activity_name)
    }
  })
  return res
}

const experience = {
  name: '',
  position: '',
  semester: '',
  link: '',
  coreAbilities: '',
  experienceType: null,
  dateStart: null,
  dateEnd: null
}
const changeActivitiesToExperiences = activities => {
  return activities.map(activity => ({
    ...experience,
    name: activity.activity_name,
    semester: dateToSemester(new Date(activity.active_start)),
    link: activity.activity_url,
    experienceType: 'activity',
    dateStart: new Date(activity.active_start).toISOString()
  }))
}
const changeClubsToExperiences = clubs => {
  return clubs.map(club => ({
    ...experience,
    name: club.club_name,
    position: club.position,
    semester: `${club.syear}-${club.sem}`,
    experienceType: 'activity',
    dateStart: semesterToDate(`${club.syear}-${club.sem}`).toISOString()
  }))
}
const changeCoursesToExperiences = courses => {
  return courses.map(course => ({
    ...experience,
    name: course.course_name,
    semester: `${course.syear}-${course.sem}`,
    link: course.course_url,
    coreAbilities: Object.values(course.core_abilities).join('、'),
    experienceType: 'course',
    dateStart: semesterToDate(`${course.syear}-${course.sem}`).toISOString()
  }))
}
</script>

<style lang="scss" scoped>
@import '~@/scss/variables';
@import '~@/scss/mixins';

.import-modal {
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 770px;
  max-height: 80vh;
  padding: 25px 25px 20px;
  background-color: #fff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  color: $gray-1;
  &__title {
    font-size: 26px;
    line-height: 34px;
    font-weight: $weight-regular;
    margin-bottom: 25px;
  }
  &__btns {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
  }
}

.experiences__container {
  overflow: auto;
  width: 100%;
  @include grid(row, 25px, 0);
  align-content: flex-start;
}

.semester-block {
  &__title {
    display: flex;
    align-items: center;
    gap: 8px;
    color: $gray-3;
    font-size: 26px;
    line-height: 34px;
    font-weight: $weight-regular;
    margin-bottom: 10px;
    cursor: pointer;
    svg {
      width: 26px;
      height: 26px;
      &.opened {
        transform: rotate(180deg);
      }
    }
  }
  &__content {
    @include grid(row, 10px, 0);
    padding: 8px 5px;
  }
}

.experience-item {
  label {
    line-height: 26px;
    display: inline-block;
    cursor: pointer;
  }
}
</style>
