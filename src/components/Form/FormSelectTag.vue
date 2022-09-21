<template>
  <div class='tag-select'>
    <Chips
      v-model='value'
      placeholder='建立一個新的tag...'
      :allowDuplicate='false'
      @remove='onUnselectTag'
      @add='onCreateTag'
      @focus='showDropdown = true'
      @blur='!isChoosing && (showDropdown = false)'
      @input='onInputTag'
    >
      <template #chip='slotProps'>
        <div>
          {{ slotProps.value.name }}
        </div>
      </template>
    </Chips>
    <div
      v-show='showDropdown'
      class='tag-select__dropdown'
      @mousedown='isChoosing = true'
      @mouseup='isChoosing = false'
    >
      <div v-for='(optionType, idx) in optionsForDisplay' :key='`opt-${idx}`'>
        <div v-if='optionType.options?.length > 0'>
          <div class='option-label'>
            {{ optionType.label }}
          </div>
          <div v-for='tag in optionType.options' :key='tag.id' class='option' @click='onSelectDropdownTag(tag)'>
            {{ tag.name }}
            <mdicon v-if='optionType.allowDelete' class='option__delete' name='trashCanOutline' size='18' @click='onDeleteTag(tag.id)' />
          </div>
        </div>
      </div>
    </div>
    <small v-if='createTagError' class='p-error'>
      {{ createTagError }}
    </small>
  </div>
</template>

<script>
import { computed, reactive, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { searchTag } from '@/api/tags'
import { debounce } from '@/helpers'
import { defaultTagNames } from '@/config'
import Chips from 'primevue/chips'

const filterUnusedTag = (options, tags) => {
  return options.filter(opt => {
    return !tags.some(tag => opt.id === tag.id)
  })
}

const filterSearchTag = (options, searchText) => {
  searchText = searchText?.replaceAll(/[^\u4e00-\u9fa5_a-zA-Z0-9\s-]+/g, '')
  return searchText === undefined ? options : options.filter(opt => opt.name.includes(searchText))
}

export default {
  name: 'FormTagSelect',
  components: { Chips },
  props: {
    initValue: {
      type: Array,
      default() {
        return []
      }
    }
  },
  emits: ['input'],
  setup(props, { emit }) {
    const store = useStore()
    const value = ref(props.initValue)

    // ===== DEFINE TAGS =====
    const tagsFromStore = computed(() => store.state.tags.tags.filter(tag => tag.id > 14))

    const fullTagsSet = reactive({
      default: defaultTagNames,
      own: tagsFromStore,
      search: []
    })

    const optionsForDisplay = computed(() => {
      return [{
        label: '我的 Tag',
        options: filterSearchTag(filterUnusedTag(fullTagsSet.own, props.initValue), newTagName.value),
        allowDelete: true,
      }, {
        label: '預設 Tag',
        options: filterSearchTag(filterUnusedTag(fullTagsSet.default, props.initValue), newTagName.value),
        allowDelete: false,
      }, {
        label: '其他人也輸入的 Tag',
        options: filterSearchTag(filterUnusedTag(fullTagsSet.search, props.initValue), newTagName.value),
        allowDelete: true,
      }]
    })

    // ===== HANDLE INPUT AND SEARCH =====
    const showDropdown = ref(false)
    const isChoosing = ref(false)
    const newTagName = ref('')
    const createTagError = ref(null)

    const onInputTag = evt => {
      newTagName.value = evt.data
    }

    watch(newTagName, (searchText) => {
      createTagError.value = null
      debouncedSearchTag(searchText)
    })

    let lastRequest = 0 // 紀錄上次送出請求的時間，如果新的請求>舊的請求，忽略舊的回覆
    const debouncedSearchTag = debounce(async searchText => {
      searchText = searchText?.replaceAll(/[^\u4e00-\u9fa5_a-zA-Z0-9\s-]+/g, '')
      lastRequest = new Date()
      const record = lastRequest
      const { data } = await searchTag(searchText)
      if (lastRequest === record) {
        fullTagsSet.search = data
        showDropdown.value = true
      }
    }, 500)

    // ===== TAGS OPERATIONS =====
    const onSelectDropdownTag = tag => {
      emitUpdateTag([...value.value, tag])
    }

    const onUnselectTag = (evt) => {
      const unSelectedId = evt.value[0].id
      emitUpdateTag(value.value.filter(tag => tag.id !== unSelectedId))
    }

    const onDeleteTag = (tagId) => {
      store.dispatch('tags/deleteTag', tagId)
    }

    const onCreateTag = async(evt) => {
      const targetTagName = evt?.value[evt.value?.length - 1]

      // checking
      if (!targetTagName) {
        return

      // 只允許中、英、數、底線 (_)、橫線(-)、空白( )
      } else if (!targetTagName.match(/^[\u4e00-\u9fa5_a-zA-Z0-9\s-]+$/)) {
        createTagError.value = '只接受中、英、數、底線 (_)、橫線(-)哦！'
        showDropdown.value = false
        value.value.pop()
        return

      } else if (props.initValue.some(tag => tag.name === targetTagName)) {
        createTagError.value = '已經有這個tag了！'
        showDropdown.value = false
        value.value.pop()
        return
      }

      const alreadyInDefaultTag = defaultTagNames.find(tag => tag.name === targetTagName)
      if (alreadyInDefaultTag) {
        emitUpdateTag([...props.initValue, alreadyInDefaultTag])
        return
      }

      const alreadyOwnedTag = tagsFromStore.value.find(tag => tag.name === targetTagName)
      if (alreadyOwnedTag) {
        emitUpdateTag([...props.initValue, alreadyOwnedTag])
        return
      }

      const newTag = await store.dispatch('tags/addTag', targetTagName)
      value.value[value.value.length - 1] = newTag
      emitUpdateTag([...props.initValue, newTag])
    }

    const emitUpdateTag = (tags) => {
      showDropdown.value = false
      newTagName.value = ''
      createTagError.value = null
      emit('input', { value: tags })
    }

    return {
      value,
      optionsForDisplay,
      showDropdown,
      isChoosing,
      newTagName,
      createTagError,
      onInputTag,
      onSelectDropdownTag,
      onUnselectTag,
      onDeleteTag,
      onCreateTag,
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/scss/variables';

.tag-select {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  position: relative;
  align-items: center;

  &__dropdown {
    position: absolute;
    top: 100%;
    background-color: $white;
    border: 1px solid $grey-2;
    width: 100%;
    border-radius: 8px;
    max-height: 200px;
    overflow: auto;
    user-select: none;

    .option-label {
      padding: 6px 12px;
      color: $grey-4;
      font-weight: 600;
      margin: 8px;
      pointer-events: none;
    }

    .option {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-weight: normal;
      cursor: pointer;
      padding: 8px 32px;
      &:hover {
        background-color: $grey-1;
      }
      &__delete:hover {
        color: $red-4;
      }
    }
  }

  :deep(.p-chips-multiple-container) {
    .p-chips-input-token {
      margin: 5px;
    }
  }
}
</style>
