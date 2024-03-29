<template>
  <div class='portfolio__menu__filter'>
    <vueScrollShadow>
      <div class='portfolio__menu__filter__container'>
        <div class='filter-block'>
          <div class='filter-block__title'>
            學期
          </div>
          <ul class='filter-block__tags'>
            <li
              v-for='(checked, semester) in filter.semesters'
              :key='semester'
              class='semester filter-block__tags__tag'
              :class='{ "selected": checked }'
              @click='$emit("toggleSemester", semester)'
            >
              {{ semester }}
            </li>
          </ul>
        </div>
        <div class='filter-block'>
          <div class='filter-block__title filter-block__title--tag'>
            標籤
            <span v-if='allSelected' @click='$emit("unSelectAllTags")'>取消全選</span>
            <span v-else @click='$emit("selectAllTags")'>全選</span>
          </div>
          <ul class='filter-block__tags'>
            <li
              v-for='(checked, tag) in filter.tags'
              :key='tag'
              class='tags filter-block__tags__tag'
              :class='{ "selected": checked }'
              @click='$emit("toggleTag", tag)'
            >
              {{ tag }}
            </li>
          </ul>
        </div>
        <div class='filter-block'>
          <div class='filter-block__title'>
            類別
          </div>
          <ul class='filter-block__tags'>
            <li
              v-for='(checked, type) in filter.types'
              :key='type'
              class='type filter-block__tags__tag'
              :class='{ "selected": checked }'
              @click='$emit("toggleType", type)'
            >
              {{ expTypesInZh[type] }}
            </li>
          </ul>
        </div>
      </div>
    </vueScrollShadow>
  </div>
</template>

<script>
import { computed } from 'vue'
import vueScrollShadow from 'vue3-scroll-shadow'
import { expTypesInZh } from '@/config'

export default {
  name: 'MenuFilter',
  components: {
    vueScrollShadow
  },
  props: {
    filter: {
      type: Object,
      required: true
    }
  },
  emits: ['selectAllTags', 'unSelectAllTags', 'toggleSemester', 'toggleTag', 'toggleType'],
  setup(props) {
    const allSelected = computed(() => {
      for (const tag in props.filter.tags) {
        if (props.filter.tags[tag] === false) {
          return false
        }
      }
      return true
    })

    return {
      allSelected,
      expTypesInZh
    }
  }
}
</script>

<style lang="scss">
@import '~@/scss/variables';
@import '~@/scss/mixins';

.portfolio__menu__filter {
  max-height: 250px;
  margin-bottom: 15px;
  flex: 1 0 auto;
  overflow: auto;
  &__container {
    border-radius: 5px;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
.filter-block {
  margin-bottom: 10px;
  &__title {
    color: $grey-6;
    margin-bottom: 10px;
    &--tag {
      display: flex;
      justify-content: space-between;
      span {
        cursor: pointer;
      }
    }
  }
  &__tags {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 8px;
    &__tag {
      padding: 6px 8px;
      color: $grey-3;
      border: 1px solid $grey-3;
      border-radius: 10px;
      cursor: pointer;
      user-select: none;

      &.semester.selected {
        color: $white;
        border-color: $blue-3;
        background-color: $blue-3;
      }
      &.type.selected {
        color: $white;
        border-color: $grey-5;
        background-color: $grey-5;
      }
      &.tags.selected {
        color: $white;
        border-color: $blue-6;
        background-color: $blue-6;
      }
    }
  }
}
</style>
