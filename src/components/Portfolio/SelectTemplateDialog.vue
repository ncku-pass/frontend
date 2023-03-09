<template>
  <Dialog
    id='select-temp-dialog'
    v-model:visible='showDialog'
    class='no-header no-icon'
    :closable='false'
    :dismissableMask='true'
    :modal='true'
    :draggable='false'
  >
    <Dropdown v-model='selected' :options='templates' optionLabel='name' />
    <p> {{ selected.sections }} </p>
    <div class='template-preview'>
      <img
        :src='require(`@/assets/Portfolio/${selected.name}.png`)'
        :alt='`${selected.name}範本`'
        rel='preload'
      />
    </div>
    <p>模板樣本</p>
    <template #footer>
      <Button
        label='取消'
        class='p-button-secondary p-button-outlined'
        @click='showDialog = false'
      />
      <Button label='確認' @click='onSelectTemplate' />
    </template>
  </Dialog>
</template>

<script>
import { computed, ref } from 'vue'
import Dialog from 'primevue/dialog'
import Dropdown from 'primevue/dropdown'
import { templates } from '@/components/Portfolio/portfolioTemplateSchema'

export default {
  name: 'SelectTemplateDialog',
  components: {
    Dialog,
    Dropdown,
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['close-template-dialog', 'select-template'],
  setup(props, { emit }) {
    const showDialog = computed({
      get: () => props.visible,
      set: () => emit('close-template-dialog')
    })
    const selected = ref(templates[0])

    const onSelectTemplate = () => {
      emit('select-template', {
        name: selected.value.name,
        cards: selected.value.cards,
      })
    }

    return {
      showDialog,
      selected,
      templates,
      onSelectTemplate
    }
  }
}
</script>

<style lang='scss'>
#select-temp-dialog {
  max-height: 80vh;

  .p-dialog-content {
    display: grid;
    gap: 16px;
    justify-items: center;
    padding-bottom: 1rem !important;

    .p-dropdown {
      width: 150px;
    }

    .template-preview {
      overflow-y: auto;
    }
  }

  .p-dialog-footer {
    display: flex;
    justify-content: center;
  }

}
</style>
