<template>
  <div class="ability-card">
    <div class="ability-card__head">
      <svg
        class="ability-card__grab-area"
        width="10"
        height="16"
        viewBox="0 0 10 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 14C4 15.1 3.1 16 2 16C0.9 16 0 15.1 0 14C0 12.9 0.9 12 2 12C3.1 12 4 12.9 4 14ZM2 6C0.9 6 0 6.9 0 8C0 9.1 0.9 10 2 10C3.1 10 4 9.1 4 8C4 6.9 3.1 6 2 6ZM2 0C0.9 0 0 0.9 0 2C0 3.1 0.9 4 2 4C3.1 4 4 3.1 4 2C4 0.9 3.1 0 2 0ZM8 4C9.1 4 10 3.1 10 2C10 0.9 9.1 0 8 0C6.9 0 6 0.9 6 2C6 3.1 6.9 4 8 4ZM8 6C6.9 6 6 6.9 6 8C6 9.1 6.9 10 8 10C9.1 10 10 9.1 10 8C10 6.9 9.1 6 8 6ZM8 12C6.9 12 6 12.9 6 14C6 15.1 6.9 16 8 16C9.1 16 10 15.1 10 14C10 12.9 9.1 12 8 12Z"
          fill="#828282"
        />
      </svg>
      <input
        :value="abilityTopic"
        class="ability-card__topic"
        placeholder="為這些經歷訂定一個主題吧"
        @input="$emit('update:abilityTopic', $event.target.value)"
      />
      <XCircleIcon class="ability-card__delete" @click.stop="$emit('delete-ability')" />
    </div>
    <hr />
    <div class="ability-card__body">
      <template v-if="cardType === 'experience'">
        <p v-if="experiences.length === 0" class="ability-card__body__tips">
          由右方列表拉入適合課程
        </p>
        <draggable
          class="experience-list"
          tag="ul"
          :list="experiences"
          v-bind="draggableOptions"
          item-key="id"
          @start="handleDrag(true)"
          @end="handleDrag(false)"
        >
          <template #item="{ element: experience, index }">
            <li class="experience-card" :data-id="experience.id">
              <div class="experience-card__header">
                <h3 class="experience-card__name">
                  {{ experience.name }}
                </h3>
                <span v-if="experience.showPosition" class="experience-card__position">
                  {{ experience.type === 'course' ? `學期成績${experience.position}分` : experience.position }}
                </span>
                <Menu as="div" class="experience-card__menu">
                  <MenuButton class="experience-card__menu-btn">
                    <DotsVerticalIcon class="experience-card__delete" />
                  </MenuButton>
                  <MenuItems as="ul" class="experience-card__menu-items">
                    <MenuItem v-if="experience.position" v-slot="{ active }">
                      <li
                        :class="{ 'experience-card__menu-item--active': active }"
                        class="experience-card__menu-item"
                        @click="experience.showPosition = !experience.showPosition"
                      >
                        {{ experience.showPosition ? '隱藏' : '顯示'
                        }}{{ experience.type === 'course' ? '成績' : '職位/名次' }}
                      </li>
                    </MenuItem>
                    <MenuItem v-if="experience.feedback" v-slot="{ active }">
                      <li
                        :class="{ 'experience-card__menu-item--active': active }"
                        class="experience-card__menu-item"
                        @click="experience.showFeedback = !experience.showFeedback"
                      >
                        {{ experience.showFeedback ? '隱藏心得' : '顯示心得' }}
                      </li>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                      <li
                        :class="{ 'experience-card__menu-item--active': active }"
                        class="experience-card__menu-item"
                        @click.stop="$emit('delete-experience', index)"
                      >
                        刪除此經驗
                      </li>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </div>
              <div class="experience-card__tags">
                <div v-for="tag in experience.tags" :key="tag" class="tag">
                  {{ tag.name }}
                </div>
              </div>
              <div v-if="experience.showFeedback" class="experience-card__description">
                {{ experience.feedback }}
              </div>
            </li>
          </template>
        </draggable>
      </template>
      <template v-else>
        <textarea :value="text" class="ability-card__text" @input="handleTextInput" />
      </template>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import useGrab from '@/composables/useGrab'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { XCircleIcon, DotsVerticalIcon } from '@heroicons/vue/solid'

export default {
  name: 'AbilityCard',
  components: {
    draggable,
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
    XCircleIcon,
    DotsVerticalIcon
  },
  props: {
    experiences: {
      type: Array,
      default () {
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
      validator (value) {
        return ['experience', 'text'].includes(value)
      }
    },
    text: {
      type: String,
      default: ''
    }
  },
  emits: ['update:abilityTopic', 'update:text', 'delete-experience', 'delete-ability'],
  setup (props, { emit }) {
    const { setIsGrabbing } = useGrab()

    const handleDrag = onDragging => {
      setIsGrabbing(onDragging)
    }

    const draggableOptions = {
      animation: 200,
      group: {
        name: 'experience',
        put: function (to, from, item) {
          if (from.options.group.name !== to.options.group.name) return false
          // 重複的經驗無法放入
          return !props.experiences.some(el => el.id === ~~item.dataset.id)
        }
      }
    }

    const handleTextInput = e => {
      emit('update:text', e.target.value)
      if (e.target.scrollHeight > 80) {
        e.target.style.height = '5px'
        e.target.style.height = `${e.target.scrollHeight}px`
      }
    }

    return { setIsGrabbing, handleDrag, draggableOptions, handleTextInput }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/scss/variables';
@import '~@/scss/mixins';

.ability-card {
  @include grid(row, 12px, 0);
  position: relative;
  user-select: none;
  margin-bottom: 12px;
  padding: 15px 0;
  background-color: #f8f8f8;
  border-radius: 8px;
  &__head {
    display: flex;
    align-items: center;
    padding: 0 10px;
  }
  &__grab-area {
    padding: 4px 7px;
    cursor: grab;
    box-sizing: content-box;
  }
  &__delete {
    cursor: pointer;
    width: 24px;
    height: 24px;
    color: $red;
  }
  hr {
    height: 1px;
    margin: 0;
    background-color: $gray-5;
    border: none;
  }
  &__topic {
    background-color: transparent;
    border: none;
    padding: 10px 8px;
    flex: 1;
    font-size: 21px;
  }
  &__body {
    padding: 0 15px;
    &__tips {
      margin-bottom: -40px;
      padding: 10px;
      line-height: 20px;
      text-align: center;
      color: $blue-dark;
      background: $gray-blue;
      border-radius: 8px;
    }
  }
  &__text {
    width: 100%;
    outline: none;
    border: none;
    padding: 15px;
    border-radius: 8px;
    margin: 12px 0 0 0;
    background-color: #fff;
    resize: none;
    line-height: 1.5;
    overflow: hidden;
    min-height: 80px;
  }
}
.experience-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  &:empty {
    padding: 20px 0;
  }
}
.experience-card {
  cursor: grab;
  padding: 15px;
  border-radius: 8px;
  background-color: #fff;
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
  }
  &__menu {
    position: relative;
  }
  &__menu-btn {
    background: transparent;
    border: none;
  }
  &__menu-items {
    position: absolute;
    outline: none;
    right: 0;
    min-width: 150px;
    background-color: #fff;
    border-radius: 5px;
    border: 1px solid $gray-6;
    color: $gray-1;
  }
  &__menu-item {
    padding: 2px 5px;
    line-height: 26px;
    cursor: pointer;
    &--active {
      background-color: $gray-6;
    }
    &:not(:last-child) {
      border-bottom: 1px solid $gray-6;
    }
  }
  &__name {
    font-size: 21px;
    line-height: 34px;
    color: $blue-dark;
    font-weight: normal;
  }
  &__position {
    margin-right: auto;
    color: $blue-dark;
  }
  &__delete {
    cursor: pointer;
    width: 24px;
    height: 24px;
    color: $gray-3;
  }
  &__tags {
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
    padding: 10px 0;
    .tag {
      font-weight: $weight-light;
      color: $blue-dark;
    }
  }
  &__description {
    line-height: 24px;
    color: $gray-3;
    white-space: pre;
  }
}
.experience-card[draggable='true'] {
  cursor: grabbing;
}
</style>
