<template>
  <Dialog
    id='add-exp-dialog'
    v-model:visible='showDialog'
    header='新增經驗'
    :dismissableMask='true'
    :modal='true'
    :draggable='false'
  >
    <div v-for='(item, i) in schema' :key='item.inputKey'>
      <label :class='{ "required": item.required }'>
        {{ item.label }}
        <div v-if='item.remarks'>
          <mdicon
            :id='`${item.inputKey}__remarks-icon`'
            name='information'
            size='16'
            @click='(evt) => toggleRemarkPanel(evt, i)'
          />
          <OverlayPanel
            :ref='(el) => { overlayPanelRefs[i] = el }'
            class='add-exp-dialog__remarks'
            :dismissable='true'
          >
            <component :is='item.remarks' />
          </OverlayPanel>
        </div>
      </label>
      <DynamicFormRenderer
        :schema='item'
        :data='typeof item.inputKey === "string" ? inputData[item.inputKey] : inputData'
        :validate-state='getValidateState(item.inputKey, item.label)'
        @input='updateData($event)'
      />
    </div>
    <template #footer>
      <Button
        :disabled='isSubmitLoading'
        class='p-button-secondary p-button-outlined'
        @click='showDialog = false'
      >
        取消
      </Button>
      <Button
        :loading='isSubmitLoading'
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
import { computed, onBeforeUpdate, ref, watch } from 'vue'
import { mdiInformation } from '@mdi/js'

import * as formSchema from './experienceSchema'
import DynamicFormRenderer from '@/components/Form/DynamicFormRenderer'
import { addExperience, updateExperience } from '@/api/experiences'
import { useStore } from 'vuex'
import { generateEmptyExp, generateExpValidationRules } from '@/helpers/experiences.helper'
import useVuelidate from '@vuelidate/core'

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
    expId: {
      type: Number,
      default: null,
    },
  },
  emits: ['close-dialog'],
  setup(props, { emit }) {
    const store = useStore()
    const schema = computed(() => formSchema[props.expType])

    // === INIT AND CLEAN UP ===
    const inputData = ref({})

    const showDialog = computed({
      get: () => props.visible,
      set: (val) => {
        if (!val) {
          if (isFormDirty.value) {
            showDialog.value = true
            showCloseReminder()
          } else {
            closeDialog(false)
          }
        }
      }
    })
    watch(showDialog, (val) => {
      if (val && !isFormDirty.value) {
        // create exp
        if (!props.expId) {
          inputData.value = generateEmptyExp(props.expType)

        // edit exp
        } else {
          const fromStore = store.getters['experiences/experienceByTypeAndId'](props.expType, props.expId)
          inputData.value = fromStore === undefined ? generateEmptyExp(props.expType) : { ...fromStore }
        }

        // only show error msg when edit
        isShowErrorMessage.value = !!props.expId
      }
    })

    const closeDialog = (needRefresh) => {
      isFormDirty.value = false
      inputData.value = {}
      isShowErrorMessage.value = false
      emit('close-dialog', needRefresh)
    }

    // === HANDLE DATA CHANGE ===
    const isFormDirty = ref(false)
    const updateData = ({ key, value }) => {
      isFormDirty.value = true
      inputData.value[key] = value
    }

    // === HANDLE SUBMIT ===
    const toast = useToast()
    const isSubmitLoading = ref(false) // control button status
    const isShowErrorMessage = ref(false) // control if to show error message

    const onSubmitExp = async() => {
      if (v$.value.$invalid) {
        isShowErrorMessage.value = true
        return
      }
      isSubmitLoading.value = true

      const payload = {
        ...inputData.value,
        type: props.expType,
        tags: inputData.value.tags.map(tag => tag.id)
      }
      try {
        if (props.expId) {
          await updateExperience(payload.id, payload)
        } else {
          await addExperience(payload)
        }

        closeDialog(true)

      } catch (error) {
        toast.add({ severity: 'error', summary: '儲存出錯！', detail: '無法儲存經歷，請再次嘗試', life: 10000 })

      } finally {
        isSubmitLoading.value = false
        isFormDirty.value = false
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
          closeDialog(false)
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
        if (showDialog.value) {
          overlayPanelRefs.value[idx].hide(evt)
        }
      }, 5000)
    }

    // FORM VALIDATION
    const rules = computed(() => generateExpValidationRules(props.expType))
    const v$ = useVuelidate(rules, inputData)

    const getValidateState = (inputKey, label) => {
      if (!isShowErrorMessage.value) {
        return undefined

      } else if (typeof inputKey === 'string') {
        return v$.value[inputKey]

      } else {
        // inputKey is an array
        let state
        inputKey.forEach(key => {
          if (v$.value[key]) {
            state = {
              ...v$.value[key],
              label
            }
          }
        })
        return state
      }
    }

    return {
      showDialog,
      schema,
      inputData,
      isSubmitLoading,
      isShowErrorMessage,
      onSubmitExp,
      updateData,
      overlayPanelRefs,
      toggleRemarkPanel,
      v$,
      getValidateState,
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
