<template>
  <div class='experience-list-block'>
    <h3 class='experience-list-block__semester' :class='`experience-list-block__semester--${device}`'>
      {{ semester }}
    </h3>
    <ul class='experience-list-block__list'>
      <slot />
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ExperienceListBlock',
  inject: ['mq'],
  props: {
    semester: {
      type: String,
      default: '未知學期'
    },
  },
  computed: {
    device() {
      return this.mq.current
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~@/scss/variables';
@import '~@/scss/mixins';

.experience-list-block {
  margin-bottom: 15px;

  &__semester {
    margin: 5px;
    font-size: 26px;
    font-weight: $weight-medium;
    color: $grey-4;

    &--mobile {
      @include font-format('b2', $color: $grey-3)
    }
  }
}
</style>
