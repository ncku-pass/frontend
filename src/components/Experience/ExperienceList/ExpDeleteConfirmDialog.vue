<template>
  <ConfirmDialog class='no-header no-icon' group='delete-exp'>
    <template #message='slotProps'>
      <div>
        確定要刪除
        <span :style='{"color": `var(--primary-500)`}'>{{ slotProps.message.message }}</span>
        此項歷程？
      </div>
    </template>
  </ConfirmDialog>
</template>

<script>
export default {
  name: 'ExpDeleteConfirmDialog',
}
</script>

<style lang='scss' scoped>

</style>
