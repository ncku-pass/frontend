<template>
  <li class="experience-list-item">
    <h4 class="experience-list-item__title">
      {{ name }}
    </h4>
    <ul class="experience-list-item__tags">
      <li
        v-for="tag in tags"
        :key="tag"
        class="tag"
      >
        {{ tag }}
      </li>
    </ul>
    <div class="experience-list-item__btns">
      <button class="experience-list-item__btns__edit btn-pill">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.72 16.456L9.481 15.948L20.084 5.218C20.1676 5.1323 20.2142 5.01713 20.2136 4.89738C20.2131 4.77764 20.1654 4.66291 20.081 4.578L19.446 3.936C19.405 3.89384 19.3559 3.86027 19.3018 3.83726C19.2477 3.81424 19.1895 3.80225 19.1306 3.80197C19.0718 3.80169 19.0135 3.81313 18.9591 3.83563C18.9048 3.85813 18.8554 3.89123 18.814 3.933L8.239 14.635L7.719 16.455L7.72 16.456ZM20.703 2.664L21.338 3.307C22.214 4.194 22.222 5.625 21.354 6.503L10.428 17.561L6.664 18.645C6.4342 18.7093 6.18826 18.6798 5.98016 18.5631C5.77206 18.4463 5.6188 18.2517 5.554 18.022C5.50578 17.8569 5.50509 17.6815 5.552 17.516L6.647 13.676L17.544 2.647C17.7512 2.43836 17.9979 2.27306 18.2696 2.16075C18.5414 2.04844 18.8328 1.99137 19.1269 1.99286C19.4209 1.99435 19.7117 2.05437 19.9823 2.16943C20.2529 2.28448 20.4979 2.45227 20.703 2.663V2.664ZM9.184 3.817C9.68 3.817 10.082 4.224 10.082 4.726C10.0828 4.84467 10.0602 4.96233 10.0155 5.07225C9.97076 5.18218 9.90481 5.28221 9.82141 5.36663C9.73801 5.45105 9.63879 5.51821 9.52942 5.56426C9.42004 5.61031 9.30267 5.63434 9.184 5.635H5.592C4.6 5.635 3.796 6.449 3.796 7.452V18.358C3.796 19.362 4.6 20.176 5.592 20.176H16.368C17.36 20.176 18.165 19.362 18.165 18.358V14.723C18.165 14.221 18.567 13.814 19.063 13.814C19.559 13.814 19.961 14.221 19.961 14.724V18.358C19.961 20.366 18.352 21.994 16.368 21.994H5.592C3.608 21.994 2 20.366 2 18.358V7.452C2 5.445 3.608 3.817 5.592 3.817H9.184Z"
            fill="#4F4F4F"
          />
        </svg>
        編輯
      </button>
      <!-- TODO:  寫死的資料改掉-->
      <button
        class="experience-list-item__btns__delete btn-pill"
        :class="{disabled: false}"
        :disabled="false"
        @click="confirmDelete"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.75 7.5V13.5C6.75 13.6989 6.82902 13.8897 6.96967 14.0303C7.11032 14.171 7.30109 14.25 7.5 14.25C7.69891 14.25 7.88968 14.171 8.03033 14.0303C8.17098 13.8897 8.25 13.6989 8.25 13.5V7.5C8.25 7.30109 8.17098 7.11032 8.03033 6.96967C7.88968 6.82902 7.69891 6.75 7.5 6.75C7.30109 6.75 7.11032 6.82902 6.96967 6.96967C6.82902 7.11032 6.75 7.30109 6.75 7.5Z"
            fill="white"
          />
          <path
            d="M10.5 6.75C10.6989 6.75 10.8897 6.82902 11.0303 6.96967C11.171 7.11032 11.25 7.30109 11.25 7.5V13.5C11.25 13.6989 11.171 13.8897 11.0303 14.0303C10.8897 14.171 10.6989 14.25 10.5 14.25C10.3011 14.25 10.1103 14.171 9.96967 14.0303C9.82902 13.8897 9.75 13.6989 9.75 13.5V7.5C9.75 7.30109 9.82902 7.11032 9.96967 6.96967C10.1103 6.82902 10.3011 6.75 10.5 6.75Z"
            fill="white"
          />
          <path
            d="M12 3H16.5C16.6989 3 16.8897 3.07902 17.0303 3.21967C17.171 3.36032 17.25 3.55109 17.25 3.75C17.25 3.94891 17.171 4.13968 17.0303 4.28033C16.8897 4.42098 16.6989 4.5 16.5 4.5H15.6705L14.5425 14.664C14.4406 15.5813 14.004 16.4288 13.3163 17.0443C12.6285 17.6598 11.738 18.0001 10.815 18H7.185C6.26205 18.0001 5.37148 17.6598 4.68373 17.0443C3.99599 16.4288 3.55939 15.5813 3.4575 14.664L2.328 4.5H1.5C1.30109 4.5 1.11032 4.42098 0.96967 4.28033C0.829018 4.13968 0.75 3.94891 0.75 3.75C0.75 3.55109 0.829018 3.36032 0.96967 3.21967C1.11032 3.07902 1.30109 3 1.5 3H6C6 2.20435 6.31607 1.44129 6.87868 0.87868C7.44129 0.31607 8.20435 0 9 0C9.79565 0 10.5587 0.31607 11.1213 0.87868C11.6839 1.44129 12 2.20435 12 3ZM9 1.5C8.60218 1.5 8.22064 1.65804 7.93934 1.93934C7.65804 2.22064 7.5 2.60218 7.5 3H10.5C10.5 2.60218 10.342 2.22064 10.0607 1.93934C9.77936 1.65804 9.39782 1.5 9 1.5ZM3.8385 4.5L4.9485 14.499C5.00977 15.0493 5.27179 15.5576 5.68442 15.9268C6.09705 16.296 6.63132 16.5001 7.185 16.5H10.815C11.3684 16.4997 11.9023 16.2955 12.3146 15.9263C12.727 15.5572 12.9888 15.049 13.05 14.499L14.163 4.5H3.84H3.8385Z"
            fill="white"
          />
        </svg>
        刪除
      </button>
    </div>
    <ConfirmModal
      v-if="showConfirmModal"
      :message="name"
      confirm-type="delete"
      @cancel="showConfirmModal = false"
      @confirm="deleteExperience"
    />
  </li>
</template>

<script>
import ConfirmModal from '@/components/ConfirmModal'
import { ref } from 'vue'

export default {
  components: {
    ConfirmModal
  },
  props: {
    name: {
      type: String,
      default: '歷程名稱'
    },
    tags: {
      type: Array,
      default () {
        return []
      }
    }
  },
  setup (props) {
    const showConfirmModal = ref(false)

    const confirmDelete = () => {
      showConfirmModal.value = true
    }

    const deleteExperience = () => {
      console.log('刪除')
    }

    return { showConfirmModal, confirmDelete, deleteExperience }
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/variables";
@import "../scss/mixins";

.experience-list-item {
  display: flex;
  align-items: center;
  padding: 10px 5px 10px 10px;
  border-radius: 5px;
  transition: background .3s;
  &:hover {
    background-color: #F8F8F8;
  }
  &__title {
    margin: 0;
    margin-right: 15px;
    font-weight: $weight-medium;
  }
  &__tags {
    @include grid(column, 0, 6px);
  }
  &__btns {
    @include grid(column, 0, 10px);
    margin-left: auto;
    &__edit {
      color: $gray-2;
      background-color: #fff;
    }
    &__delete {
      color: #fff;
      background-color: $gray-2;
      &.disabled {
        background-color: $gray-4;
        border: 1px solid $gray-4;
      }
    }
  }
}
</style>
