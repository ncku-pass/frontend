<template>
  <li class="menu-card" :data-id="element.id">
    <div
      class="menu-card__type"
      :class="`menu-card__type--${element.experienceType}`"
    >
      {{ typeChinese[element.experienceType] }}
    </div>
    <span class="menu-card__name">{{ element.name }}</span>
    <svg
      width="15"
      height="10"
      viewBox="0 0 15 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1L7.5 8L14 1"
        stroke="#4F4F4F"
        stroke-width="2"
      />
    </svg>
  </li>
</template>

<script>
const typeChinese = {
  course: '課',
  activity: '活',
  competition: '賽',
  work: '工',
  certificate: '證',
  other: '其'
}

export default {
  name: 'MenuCard',
  props: {
    element: {
      type: Object,
      required: true
    }
  },
  setup () {
    return { typeChinese }
  }
}
</script>

<style lang="scss">
@import "~@/scss/variables";

.menu-card {
  cursor: grab;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 2px;
  padding: 5px 15px;
  background-color: $gray-blue;
  border-radius: 5px;
  &__type {
    height: 30px;
    width: 30px;
    margin-right: 10px;
    line-height: 30px;
    text-align: center;
    border-radius: 10px;
    color: $white;
    &--course {
      background-color: $blue;
    }
    &--activity {
      background-color: $red-light;
    }
    &--competition {
      background-color: $purple;
    }
    &--work {
      background-color: $green;
    }
    &--certificate{
      background-color: $fuchsia;
    }
    &--other{
      background-color: $yellow;
    }
  }
  &__name {
    margin-right: auto;
  }
}
</style>
