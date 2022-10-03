<template>
  <Dialog
    id='add-exp-dialog'
    v-model:visible='showDialog'
    header='新增經驗'
    :dismissableMask='true'
    :modal='true'
    :draggable='false'
  >
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
        :data='typeof item.inputKey === "string" ? inputData[item.inputKey] : inputData'
        :validate-state='v$[item.inputKey]'
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
        :disabled='v$.$invalid'
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
import { generateEmptyExp, generateExpValidationRules } from '@/helpers/experiences.helper';
import useVuelidate from '@vuelidate/core';

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
    const showDialog = computed({
      get: () => props.visible,
      set: (val) => {
        // should only set to false, for dialog-controlled cancel close
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
    const schema = computed(() => formSchema[props.expType])

    const closeDialog = (needRefresh) => {
      isFormDirty.value = false
      emit('close-dialog', needRefresh)
    }

    // === INT EXP DATA ===
    const store = useStore()
    const targetExp = computed({
      get: () => {
        if (!props.expId) {
          return generateEmptyExp(props.expType)
        }
        const fromStore = store.getters['experiences/experienceByTypeAndId'](props.expType, props.expId)
        return fromStore === undefined ? generateEmptyExp(props.expType) : fromStore
      },
      set: () => {}
    })
    const inputData = ref({})
    watch(targetExp, (val) => {
      if (val !== undefined) {
        inputData.value = { ...val }
      }
    })

    // === HANDLE DATA CHANGE ===
    const isFormDirty = ref(false)
    const updateData = ({ key, value }) => {
      isFormDirty.value = true
      inputData.value[key] = value
    }

    // === HANDLE SUBMIT ===
    const toast = useToast()
    const isSubmitLoading = ref(false)

    const onSubmitExp = async() => {
      if (v$.value.$invalid) {
        return
      }
      isSubmitLoading.value = true

      const payload = {
        ...inputData.value,
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
        overlayPanelRefs.value[idx].toggle(evt)
      }, 5000)
    }

    // FORM VALIDATION
    const rules = generateExpValidationRules(props.expType)
    const v$ = useVuelidate(rules, inputData)

    return {
      showDialog,
      schema,
      inputData,
      isSubmitLoading,
      onSubmitExp,
      updateData,
      overlayPanelRefs,
      toggleRemarkPanel,
      v$,
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
