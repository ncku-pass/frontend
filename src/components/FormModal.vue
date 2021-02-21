<template>
  <div class="form-modal modal" @click.self="$emit('cancel')">
    <div class="form-modal__content">
      <div>
        <label for="" class="form-label">*課程名稱</label>
        <input
          type="text"
          class="form-control"
          placeholder="請輸入課程名稱"
        >
      </div>
      <div>
        <label for="" class="form-label">課程簡介</label>
        <textarea
          class="form-control"
          rows="3"
          draggable="false"
          placeholder="填寫課程簡介以便日後方便回想課程內容"
        />
      </div>
      <div>
        <label for="" class="form-label">標籤分類</label>
        <div class="form-modal__content__tags">
          <div class="tag--large">
            國際視野
          </div>
          <div class="tag--large">
            數理能力
          </div>
        </div>
      </div>
      <div>
        <label for="" class="form-label">課程收穫及成就 (150字以內)</label>
        <input
          type="text"
          class="form-control"
          placeholder="將課程中所得到的收穫極成就記錄下來吧~"
        >
      </div>
      <div>
        <label for="" class="form-label">其他連結</label>
        <input
          type="text"
          class="form-control"
        >
      </div>
      <div class="form-modal__content__btns">
        <button class="btn" @click="$emit('cancel')">
          取消
        </button>
        <button class="btn--danger">
          儲存
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['cancel']
}
</script>

<style lang="scss">
@import "../scss/mixins";

.form-modal__content {
  display: grid;
  grid-auto-flow: row;
  gap: 20px 0;
  padding: 25px;
  width: 770px;
  background-color: #fff;
  border-radius: 8px;
  &__tags {
    @include grid(column, 0, 6px);
    justify-content: start;
  }
  &__btns {
    @include grid(column, 0, 18px);
    justify-content: end;
  }
}
</style>
