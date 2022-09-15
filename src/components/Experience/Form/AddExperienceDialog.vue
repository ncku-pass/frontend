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
        :data='expData[item.key]'
        @input='updateData($event)'
      />
    </div>
  </Dialog>
</template>

<script>
import Dialog from 'primevue/dialog'
import OverlayPanel from 'primevue/overlaypanel'
import { computed, onBeforeUpdate, ref } from 'vue'
import { mdiInformation } from '@mdi/js'

import * as formSchema from './experienceSchema'
import DynamicFormRenderer from '@/components/Form/DynamicFormRenderer'

export default {
  name: 'AddExperienceDialog',
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
    expType: {
      type: String,
      default: 'activity',
      validator(value) {
        return ['course', 'activity', 'competition', 'work', 'certificate', 'other'].includes(value)
      }
    },
    expData: {
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
      set: (val) => { context.emit('update:visible', val) }
    })

    const schema = computed(() => formSchema[props.expType])

    const updateData = ({ key, value }) => {
      console.log(key)
      console.log(value)
    }

    // === Remarks Panel ===
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
