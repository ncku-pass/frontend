<template>
  <div class='ability-card'>
    <div class='ability-card__header'>
      <mdicon name='dragVertical' class='ability-card__header__btn-drag' />
      <InputText
        v-model='headerValue'
        type='text'
        class='input-topic'
        placeholder='為這些經歷訂定一個主題吧'
        @input='$emit("update:abilityTopic", $event.target.value)'
      />
      <mdicon name='closeCircleOutline' class='btn-delete' size='24' @click.stop='$emit("delete-ability")' />
    </div>
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

import draggable from 'vuedraggable'
import useGrab from '@/composables/useGrab'
import Menu from 'primevue/menu'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'

export default {
  name: 'AbilityCard',
  components: {
    InputText,
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
  emits: ['update:abilityTopic', 'update:text', 'delete-experience', 'delete-ability'],
  setup(props, { emit }) {
    const headerValue = ref(props.abilityTopic)
    const description = ref(props.text)

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
      headerValue,
      description,
      setIsGrabbing,
      handleDrag,
      draggableOptions,
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

  &__header {
    display: flex;
    align-items: center;
    padding-bottom: 12px;
    border-bottom: 1px solid #E0E0E0;

    &.btn-drag {
      cursor: grab;
    }

    .input-topic {
      background-color: transparent;
      border: none;
      font-size: 20px;
      margin-right: 24px;
      &:focus {
        box-shadow: 0 0 0 0.1rem $grey-4 !important;
      }
    }
  }

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
