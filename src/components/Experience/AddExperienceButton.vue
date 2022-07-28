<template>
  <div class='add-experience-button'>
    <MqResponsive target='tablet+'>
      <SplitButton v-if='isShowOptions' label='新增經驗' :model='addExpOptions' />
      <Button v-else label='新增校外或其他經驗' @click='$emit("add-experience")' />
    </MqResponsive>

    <MqResponsive target='mobile' style='width: 100%'>
      <SpeedDial v-if='isShowOptions' :model='addExpOptions'>
        <template #item='slotProps'>
          <div @click='slotProps.item.command'>
            {{ slotProps.item.label }}
          </div>
        </template>
      </SpeedDial>
      <Button v-else icon='pi pi-plus' class='p-button-rounded button--float' @click='$emit("add-experience")' />
    </MqResponsive>
  </div>
</template>

<script>
import { computed } from 'vue'
import SplitButton from 'primevue/splitbutton'
import Button from 'primevue/button'
import SpeedDial from 'primevue/speeddial'
import { MqResponsive } from 'vue3-mq'

export default {
  name: 'AddExperienceButton',
  components: {
    SplitButton,
    Button,
    SpeedDial,
    MqResponsive
  },
  props: {
    type: {
      type: String,
      required: true
    }
  },
  emits: ['import-ncku-data', 'add-experience'],
  setup(props, { emit }) {
    const isShowOptions = computed(() => {
      return props.type === 'course' || props.type === 'activity'
    })

    const addExpOptions = [{
      label: '匯入校內紀錄',
      command: () => {
        emit('import-ncku-data')
      }
    }, {
      label: '新增其他經驗',
      command: () => {
        emit('add-experience')
      }
    }]

    return {
      isShowOptions,
      addExpOptions
    }
  }
}
</script>

<style lang='scss' scoped>
.add-experience-button {
  justify-content: center;
  display: flex;

 :deep(.p-speeddial) {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translate(-50%);

    .p-button {
      width: 40px;
      height: 40px;
      box-shadow: 1px 1px 3px #757575;
    }

    &-opened {
      .p-speeddial-list {
        background: #ffffff;
        box-shadow: 0 2px 4px -1px #757575;
        color: #495057;
        border: 1px solid #dee2e6;
        border-radius: 3px;
        width: 12.5rem;
        margin-bottom: 20px;

        .p-speeddial-item {
          padding: 12px 16px;
          cursor: pointer;
          width: 100%;
          text-align: center;

          &:hover {
            background: #e9ecef;
          }
        }
      }
    }
  }
  .button--float {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translate(-50%);
    width: 40px;
    height: 40px !important;
    box-shadow: 1px 1px 3px #757575;

    :deep(.p-button-icon) {
      font-size: 1.3rem;
    }
  }
}
</style>
