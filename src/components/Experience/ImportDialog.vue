<template>
  <Dialog
    id='import-exp-dialog'
    v-model:visible='showDialog'
    header='加入你想要呈現的經驗'
    :dismissableMask='true'
    :modal='true'
    :draggable='false'
  >
    <div v-if='fetchNckuExpError' class='login-error'>
      成功入口時效過期，請重新登入
      <a href='https://i.ncku.edu.tw/ncku/oauth/eportfolio/login.php' class='ncku-login'>
        使用<img src='@/assets/ncku_login.png' alt='ncku login' />登入
      </a>
    </div>

    <div v-else-if='isEmpty(nckuExps)'>
      <Loader />
    </div>

    <div v-else class='exp-container'>
      <Accordion
        :multiple='true'
        :activeIndex='[...Array(Object.keys(nckuExps).length).keys()]'
      >
        <AccordionTab
          v-for='(exps, semester) in nckuExps'
          :key='semester'
          :header='semester.replace("-1", "上學期").replace("-2", "下學期")'
        >
          <div v-for='(exp, idx) in exps' :key='exp.name'>
            <Checkbox
              v-model='nckuExpSelects[semester][idx]'
              :inputId='`${semester}-${idx}`'
              :binary='true'
            />
            <!--suppress XmlInvalidId -->
            <label :for='`${semester}-${idx}`'> 【{{ expTypesInZh[exp.type] }}】{{ exp.name }} </label>
          </div>
        </AccordionTab>
      </Accordion>
    </div>

    <template v-if='!isEmpty(nckuExps)' #footer>
      <Button
        label='全選'
        :disabled='isEmpty(nckuExps)'
        @click='selectAllExps'
      />
      <div>
        <Button
          label='取消'
          :disabled='importLoading'
          class='p-button-secondary p-button-outlined'
          @click='showDialog = false'
        />
        <Button
          label='儲存'
          :loading='importLoading'
          :disabled='!isSelected'
          @click='importNckuExps'
        />
      </div>
    </template>
  </Dialog>
</template>

<script>
import { ref, computed, reactive, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { isEmpty } from 'lodash-es'
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import Checkbox from 'primevue/checkbox'
import Dialog from 'primevue/dialog'

import Loader from '@/components/Loader'
import { expTypesInZh } from '@/config'
import { useToast } from 'primevue/usetoast'

export default {
  name: 'ImportDialog',
  components: {
    Accordion,
    AccordionTab,
    Checkbox,
    Dialog,
    Loader,
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    type: {
      type: String,
      default: 'course',
      validator(value) {
        return ['course', 'activity'].includes(value)
      }
    }
  },
  emits: ['close-import-dialog'],
  setup(props, { emit }) {
    const showDialog = computed({
      get: () => props.visible,
      set: () => emit('close-import-dialog')
    })
    const store = useStore()

    // ===== FETCH FROM NCKU =====
    onMounted(() => {
      if (!nckuExps.value) {
        fetchNckuExp()
      }
      Object.assign(nckuExpSelects, generateEmptySelect(false))
    })
    const nckuExps = computed(() => store.getters['experiences/NCKU_EXP_BY_TYPE_SEM']?.[props.type])
    const fetchNckuExpError = ref(null)
    const fetchNckuExp = async() => {
      try {
        fetchNckuExpError.value = null
        await store.dispatch('experiences/FETCH_NCKU_DATA')
      } catch (error) {
        fetchNckuExpError.value = error.message
      }
    }

    // ===== CHECKBOXES =====
    const generateEmptySelect = (selected) => {
      if (isEmpty(nckuExps?.value)) return {}
      const select = {}
      for (const [sem, exps] of Object.entries(nckuExps.value)) select[sem] = new Array(exps.length).fill(selected)
      return select
    }
    const nckuExpSelects = reactive({})
    const selectedAll = ref(false)
    const isSelected = computed(() => {
      return Object.values(nckuExpSelects).some(expSelect => expSelect.some(value => value))
    })
    const selectAllExps = () => {
      Object.assign(nckuExpSelects, generateEmptySelect(!selectedAll.value))
      selectedAll.value = !selectedAll.value
    }
    watch(nckuExps, () => {
      Object.assign(nckuExpSelects, generateEmptySelect(false))
    })

    // ===== IMPORT EXP ======
    const toast = useToast()
    const importErr = computed(() => store.state.experiences.error)
    const importLoading = computed(() => store.state.experiences.isPending)
    const importNckuExps = async() => {
      if (!isSelected.value) return

      const expsToImport = []
      for (const sem in nckuExpSelects) {
        for (let i = 0; i < nckuExpSelects[sem].length; i++) {
          if (nckuExpSelects[sem][i]) {
            expsToImport.push(nckuExps.value[sem][i])
          }
        }
      }
      await store.dispatch('experiences/IMPORT_NCKU_EXP', expsToImport)

      if (!importErr.value) {
        showDialog.value = false
      } else {
        toast.add({ severity: 'error', summary: '匯入失敗 :(', detail: '無法匯入經歷，請稍後再次嘗試', life: 10000 })
      }
    }

    return {
      showDialog,
      expTypesInZh,
      nckuExps,
      fetchNckuExpError,
      nckuExpSelects,
      isSelected,
      importNckuExps,
      importErr,
      importLoading,
      selectAllExps,
      isEmpty
    }
  }
}
</script>

<style lang='scss'>
@import '~@/scss/variables';
@import '~@/scss/mixins';

#import-exp-dialog {
  max-height: 90vh;
  padding: 0;

  .p-dialog-content {
    min-height: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .p-accordion-content {
      display: grid;
      gap: 10px 0;
    }
  }

  .p-dialog-footer {
    display: flex;
    justify-content: space-between;
  }

  .login-error {
    gap: 20px;
    align-items: center;
    display: flex;
    flex-direction: column;
  }

  .exp-container {
    overflow: auto;
    width: 100%;
    @include grid(row, 25px, 0);
    align-content: flex-start;
  }
}
</style>
