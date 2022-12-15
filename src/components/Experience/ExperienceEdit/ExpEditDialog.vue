<template>
  <div>
    <Dialog
      id='exp-edit-dialog'
      v-model:visible='showDialog'
      :header='expId ? `修改學習歷程` : `新增學習歷程`'
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
              class='exp-edit-dialog__remarks'
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
          label='取消'
          :disabled='isSubmitLoading'
          class='p-button-secondary p-button-outlined'
          @click='showDialog = false'
        />
        <Button
          label='儲存'
          :disabled='v$.$invalid'
          :loading='isSubmitLoading'
          @click='onSubmitExp'
        />
      </template>
    </Dialog>
    <ConfirmDialog class='no-header no-icon' group='close-dialog' />
  </div>
</template>

<script>
import { computed, onBeforeUpdate, ref, watch } from 'vue'
import { useStore } from 'vuex'
import Dialog from 'primevue/dialog'
import OverlayPanel from 'primevue/overlaypanel'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import useVuelidate from '@vuelidate/core'
import { mdiInformation } from '@mdi/js'

import * as formSchema from './experienceSchema'
import DynamicFormRenderer from '@/components/Form/DynamicFormRenderer'
import { addExperience, updateExperience } from '@/api/experiences'
import { generateEmptyExp, generateExpValidationRules } from '@/helpers/experiences.helper'

export default {
  name: 'ExpEditDialog',
  components: {
    Dialog,
    OverlayPanel,
    DynamicFormRenderer,
    mdiInformation,
  },
  props: {
    visible: {
      required: true,
      type: Boolean,
    },
    expId: {
      type: Number,
      default: null,
    },
  },
  emits: ['close-dialog'],
  setup(props, { emit }) {
    const store = useStore()
    const expType = computed(() => store.state.experiences.activeTab)

    const schema = computed(() => formSchema[expType.value])

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
          inputData.value = generateEmptyExp(expType.value)

        // edit exp
        } else {
          const fromStore = store.getters['experiences/experienceByTypeAndId'](expType.value, props.expId)
          inputData.value = fromStore === undefined ? generateEmptyExp(expType.value) : { ...fromStore }
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
        type: expType.value,
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
        group: 'close-dialog',
        message: '離開則無法儲存資料喔！',
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
    const rules = computed(() => generateExpValidationRules(expType.value))
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

#exp-edit-dialog {
  width: 100%;
  max-width: 770px;
  max-height: 80vh;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;

  label {
    @include grid(column, 0, 10px);
    justify-content: flex-start;
    color: $blue-6;
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

.exp-edit-dialog {
  &__remarks {
    border-radius: 8px !important;

    .p-overlaypanel-content {
      .title {
        color: $blue-6;
        font-weight: 500;
      }
      p {
        margin-top: 5px;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
