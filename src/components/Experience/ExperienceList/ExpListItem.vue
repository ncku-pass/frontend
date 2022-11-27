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
        class='p-button-rounded p-button-outlined p-button-secondary p-button-sm btn-icon'
        @click.stop='handleEditExperience'
      >
        <mdicon name='squareEditOutline' :size='device === "mobile" ? 14 : 20' />
        <p v-if='device !== "mobile"'>編輯</p>
      </Button>
      <Button class='p-button-rounded p-button-secondary p-button-sm btn-icon' @click.stop='showDeleteConfirm'>
        <mdicon name='trashCanOutline' :size='device === "mobile" ? 14 : 20' />
        <p v-if='device !== "mobile"'>刪除</p>
      </Button>
    </div>
  </li>
</template>

<script>
import { reactive } from 'vue'
import Chip from 'primevue/chip'
import { useConfirm } from 'primevue/useconfirm'

import { deleteExperience } from '@/api/experiences'

export default {
  components: {
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
  emits: ['delete-exp-completed', 'edit'],
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
        emit('delete-exp-completed')

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
@import '~@/scss/_variables';
@import '~@/scss/_mixins';

.experience-list-item {
  display: flex;
  align-items: center;
  gap: 0 10px;
  padding: 10px 5px 10px 10px;

  &:hover {
    background-color: $grey-0;
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
