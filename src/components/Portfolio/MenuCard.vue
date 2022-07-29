<template>
  <li class='menu-card' :data-id='experience.id'>
    <div class='menu-card__type' :class='`menu-card__type--${experience.type}`'>
      {{ typeChinese[experience.type] }}
    </div>
    <span class='menu-card__name'>{{ experience.name }}</span>
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
    experience: {
      type: Object,
      required: true
    }
  },
  setup() {
    return { typeChinese }
  }
}
</script>

<style lang="scss">
@import '~@/scss/variables';

.menu-card {
  cursor: grab;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 2px;
  padding: 5px 15px;
  background-color: $grey-blue;
  border-radius: 5px;
  &:hover {
    background-color: $grey-2;
  }
  &[draggable='true'] {
    cursor: grabbing;
  }
  &__type {
    height: 30px;
    width: 30px;
    margin-right: 10px;
    line-height: 30px;
    text-align: center;
    border-radius: 10px;
    color: $white;
    flex-shrink: 0;
    &--course {
      background-color: $blue;
    }
    &--activity {
      background-color: $red-4;
    }
    &--competition {
      background-color: $purple;
    }
    &--work {
      background-color: $green;
    }
    &--certificate {
      background-color: $fuchsia;
    }
    &--other {
      background-color: $yellow;
    }
  }
  &__name {
    margin-right: auto;
  }
}
</style>
