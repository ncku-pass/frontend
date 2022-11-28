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
  </div>
</template>

<script>
export default {
  name: 'ExpQuickEditToolbar',
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
  @include grid(column, 0, 32px);
  display: flex;
  margin-bottom: 24px;

  &__btns {
    @include grid(column, 0, 8px);

    .p-button-sm {
      height: 32px;
    }
  }

}
</style>
