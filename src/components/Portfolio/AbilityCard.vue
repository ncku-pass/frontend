<template>
  <div class='ability-card'>
    <AbilityCardHeader
      :topic='abilityTopic'
      @update-topic='(topicValue) => $emit("update:abilityTopic", topicValue)'
      @delete-ability='$emit("delete-ability")'
      @duplicate-ability='$emit("duplicate-ability")'
      @copy-ability-text='onCopyAbilityText'
    />
    <div class='ability-card__body'>
      <template v-if='cardType === "experience"'>
        <p v-if='experiences.length === 0' class='ability-card__body__tips'>
          由右方列表拉入適合課程
        </p>
        <draggable
          class='exp-list'
          tag='ul'
          :list='experiences'
          v-bind='draggableOptions'
          item-key='id'
          @start='handleDrag(true)'
          @end='handleDrag(false)'
        >
          <template #item='{ element: exp, index: idx }'>
            <li class='exp-card' :data-id='exp.id'>
              <div class='exp-card__header'>
                <p class='title'>
                  {{ exp.name }}
                </p>
                <span v-if='exp.showPosition' class='position'>
                  {{ exp.type === 'course' ? `學期成績${exp.position}分` : exp.position }}
                </span>
                <mdicon
                  name='dotsVertical'
                  class='btn-menu'
                  @click='(evt) => onToggleMenu(evt, idx)'
                />
                <Menu
                  :ref='(el) => setMenuRef(el, idx)'
                  :model='getMenuItems(exp, idx)'
                  :popup='true'
                />
              </div>
              <div class='exp-card__tags'>
                <div v-for='tag in exp.tags' :key='tag' class='tag'>
                  {{ tag.name }}
                </div>
              </div>
              <div v-if='exp.showFeedback' class='exp-card__body'>
                {{ exp.feedback }}
              </div>
            </li>
          </template>
        </draggable>
      </template>
      <template v-else>
        <Textarea
          v-model='description'
          class='ability-card__body__input'
          placeholder='在此輸入文字內容'
          :autoResize='true'
          :rows='3'
          @input='$emit("update:text", $event.target.value)'
        />
      </template>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeUpdate } from 'vue'
import { isEmpty } from 'lodash-es'
import draggable from 'vuedraggable'
import useGrab from '@/composables/useGrab'
import Menu from 'primevue/menu'
import Textarea from 'primevue/textarea'
import { useToast } from 'primevue/usetoast'

import AbilityCardHeader from '@/components/Portfolio/AbilityCardHeader'

export default {
  name: 'AbilityCard',
  components: {
    AbilityCardHeader,
    Textarea,
    Menu,
    draggable,
  },
  props: {
    experiences: {
      type: Array,
      default() {
        return []
      }
    },
    abilityTopic: {
      type: String,
      default: ''
    },
    cardType: {
      type: String,
      default: 'experience',
      validator(value) {
        return ['experience', 'text'].includes(value)
      }
    },
    text: {
      type: String,
      default: ''
    }
  },
  emits: ['update:abilityTopic', 'update:text', 'delete-experience', 'delete-ability', 'duplicate-ability'],
  setup(props, { emit }) {
    const description = ref(props.text)

    // === copy ability card text
    const toast = useToast()

    const onCopyAbilityText = () => {
      if (props.cardType === 'text') {
        if (description.value === '') {
          useErrorToast()
        } else {
          const text = `${props.abilityTopic}\n${description.value}`
          navigator.clipboard.writeText(text)
          useSuccessToast()
        }
      } else {
        if (props.experiences.length === 0) {
          useErrorToast()
        } else {
          let text = `${props.abilityTopic}\n`
          for (const exp of props.experiences) {
            text += `• ${exp.name}`

            if (!isEmpty(exp?.position)) {
              text += `｜${exp.position}`
            }

            if (!isEmpty(exp?.tags)) {
              for (const tag of exp.tags) {
                text += ` #${tag.name}`
              }
            }

            if (!isEmpty(exp?.feedback)) {
              // eslint-disable-next-line no-irregular-whitespace
              const feedback = exp.feedback.replaceAll('\n', '\n  ')
              text += `\n  ${feedback}`
            }

            text += '\n'
          }
          navigator.clipboard.writeText(text)
          useSuccessToast()
        }
      }
    }

    const useSuccessToast = () => {
      toast.add({
        group: 'copy-ability-text',
        severity: 'success',
        summary: '複製成功！',
        detail: '[右鍵 > 貼上] 即可將文字貼到其他文件',
        life: 3000
      })
    }

    const useErrorToast = () => {
      toast.add({
        group: 'copy-ability-text',
        severity: 'error',
        summary: '無法複製區塊內文字',
        detail: '請先新增內容再複製！',
        life: 3000
      })
    }

    // === DnD Experience ===
    const { setIsGrabbing } = useGrab()

    const handleDrag = onDragging => {
      setIsGrabbing(onDragging)
    }

    const draggableOptions = {
      animation: 200,
      group: {
        name: 'experience',
        put: function(to, from, item) {
          if (from.options.group.name !== to.options.group.name) return false
          // 重複的經驗無法放入
          return !props.experiences.some(el => el.id === ~~item.dataset.id)
        }
      }
    }

    // === Experience Menu ===
    const menuRefs = ref([])
    const setMenuRef = (el, idx) => {
      // need to use idx because menu is not loaded in seq
      // use push will lead to wrong idx for deleting exp
      if (el) {
        menuRefs.value[idx] = el
      }
    }
    // make sure to reset the refs before each update
    onBeforeUpdate(() => {
      menuRefs.value = []
    })

    const onToggleMenu = (evt, idx) => {
      menuRefs.value[idx].toggle(evt)
    }

    const getMenuItems = (exp, idx) => {
      const items = []

      if (exp.position) {
        items.push({
          label: `${exp.showPosition ? '隱藏' : '顯示'}${exp.type === 'course' ? '成績' : '職位/名次'}`,
          command: () => { exp.showPosition = !exp.showPosition }
        })
      }
      if (exp.feedback) {
        items.push({
          label: `${exp.showFeedback ? '隱藏' : '顯示'}心得`,
          command: () => { exp.showFeedback = !exp.showFeedback }
        })
      }
      items.push({
        label: '刪除此經驗',
        command: () => { emit('delete-experience', idx) }
      })

      return items
    }

    return {
      description,
      setIsGrabbing,
      handleDrag,
      draggableOptions,
      onCopyAbilityText,
      setMenuRef,
      getMenuItems,
      onToggleMenu
    }
  }
}
</script>

<style lang='scss' scoped>
@import '~@/scss/variables';
@import '~@/scss/mixins';

.ability-card {
  [class*='btn'] {
    color: $grey-4;
    &:hover {
      color: $grey-5;
    }
  }

  @include grid(row, 12px, 0);
  position: relative;
  user-select: none;
  margin-bottom: 12px;
  padding: 16px;
  background-color: $grey-0;
  border-radius: 8px;

  &__body {
    &__tips {
      margin-bottom: -40px;
      padding: 10px;
      line-height: 20px;
      text-align: center;
      color: $blue-6;
      background: $grey-blue;
      border-radius: 8px;
    }

    &__input {
      border: none;
      &:focus {
        box-shadow: 0 0 0 0.1rem $grey-4 !important;
      }
    }
  }

  .exp-list {
    display: flex;
    flex-direction: column;
    gap: 12px;

    &:empty {
      padding: 20px 0;
    }

    .exp-card {
      cursor: grab;
      padding: 16px 16px 16px 20px;
      border-radius: 8px;
      background-color: #fff;

      &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 15px;
        padding: 6px 0;
        color: $blue-6;

        .title {
          font-size: 20px;
        }

        .position {
          margin-right: auto;
        }
      }

      &__tags {
        display: flex;
        gap: 5px;
        flex-wrap: wrap;
        padding: 10px 0;
        .tag {
          font-weight: $weight-light;
          color: $blue-6;
        }
      }

      &__body {
        line-height: 24px;
        color: $grey-4;
        white-space: pre-wrap;
        line-break: anywhere;
      }
    }

    .exp-card[draggable='true'] {
      cursor: grabbing;
    }
  }
}
</style>
