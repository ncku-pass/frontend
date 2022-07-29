<template>
  <div class='modal-bg' @click.self.stop='$emit("close")'>
    <div class='viewer-modal'>
      <XCircleIcon class='viewer-modal__close' @click.stop='$emit("close")' />
      <div class='viewer-modal__content'>
        <div v-if='experience.name'>
          <h3 class='field-title'>
            {{ showedFieldText.name }}
          </h3>
          <p class='field-value'>
            {{ experience.name }}
          </p>
        </div>
        <div v-if='experience.position'>
          <h3 class='field-title'>
            {{ showedFieldText.position }}
          </h3>
          <p class='field-value'>
            {{ experience.position }}
          </p>
        </div>
        <div v-if='experience.semester'>
          <h3 class='field-title'>
            {{ showedFieldText.semester }}
          </h3>
          <p class='field-value'>
            {{ experience.semester }}
          </p>
        </div>
        <div v-if='experience.categories.length'>
          <h3 class='field-title'>
            {{ showedFieldText.categories }}
          </h3>
          <div class='field-tags'>
            <div v-for='categories in experience.categories' :key='categories' class='tag--large'>
              {{ categories }}
            </div>
          </div>
        </div>
        <!-- Tags -->
        <div v-if='experience.tags.length'>
          <h3 class='field-title'>
            獲得技能Tag
          </h3>
          <div class='field-tags'>
            <div v-for='tag in experience.tags' :key='tag.name' class='tag--large'>
              {{ tag.name }}
            </div>
          </div>
        </div>
        <div v-if='experience.description'>
          <h3 class='field-title'>
            {{ showedFieldText.description }}
          </h3>
          <p class='field-value'>
            {{ experience.description }}
          </p>
        </div>
        <div v-if='experience.feedback'>
          <h3 class='field-title'>
            {{ showedFieldText.feedback }}
          </h3>
          <p class='field-value'>
            {{ experience.feedback }}
          </p>
        </div>
        <!-- 其他連結 -->
        <div v-if='experience.link'>
          <h3 class='field-title'>
            其他連結
          </h3>
          <ul class='field-links'>
            <li v-for='link in experience.link.split(",")' :key='link'>
              <a class='field-value' :href='link.trim()' target='_blank'>
                {{ link.trim() }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { XCircleIcon } from '@heroicons/vue/solid'

const fieldText = {
  course: {
    name: '*課程名稱',
    categories: '課程類別',
    semester: '*課程時間',
    position: '課程分數',
    description: '課程簡介',
    feedback: '課程收穫及成就'
  },
  activity: {
    name: '*活動名稱',
    categories: '活動類別',
    semester: '*活動時間',
    position: '*活動擔任職位',
    description: '活動簡介',
    feedback: '活動收穫及成就'
  },
  competition: {
    name: '*競賽名稱',
    semester: '*競賽時間',
    position: '*競賽得獎名次',
    description: '競賽簡介',
    feedback: '競賽收穫及成就'
  },
  work: {
    name: '*公司單位名稱',
    semester: '*實習 / 工作時間',
    position: '*職位職位',
    description: '實習 / 工作內容',
    feedback: '收穫及成就'
  },
  certificate: {
    name: '*證照名稱',
    semester: '*考取時間',
    position: '*證照分數或等級',
    feedback: '收穫及成就'
  },
  other: {
    name: '*經歷名稱',
    semester: '時間',
    position: '經歷職位、成就',
    description: '經歷簡介',
    feedback: '經歷收穫及成就'
  }
}

export default {
  name: 'ViewerModal',
  components: {
    XCircleIcon
  },
  props: {
    experienceType: {
      type: String,
      required: true,
      validator(value) {
        return ['course', 'activity', 'competition', 'work', 'certificate', 'other'].includes(value)
      }
    },
    experience: {
      type: Object,
      required: true
    }
  },
  emits: ['close'],
  setup(props) {
    const showedFieldText = computed(() => {
      return fieldText[props.experienceType]
    })

    return {
      showedFieldText
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/scss/variables';
@import '~@/scss/mixins';

.viewer-modal {
  position: relative;
  display: flex;
  width: 100%;
  max-width: 770px;
  max-height: 80vh;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  color: $grey-6;
  &__close {
    position: absolute;
    right: 25px;
    top: 25px;
    width: 32px;
    height: 32px;
    cursor: pointer;
    color: $red-5;
  }
  &__content {
    display: flex;
    flex-direction: column;
    gap: 20px 0;
    padding: 5px;
    overflow: auto;
  }
}
.field-title {
  justify-content: flex-start;
  align-items: center;
  color: $blue-dark;
  line-height: 24px;
  font-weight: 500;
  letter-spacing: 0.05em;
  margin-bottom: 8px;
}
.field-value {
  line-break: anywhere;
}
.field-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}
.field-links {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
a {
  color: $blue-dark;
}
</style>
