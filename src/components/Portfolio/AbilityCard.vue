<template>
  <div class="ability-card">
    <input
      :value="abilityTopic"
      class="ability-card__topic"
      placeholder="填入能力主題，如文書行政能力/溝通能力..."
      @input="$emit('update:abilityTopic', $event.target.value)"
    >
    <hr>
    <ul class="ability-card__body">
      <draggable
        :list="experiences"
        :group="draggableGroupOption"
        item-key="id"
        @start="handleDrag(true)"
        @end="handleDrag(false)"
      >
        <template #item="{element, index}">
          <li class="experience-card">
            <div class="experience-card__header">
              <h3 class="experience-card__name">
                {{ element.name }}
              </h3>
              <img
                class="experience-card__delete"
                src="~@/assets/delete.svg"
                alt="delete"
                @click.stop="$emit('delete-experience', index)"
              >
            </div>
            <div class="experience-card__tags">
              <div
                v-for="tag in element.tags"
                :key="tag"
                class="tag"
              >
                {{ tag.name }}
              </div>
            </div>
            <div class="experience-card__description">
              {{ element.feedback }}
            </div>
          </li>
        </template>
      </draggable>
      <p class="ability-card__body__tips">
        由右方列表拉入適合課程
      </p>
    </ul>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import useGrab from '@/composables/useGrab'

export default {
  name: 'AbilityCard',
  components: {
    draggable
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
    }
  },
  emits: ['update:abilityTopic', 'delete-experience'],
  setup (props) {
    const { setIsGrabbing } = useGrab()

    const handleDrag = (onDragging) => {
      setIsGrabbing(onDragging)
    }

    const draggableGroupOption = {
      name: 'experience',
      put: function (to, from, item) {
        if (from.options.group.name !== to.options.group.name) return false
        // 重複的經驗無法放入
        return !props.experiences.some(el => el.id === ~~item.dataset.id)
      }
    }

    return { setIsGrabbing, handleDrag, draggableGroupOption }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/scss/variables";
@import "~@/scss/mixins";

.ability-card {
  @include grid(row, 12px, 0);
  user-select: none;
  margin-bottom: 12px;
  padding: 15px 0;
  background-color: #f8f8f8;
  border-radius: 8px;
  hr {
    height: 1px;
    margin: 0;
    background-color: $gray-5;
    border: none;
  }
  &__topic {
    background-color: transparent;
    border: none;
    padding: 10px;
  }
  &__body {
    padding: 0 15px;
    &__tips {
      margin: 0;
      padding: 10px;
      text-align: center;
      color: $blue-dark;
    }
  }
}

.experience-card {
  cursor: grab;
  padding: 15px;
  border-radius: 8px;
  margin: 12px 0;
  background-color: #fff;
  &:first-child {
    margin-top: 0;
  }
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__name {
    font-size: 21px;
    line-height: 34px;
    color: $blue-dark;
    font-weight: normal;
  }
  &__delete {
    cursor: pointer;
  }
  &__tags {
    @include grid(column, 0, 10px);
    justify-content: start;
    padding: 10px 0;
    .tag {
      font-weight: $weight-light;
      color: $blue-dark;
    }
  }
  &__description {
    line-height: 24px;
    color: $gray-3;
  }
}
.experience-card[draggable="true"] {
  cursor: grabbing;
}
</style>
