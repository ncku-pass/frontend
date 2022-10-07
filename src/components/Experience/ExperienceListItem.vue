<template>
  <li class='experience-list-item' :class='`experience-list-item--${device}`'>
    <h4 class='experience-list-item__title'>
      {{ experience.name }}
    </h4>

    <div class='experience-list-item__tags'>
      <Chip v-for='tag in experience.tags' :key='tag.id' :label='tag.name' />
    </div>

    <div class='experience-list-item__btns'>
      <Button
        class='p-button-rounded p-button-outlined p-button-secondary p-button-sm'
        @click.stop='handleEditExperience'
      >
        <mdicon name='squareEditOutline' :size='device === "mobile" ? 14 : 20' />
        <span v-if='device !== "mobile"' class='p-button-label'>編輯</span>
      </Button>
      <!-- TODO:  寫死的資料改掉-->
      <Button class='p-button-rounded p-button-secondary p-button-sm' @click.stop='showDeleteConfirm'>
        <mdicon name='trashCanOutline' :size='device === "mobile" ? 14 : 20' />
        <span v-if='device !== "mobile"' class='p-button-label'>刪除</span>
      </Button>
    </div>
  </li>
</template>

<script>
import { reactive } from 'vue'
import Button from 'primevue/button'
import Chip from 'primevue/chip'
import { useConfirm } from 'primevue/useconfirm'

import { deleteExperience } from '@/api/experiences'

export default {
  components: {
    Button,
    Chip,
  },
  inject: ['mq'],
  props: {
    experience: {
      type: Object,
      default() {
        return {}
      }
    },
  },
  emits: ['delete', 'edit'],
  setup(props, { emit }) {
    const deleteStatus = reactive({
      isPending: false,
      error: null
    })

    // TODO: 用vuex去處理
    const handleDeleteExperience = async() => {
      try {
        deleteStatus.isPending = true
        deleteStatus.error = null
        await deleteExperience(props.experience.id)

        confirm.close()
        emit('delete')

      } catch (error) {
        deleteStatus.error = error

      } finally {
        deleteStatus.isPending = false
      }
    }

    const handleEditExperience = async() => {
      emit('edit', props.experience.id)
    }

    // === CONFIRMATION MODEL ===
    const confirm = useConfirm()
    const showDeleteConfirm = () => {
      confirm.require({
        group: 'delete-exp',
        message: props.experience.name,
        acceptLabel: '確定刪除',
        rejectLabel: '取消',
        accept: () => {
          handleDeleteExperience()
        },
      })
    }

    return {
      showDeleteConfirm,
      deleteStatus,
      handleEditExperience,
    }
  },
  computed: {
    device() {
      return this.mq.current
    }
  },
}
</script>

<style lang='scss' scoped>
@import '~@/scss/variables';
@import '~@/scss/mixins';

.experience-list-item {
  display: flex;
  align-items: center;
  gap: 0 10px;
  padding: 10px 5px 10px 10px;

  &:hover {
    background-color: #f8f8f8;
  }

  &__title {
    flex-shrink: 0;
    max-width: 250px;
  }

  &__tags {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    color: $red-8;
    font-size: 10px;

    :deep(.p-chip) {
      margin-right: 12px;
    }
  }
  &__btns {
    @include grid(column, 0, 10px);
    margin-left: auto;
    flex-shrink: 0;

    .p-button-label {
      margin-left: 4px;
    }
  }

  &--mobile {
    .experience-list-item__title {
      @include font-format('b2', $color: $red-8)
    }

    .experience-list-item__tags {
      :deep(.p-chip) {
        margin-right: 6px;
      }
      :deep(.p-chip-text) {
        @include font-format('b4');
      }
    }

    .p-button-sm {
      padding: 4px 8px;
    }
  }
}
</style>
