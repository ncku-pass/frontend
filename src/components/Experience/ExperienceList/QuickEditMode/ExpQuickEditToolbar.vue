<template>
  <div class='quick-edit-toolbar'>
    <div class='quick-edit-toolbar__btns'>
      <Button
        label='全選'
        :class='selectedAll ? "" : "p-button-outlined p-button-secondary "'
        class='p-button-sm'
        @click.stop='$emit("select-all")'
      />

      <Button
        class='p-button-outlined p-button-secondary p-button-sm'
        :disabled='selectedNone'
        @click.stop='$emit("delete-exp")'
      >
        <mdicon name='trashCanOutline' size='20' />
      </Button>
    </div>

    <ExpQuickEditSelectTag
      :disable='selectedNone'
    />
  </div>
</template>

<script>
import ExpQuickEditSelectTag
  from '@/components/Experience/ExperienceList/QuickEditMode/ExpQuickEditSelectTag'
export default {
  name: 'ExpQuickEditToolbar',
  components: { ExpQuickEditSelectTag },
  props: {
    selectedAll: {
      type: Boolean,
      required: true,
    },
    selectedNone: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['select-all', 'delete-exp'],
  setup() {
  }
}
</script>

<style lang='scss' scoped>
@import '~@/scss/_mixins';

.quick-edit-toolbar {
  display: flex;
  gap: 0 32px;
  margin-bottom: 24px;

  &__btns {
    @include grid(column, 0, 8px);

    .p-button-sm {
      height: 38px;
    }
  }

}
</style>
