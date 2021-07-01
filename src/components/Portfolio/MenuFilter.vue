<template>
  <div class="portfolio__menu__filter">
    <vueScrollShadow>
      <div class="portfolio__menu__filter__container">
        <div class="filter-block">
          <div class="filter-block__title">
            學期
          </div>
          <ul class="filter-block__tags">
            <li
              v-for="(checked, semester) in filter.semesters"
              :key="semester"
              class="filter-block__tags__tag"
              :class="{'filter-block__tags__tag--selected': checked}"
              @click="toggleSemester(semester)"
            >
              {{ semester }}
            </li>
          </ul>
        </div>
        <div class="filter-block">
          <div class="filter-block__title">
            標籤
          </div>
          <ul class="filter-block__tags">
            <li
              v-for="(checked, tag) in filter.tags"
              :key="tag"
              class="filter-block__tags__tag"
              :class="{'filter-block__tags__tag--selected': checked}"
              @click="toggleTag(tag)"
            >
              {{ tag }}
            </li>
          </ul>
        </div>
      </div>
    </vueScrollShadow>
  </div>
</template>

<script>
import vueScrollShadow from 'vue3-scroll-shadow'

export default {
  name: 'MenuFilter',
  components: {
    vueScrollShadow
  },
  props: {
    toggleSemester: {
      type: Function,
      required: true
    },
    toggleTag: {
      type: Function,
      required: true
    },
    filter: {
      type: Object,
      required: true
    }
  },
  setup () {
  }
}
</script>

<style lang="scss">
@import "~@/scss/variables";
@import "~@/scss/mixins";

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
    color: $gray-1;
    margin-bottom: 10px;
  }
  &__tags {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 5px;
    &__tag {
      padding: 10px;
      color: $gray-1;
      border: 1px solid $gray-1;
      border-radius: 15px;
      line-height: 14px;
      cursor: pointer;
      user-select: none;
      &--selected {
        color: $white;
        border-color: $red;
        background-color: $red;
      }
    }
  }
}
</style>
