<template>
  <div class="modal-bg" @click.self="showConfirmModal = true">
    <div class="form-modal">
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
          <label for="" class="form-label">*課程時間</label>
          <select class="form-control">
            <option
              value=""
              selected
            >
              請選擇課程時間
            </option>
          </select>
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
          <button class="btn" @click="showConfirmModal = true">
            取消
          </button>
          <button class="btn--danger">
            儲存
          </button>
        </div>
      </div>
    </div>
  </div>
  <ConfirmModal
    v-if="showConfirmModal"
    confirm-message="確定離開"
    cancel-message="留下"
    @cancel="showConfirmModal = false"
    @confirm="$emit('cancel')"
  />
</template>

<script>
import ConfirmModal from '@/components/ConfirmModal.vue'
import { ref } from 'vue'

export default {
  components: { ConfirmModal },
  emits: ['cancel'],
  setup () {
    const showConfirmModal = ref(false)

    return { showConfirmModal }
  }
}
</script>

<style lang="scss">
@import "../scss/mixins";
.form-modal {
  width: 770px;
  max-height: 80vh;
  padding: 25px;
  background-color: #fff;
  border-radius: 8px;
  display: flex;
}

.form-modal__content {
  @include grid(row, 20px, 0);
  width: 100%;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
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
