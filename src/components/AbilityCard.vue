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
        group="experience"
        item-key="id"
        @start="drag=true"
        @end="drag=false"
      >
        <template #item="{element}">
          <li class="experience-card">
            <h3 class="experience-card__name">
              {{ element.name }}
            </h3>
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
              {{ element.description }}
            </div>
          </li>
        </template>
      </draggable>

      <!-- <li
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
      </li> -->
      <p class="ability-card__body__tips">
        由右方列表拉入適合課程
      </p>
    </ul>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

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
  emits: ['update:abilityTopic'],
  setup () {
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
.experience-card.sortable-chosen {
  .experience-card__tags {
    display: none;
  }
  .experience-card__description {
    display: none;
  }
}
</style>
