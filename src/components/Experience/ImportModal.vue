<template>
  <teleport to='#app'>
    <div class='modal-bg' @click.self.stop='$emit("close")'>
      <div class='import-modal'>
        <h1 class='import-modal__title'>
          加入你想要呈現的經驗
        </h1>
        <div v-if='nckuExperiencesError' class='import-modal__error'>
          成功入口時效過期，請重新登入
          <a href='https://i.ncku.edu.tw/ncku/oauth/eportfolio/login.php' class='ncku-login'>
            使用<img src='@/assets/ncku_login.png' alt='ncku login' />登入
          </a>
        </div>
        <template v-else-if='classifiedNckuExperiences'>
          <div class='experiences__container'>
            <Disclosure
              v-for='(_, semester) in classifiedNckuExperiences'
              :key='semester'
              v-slot='{ open }'
              as='div'
              :defaultOpen='true'
              class='semester-block'
            >
              <DisclosureButton as='h2' class='semester-block__title'>
                {{ semester.replace('-1', '上學期').replace('-2', '下學期') }}
                <mdicon v-if='open' name='chevronUp' size='26' />
                <mdicon v-else name='chevronDown' size='26' />
              </DisclosureButton>
              <DisclosurePanel as='ul' class='semester-block__content'>
                <li v-for='(exp, i) in classifiedNckuExperiences[semester]' :key='exp.name' class='experience-item'>
                  <input :id='`${semester}-${i}`' v-model='selectedExperiences' :value='exp' type='checkbox' />
                  <label :for='`${semester}-${i}`'> 【{{ experienceTypesInChinese[exp.type] }}】{{ exp.name }} </label>
                </li>
              </DisclosurePanel>
            </Disclosure>
          </div>
          <div class='import-modal__btns'>
            <button class='select-all btn' @click='toggleAllExperiences'>
              全選
            </button>
            <button v-show='!isPending' class='btn' type='button' @click='handleCloseModal'>
              取消
            </button>
            <button
              class='btn--red'
              :disabled='isPending || !selectedExperiences.length'
              @click='handleImportExperiences'
            >
              {{ isPending ? '儲存中' : '儲存' }}
            </button>
          </div>
        </template>
        <div v-else class='import-modal__loading'>
          loading
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { experienceTypesInChinese } from '@/config'

export default {
  name: 'ImportModal',
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
  },
  emits: ['close'],
  setup(props, { emit }) {
    const store = useStore()
    const activeTab = computed(() => store.state.experiences.activeTab)

    const handleCloseModal = () => {
      if (isPending.value) {
        return
      }
      emit('close')
    }

    // === 取得學校資料 ===
    const classifiedNckuExperiences = computed(
      () => store.getters['experiences/classifiedNckuExperiences']?.[activeTab.value]
    )
    const getNckuExperiences = () => store.dispatch('experiences/getNckuExperiences')
    const nckuExperiencesError = ref(null)
    const getData = async() => {
      try {
        nckuExperiencesError.value = null
        await getNckuExperiences()
      } catch (error) {
        nckuExperiencesError.value = error
      }
    }
    if (!classifiedNckuExperiences.value) getData()

    // === 要匯入的資料 ===
    const error = computed(() => store.state.experiences.error)
    const isPending = computed(() => store.state.experiences.isPending)
    const importExperiences = experiences => store.dispatch('experiences/importExperiences', experiences)

    const selectedExperiences = ref([])
    const handleImportExperiences = async() => {
      if (!selectedExperiences.value.length) return

      await importExperiences(selectedExperiences.value)
      if (!error.value) {
        emit('close')
      }
    }
    const toggleAllExperiences = () => {
      if (selectedExperiences.value.length) {
        selectedExperiences.value.length = 0
        return
      }
      const allExperiences = []
      for (const semester in classifiedNckuExperiences.value) {
        allExperiences.push(...classifiedNckuExperiences.value[semester])
      }
      selectedExperiences.value = allExperiences
    }

    return {
      handleCloseModal,
      experienceTypesInChinese,
      classifiedNckuExperiences,
      nckuExperiencesError,
      selectedExperiences,
      handleImportExperiences,
      error,
      isPending,
      toggleAllExperiences
    }
  }
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
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  color: $grey-6;
  &__title {
    font-size: 26px;
    line-height: 34px;
    font-weight: $weight-regular;
  }
  &__error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    gap: 20px;
  }
  &__btns {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
  }
  &__loading {
    display: grid;
    height: 100%;
    place-items: center;
  }
}

.select-all {
  margin-right: auto;
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
    color: $grey-4;
    font-size: 26px;
    line-height: 34px;
    font-weight: $weight-regular;
    margin-bottom: 10px;
    cursor: pointer;
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
