<template>
  <div class='add-experience-button'>
    <MqResponsive target='tablet+'>
      <Menu ref='menuRef' :model='addExpOptions' :popup='true' />
      <Button
        v-if='isShowOptions'
        icon='pi pi-plus'
        label='新增經驗'
        :disabled='loading'
        @click='toggleMenu'
      />
      <Button v-else icon='pi pi-plus' label='新增校外或其他經驗' :disabled='loading' @click='$emit("add-experience")' />
      <div v-if='showBadge' class='button-badge' />
    </MqResponsive>

    <MqResponsive target='mobile' style='width: 100%'>
      <SpeedDial v-if='isShowOptions' :model='addExpOptions' :disabled='loading'>
        <template #item='slotProps'>
          <div @click='slotProps.item.command'>
            {{ slotProps.item.label }}
          </div>
        </template>
      </SpeedDial>
      <Button v-else icon='pi pi-plus' class='p-button-rounded button--float' :disabled='loading' @click='$emit("add-experience")' />
    </MqResponsive>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import SpeedDial from 'primevue/speeddial'
import Menu from 'primevue/menu'
import { MqResponsive } from 'vue3-mq'
import { canImportFromSchool } from '@/helpers/experiences.helper'
import { useStore } from 'vuex'

export default {
  name: 'AddExperienceButton',
  components: {
    SpeedDial,
    Menu,
    MqResponsive
  },
  props: {
    showBadge: {
      type: Boolean,
      required: true
    },
    loading: {
      type: Boolean,
      required: true,
    }
  },
  emits: ['import-ncku-data', 'add-experience'],
  setup(props, { emit }) {
    const store = useStore()
    const activeTab = computed(() => store.state.experiences.activeTab)
    const menuRef = ref(null)

    const isShowOptions = computed(() => {
      return canImportFromSchool(activeTab.value)
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

    const toggleMenu = (event) => {
      console.log(event)
      menuRef.value.toggle(event)
    }

    return {
      menuRef,
      isShowOptions,
      addExpOptions,
      toggleMenu
    }
  }
}
</script>

<style lang='scss' scoped>
@import '~@/scss/_variables.scss';

.add-experience-button {
  justify-content: center;
  display: flex;
  position: relative;

  .p-splitbutton {
    height: 37px;
  }

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
