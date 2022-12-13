<template>
  <div>
    <div id='quick-edit-toolbar__select-tag'>
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
      />
      <Button
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
import { ref } from 'vue'
import AutoComplete from 'primevue/autocomplete'
import useSelectTags from '@/composables/useSelectTags'

export default {
  name: 'ExpQuickEditToolbarSelectTag',
  components: {
    AutoComplete,
  },
  props: {
    disable: {
      type: Boolean,
      required: true,
    }
  },
  setup() {
    const {
      filteredTags,
      selectedTags,
      searchTagsOptions,
      createNewTag,
    } = useSelectTags()

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
      console.log('confirmTagChanges')
    }

    return {
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

#quick-edit-toolbar__select-tag {
  display: flex;
  gap: 0;
  min-width: 300px;
  max-width: 600px;

  .p-autocomplete .p-inputtext {
    border-bottom-right-radius: 0 !important;
    border-top-right-radius: 0 !important;
    border-right: none;
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
    height: 100%;
    padding: 8px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}

</style>
