<template>
  <div class="ability-card">
    <input class="ability-card__topic" placeholder="填入能力主題，如文書行政能力/溝通能力...">
    <hr>
    <ul class="ability-card__body">
      <li
        v-for="j in [1,2,3]"
        :key="j"
        class="experience-card"
      >
        <h3 class="experience-card__name">
          系統分析與設計
        </h3>
        <div class="experience-card__tags">
          <div
            v-for="i in [1,2,3]"
            :key="i"
            class="tag"
          >
            tag
          </div>
        </div>
        <div class="experience-card__description">
          蘇霍姆林斯基在過去曾經講過，熱愛祖國，這是一種最純潔、最高尚、最強烈、最溫柔、最無情、最溫存、最嚴酷的感情。這段話令我陷入了沈思。本人也是經過了深思熟慮，在每個日日夜夜思考這個問題。老舊的想法已經過時了。我們都很清楚，這是個嚴謹的議題。不要先入為主覺得心得很複雜，實際上，心得可能比你想的還要更複雜。想必大家都能了解心得的重要性。
        </div>
      </li>
      <p class="ability-card__body__tips">
        由右方列表拉入適合課程
      </p>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AbilityCard'
}
</script>

<style lang="scss" scoped>
@import "../scss/variables";
@import "../scss/mixins";

.ability-card {
  @include grid(row, 12px, 0);
  background-color: #f8f8f8;
  border-radius: 8px;
  padding: 15px 0;
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
