<template>
  <div class='experience-list-block'>
    <h3 class='experience-list-block__semester'>
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
  props: {
    semester: {
      type: String,
      default: '未知學期'
    }
  },
  setup(props) {
    return {};
  }
};
</script>

<style lang="scss" scoped>
@import '~@/scss/variables';

.experience-list-block {
  margin-bottom: 15px;
  &__semester {
    margin: 5px;
    font-size: 26px;
    font-weight: $weight-medium;
    color: $gray-3;
  }
}
</style>
