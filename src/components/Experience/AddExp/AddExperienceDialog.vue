<template>
  <Dialog id='add-exp-dialog' v-model:visible='showDialog' header='新增經驗'>
    <div v-for='(item, i) in schema' :key='item.key'>
      <label :class='{ "required": item.required }'>
        {{ item.label }}
        <mdicon
          v-if='item.remarks'
          name='information'
          size='16'
          :aria-controls='`${item.key}-remarks`'
          @click='(evt) => toggleRemarkPanel(evt, i)'
        />
        <OverlayPanel
          :id='`${item.key}-remarks`'
          :ref='(el) => { overlayPanelRefs[i] = el }'
          appendTo='body'
          :class='`add-exp-dialog__remarks`'
          :dismissable='true'
        >
          <component :is='item.remarks' />
        </OverlayPanel>
      </label>
      <DynamicFormRenderer
        :schema='item'
        :data='inputData[item.key]'
        @input='updateData($event)'
      />
    </div>
    <template #footer>
      <Button
        :disabled='submitStatus.isPending'
        class='p-button-secondary p-button-outlined'
        @click='onCancelAddExp'
      >
        取消
      </Button>
      <Button
        :loading='submitStatus.isPending'
        @click='onSubmitExp'
      >
        儲存
      </Button>
    </template>
  </Dialog>
  <ConfirmDialog />
</template>

<script>
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import OverlayPanel from 'primevue/overlaypanel'
import ConfirmDialog from 'primevue/confirmdialog'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import { computed, onBeforeUpdate, reactive, ref } from 'vue'
import { mdiInformation } from '@mdi/js'

import * as formSchema from './experienceSchema'
import DynamicFormRenderer from '@/components/Form/DynamicFormRenderer'
import { addExperience, updateExperience } from '@/api/experiences';

export default {
  name: 'AddExperienceDialog',
  components: {
    Button,
    Dialog,
    OverlayPanel,
    ConfirmDialog,
    DynamicFormRenderer,
    mdiInformation,
  },
  props: {
    visible: {
      required: true,
      type: Boolean,
    },
    expType: {
      type: String,
      default: 'activity',
      validator(value) {
        return ['course', 'activity', 'competition', 'work', 'certificate', 'other'].includes(value)
      }
    },
    initValue: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  emits: ['update:visible'],
  setup(props, context) {
    const showDialog = computed({
      get: () => props.visible,
      set: (val) => {
        // closing the dialog
        if (!val) {
          submitStatus.isPending = false
          submitStatus.error = null
        }
        context.emit('update:visible', val)
      }
    })
    const schema = computed(() => formSchema[props.expType])

    // === HANDLE DATA CHANGE ===
    const inputData = computed(() => props.initValue)
    let isFormDirty = false

    const updateData = ({ key, value }) => {
      isFormDirty = true
      inputData.value[key] = value
    }

    // === HANDLE SUBMIT ===
    const toast = useToast()
    const submitStatus = reactive({
      error: null,
      isPending: false
    })

    const onCancelAddExp = () => {
      if (isFormDirty) {
        showCloseReminder()
      } else {
        showDialog.value = false
      }
    }

    const onSubmitExp = async() => {
      submitStatus.isPending = true
      console.log(inputData)
      console.log(inputData.value)

      const payload = {
        ...inputData.value,
        tags: inputData.value.tags.map(tag => tag.id)
      }
      try {
        if (props.initValue) {
          await updateExperience(payload.id, payload)
        } else {
          await addExperience(payload)
        }

        // close the dialog
        showDialog.value = false

      } catch (error) {
        onSubmitExp.error = error
        toast.add({ severity: 'error', summary: '儲存出錯！', detail: '無法儲存經歷，請再次嘗試', life: 10000 })
      } finally {
        onSubmitExp.isPending = false
      }
    }

    // === CONFIRMATION MODEL ===
    const confirm = useConfirm()
    const showCloseReminder = () => {
      confirm.require({
        message: '離開則無法儲存資料喔！',
        header: '確定要離開嗎？',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: '確定離開',
        rejectLabel: '留下',
        accept: () => {
          showDialog.value = false
        },
      })
    }

    // === REMARK PANEL ===
    const overlayPanelRefs = ref([])
    // make sure to reset the refs before each update
    onBeforeUpdate(() => {
      overlayPanelRefs.value = []
    })
    const toggleRemarkPanel = (evt, idx) => {
      overlayPanelRefs.value[idx].toggle(evt)

      setTimeout(() => {
        overlayPanelRefs.value[idx].toggle(evt)
      }, 5000)
    }

    return {
      showDialog,
      schema,
      inputData,
      submitStatus,
      onCancelAddExp,
      onSubmitExp,
      updateData,
      overlayPanelRefs,
      toggleRemarkPanel,
    }
  }
}
</script>

<style lang='scss'>
@import '~@/scss/_variables.scss';
@import '~@/scss/_mixins.scss';

#add-exp-dialog {
  width: 100%;
  max-width: 770px;
  max-height: 80vh;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;

  label {
    @include grid(column, 0, 10px);
    justify-content: flex-start;
    color: $blue-dark;
    line-height: 24px;
    font-weight: 500;
    letter-spacing: 0.05em;
    margin-bottom: 8px;
    user-select: none;

    &.required::before {
      content: '*';
    }

    .mdi {
      height: 24px;
      display: flex;
      align-items: center;
    }
  }

  .p-dialog-content {
    @include grid(row, 20px, 0);
  }

  .p-dialog-footer {
    padding: 8px 16px;
    .p-button {
      margin-left: 16px;
    }
  }
}

.add-exp-dialog {
  &__remarks {
    border-radius: 8px !important;

    .p-overlaypanel-content {
      .tags {
        .title {
          color: $blue-dark;
          font-weight: 500;
        }

        p {
          margin-top: 5px;
          margin-bottom: 10px;
        }
      }

      .inline-code {
        padding: 0 7px;
        background-color: $grey-1;
        border-radius: 5px;
        display: inline-block;
      }
    }
  }
}
</style>
