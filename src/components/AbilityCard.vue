<template>
  <div class="ability-card">
    <input
      v-model="abilityTopic"
      class="ability-card__topic"
      placeholder="填入能力主題，如文書行政能力/溝通能力..."
    >
    <hr>
    <ul class="ability-card__body">
      <li
        v-for="experience in experiences"
        :key="experience.name"
        class="experience-card"
      >
        <h3 class="experience-card__name">
          {{ experience.name }}
        </h3>
        <div class="experience-card__tags">
          <div
            v-for="tag in experience.tags"
            :key="tag"
            class="tag"
          >
            {{ tag }}
          </div>
        </div>
        <div class="experience-card__description">
          {{ experience.description }}
        </div>
      </li>
      <p class="ability-card__body__tips">
        由右方列表拉入適合課程
      </p>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'AbilityCard',
  props: {
    experiences: {
      type: Array,
      default () {
        return []
      }
    }
  },
  setup () {
    const abilityTopic = ref('')

    return { abilityTopic }
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/variables";
@import "../scss/mixins";

.ability-card {
  @include grid(row, 12px, 0);
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
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 24px;
  background-color: #fff;
  &__name {
    font-size: 26px;
    line-height: 43px;
    color: $blue-dark;
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
</style>
