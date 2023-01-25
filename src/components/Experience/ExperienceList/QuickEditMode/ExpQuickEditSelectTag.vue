<template>
  <div>
    <div
      :ref='(el) => { expId === singleEditExpId ? selectTagRef = el : null}'
      class='quick-edit__select-tag'
    >
      <AutoComplete
        v-model='selectedTags'
        :multiple='true'
        :disabled='disable'
        placeholder='在此新增 tag'
        :suggestions='filteredTags'
        :completeOnFocus='true'
        optionGroupLabel='label'
        optionGroupChildren='options'
        optionLabel='name'
        loadingIcon='pi pi-spinner'
        @complete='searchTagsOptions($event)'
        @keyup.enter.stop='onEnter($event)'
        @before-show='isSelecting = true'
        @hide='isSelecting = false'
      />
      <Button
        v-if='needConfirm'
        class='p-button-secondary p-button-sm'
        :disabled='disable || selectedTags.length <= 0'
        @click='confirmTagChanges'
      >
        <mdicon name='check' size='20' />
      </Button>
    </div>
    <small v-if='error' class='p-error'>
      {{ error }}
    </small>
  </div>
</template>

<script>
import { ref, watch, computed } from 'vue'
import AutoComplete from 'primevue/autocomplete'
import { useStore } from 'vuex'
import { onClickOutside } from '@vueuse/core'

import useSelectTags from '@/composables/useSelectTags'

export default {
  name: 'ExpQuickEditSelectTag',
  components: {
    AutoComplete,
  },
  props: {
    disable: {
      type: Boolean,
      required: true,
    },
    initValue: {
      type: Array,
      required: false,
      default() {
        return []
      }
    },
    needConfirm: {
      type: Boolean,
      required: false,
      default: true,
    },
    expId: {
      type: Number,
      required: false,
      default: undefined
    }
  },
  setup(props) {
    const {
      filteredTags,
      selectedTags,
      searchTagsOptions,
      createNewTag,
      clearTagSelects,
    } = useSelectTags()
    const store = useStore()

    watch(props.initValue, (newTags) => {
      if (props.initValue !== []) {
        selectedTags.value = newTags
      }
    }, { immediate: true })

    watch(selectedTags, (newTags) => {
      if (!props.needConfirm) {
        store.dispatch('expQuickEdit/APPEND_TAG_CHANGES', { newTags, includeAllTags: true })
      }
    })

    const error = ref(null)

    const onEnter = async(evt) => {
      try {
        await createNewTag(evt.target.value)
        // clear input
        evt.target.value = ''

      } catch (err) {
        error.value = err.message
        setTimeout(() => { error.value = null }, 5000)
      }
    }

    const confirmTagChanges = () => {
      store.dispatch('expQuickEdit/APPEND_TAG_CHANGES', { newTags: selectedTags.value, includeAllTags: false })
      clearTagSelects()
    }

    // ===== HANDLE CLICK OUTSIDE SINGLE EDIT TAG =====
    const selectTagRef = ref()
    const isSelecting = ref(false)
    const singleEditExpId = computed(() => store.state.expQuickEdit.singleEditExpId)
    onClickOutside(selectTagRef, () => {
      if (!isSelecting.value) {
        store.commit('expQuickEdit/SET_SINGLE_EDIT_EXP_ID', null)
      }
    })

    return {
      selectTagRef,
      singleEditExpId,
      isSelecting,
      selectedTags,
      filteredTags,
      searchTagsOptions,
      onEnter,
      confirmTagChanges,
      error,
    }
  },
}
</script>

<style lang='scss'>
@import '~@/scss/_mixins';
@import '~@/scss/_variables';

.quick-edit__select-tag {
  display: flex;
  gap: 0;
  min-width: 500px;
  max-width: 500px;

  &:has(> .p-button) > .p-autocomplete .p-inputtext {
    border-bottom-right-radius: 0 !important;
    border-top-right-radius: 0 !important;
    border-right: none;
  }

  .p-autocomplete .p-inputtext {
    align-content: center;
    gap: 8px 20px;

    .p-autocomplete-token {
      background-color: $red-1;
      color: $red-5;
      font-size: 11px;
      position: relative;

      .p-autocomplete-token-label {
        user-select: none;
      }
      .p-autocomplete-token-icon {
        font-size: 12px;
      }

      &:not(:first-child):before {
        content: "|";
        position: absolute;
        left: -11px;
        color: $grey-2;
        font-size: 20px;
        font-weight: 100;
      }
    }

    .p-autocomplete-input-token input {
      font-size: 13px;
      height: 16px;
    }
  }

  .p-button-sm {
    padding: 8px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}

</style>
