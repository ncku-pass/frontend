<template>
  <div class="tag-select form-control" :class="{ active: showDropdown }" @click.self="textInputRef.focus()">
    <div v-for="tag in selectedTags" :key="tag.id" class="tag">
      <span>{{ tag.name }}</span>
      <XIcon class="tag__delete" @click="handleRemoveTag(tag.id)" />
    </div>
    <div style="text-input-container">
      <input
        ref="textInputRef"
        v-model.trim="newTagName"
        class="text-input"
        type="text"
        placeholder="建立一個新的tag..."
        @keydown.enter.prevent="createTag(newTagName)"
        @focus="showDropdown = true"
        @blur="!isChoosing && (showDropdown = false)"
      />
      <transition name="menu-fade">
        <div v-if="showPopover" class="warnning-popover">
          <p class="warnning-popover__text">
            {{ showPopover }}
          </p>
        </div>
      </transition>
    </div>
    <div v-show="showDropdown" class="options" @mousedown="isChoosing = true" @mouseup="isChoosing = false">
      <div class="option-label">
        其他人也輸入的Tag
      </div>
      <div v-for="tag in filteredOptions.search" :key="tag.name" class="option" @click="handleSearchOptionClicked(tag)">
        {{ tag.name }}
        <span>{{ tag.count }}次</span>
      </div>
      <div class="option-label">
        預設Tag
      </div>
      <div v-for="tag in filteredOptions.default" :key="tag.name" class="option" @click="handleOptionClicked(tag)">
        {{ tag.name }}
      </div>
      <div class="option-label">
        我的Tag
      </div>
      <div v-for="tag in filteredOptions.own" :key="tag.id" class="option" @click="handleOptionClicked(tag)">
        {{ tag.name }}
        <XIcon class="option__delete" @click.stop="handleDeleteTag(tag.id)" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { XIcon } from '@heroicons/vue/solid'
import { searchTag } from '@/api/tags'
import { debounce } from '@/helpers'

const defaultAbilities = [
  '人文素養',
  '公民素養',
  '國際視野',
  '社會關懷',
  '語文與溝通能力',
  '思考與判斷能力',
  '專業與跨域能力',
  '創新與領導能力',
  '邏輯與分析能力',
  '勇敢落實的能力',
  '闡述與敘事能力',
  '拆解問題的能力',
  '人本關懷的能力'
].map((ability, i) => {
  return {
    id: i + 1,
    name: ability
  }
})

const filterUnusedTag = (options, tags) => {
  return options.filter(opt => {
    return !tags.some(tag => opt.id === tag.id)
  })
}

const filterSearchTag = (options, searchText) => {
  searchText = searchText.replaceAll(/[^\u4e00-\u9fa5_a-zA-Z0-9\s-]+/g, '')
  return options.filter(opt => opt.name.includes(searchText))
}

export default {
  name: 'TagSelect',
  components: {
    XIcon
  },
  props: {
    selectedTags: {
      type: Array,
      required: true
    }
  },
  emits: ['update:selectedTags'],
  setup (props, { emit }) {
    const store = useStore()

    // ===== 下拉選單 =====
    const showDropdown = ref(false)
    const isChoosing = ref(false)
    const tags = computed(() => store.state.tags.tags.filter(tag => tag.id > 14))

    const classifiedOptions = reactive({
      default: defaultAbilities,
      own: tags,
      search: []
    })

    const unusedOptions = computed(() => {
      return {
        default: filterUnusedTag(classifiedOptions.default, props.selectedTags),
        own: filterUnusedTag(classifiedOptions.own, props.selectedTags),
        search: filterUnusedTag(classifiedOptions.search, props.selectedTags)
      }
    })

    const filteredOptions = computed(() => {
      return {
        default: filterSearchTag(unusedOptions.value.default, newTagName.value),
        own: filterSearchTag(unusedOptions.value.own, newTagName.value),
        search: filterSearchTag(unusedOptions.value.search, newTagName.value)
      }
    })

    const handleOptionClicked = tag => {
      emit('update:selectedTags', [...props.selectedTags, tag])
      isChoosing.value = false
      showDropdown.value = false
      newTagName.value = ''
    }

    const handleSearchOptionClicked = tag => {
      createTag(tag.name)
      isChoosing.value = false
      showDropdown.value = false
      newTagName.value = ''
    }

    // ===== 輸入 =====
    const textInputRef = ref(null)
    const newTagName = ref('')
    const addTag = newTag => store.dispatch('tags/addTag', newTag)
    const showPopover = ref(false)

    const createTag = async (tagName) => {
      if (!tagName) return
      // 只允許中、英、數、底線 (_)、橫線(-)、空白( )
      if (!tagName.match(/^[\u4e00-\u9fa5_a-zA-Z0-9\s-]+$/)) {
        showPopover.value = '只接受中、英、數、底線 (_)、橫線(-)哦！'
        return
      }
      if (props.selectedTags.some(tag => tag.name === tagName)) {
        showPopover.value = '已經有這個tag了！'
        return
      }

      const alreadyInDefaultTag = defaultAbilities.find(tag => tag.name === tagName)
      if (alreadyInDefaultTag) {
        emit('update:selectedTags', [...props.selectedTags, alreadyInDefaultTag])
        newTagName.value = ''
        return
      }

      const alreadyOwnedTag = tags.value.find(tag => tag.name === tagName)
      if (alreadyOwnedTag) {
        emit('update:selectedTags', [...props.selectedTags, alreadyOwnedTag])
        newTagName.value = ''
        return
      }

      const newTag = await addTag(tagName)
      emit('update:selectedTags', [...props.selectedTags, newTag])
      newTagName.value = ''
    }

    let lastRequest = 0 // 紀錄上次送出請求的時間，如果新的請求>舊的請求，忽略舊的回覆
    const debouncedSearchTag = debounce(async searchText => {
      searchText = searchText.replaceAll(/[^\u4e00-\u9fa5_a-zA-Z0-9\s-]+/g, '')
      lastRequest = new Date()
      const reocrd = lastRequest
      const { data } = await searchTag(searchText)
      if (lastRequest === reocrd) {
        classifiedOptions.search = data
      }
    }, 500)
    watch(newTagName, (searchText) => {
      showPopover.value = false
      debouncedSearchTag(searchText)
    })

    // ===== 標籤 =====
    const handleRemoveTag = id => {
      emit(
        'update:selectedTags',
        props.selectedTags.filter(tag => tag.id !== id)
      )
    }
    const deleteTag = tagId => store.dispatch('tags/deleteTag', tagId)
    const handleDeleteTag = tagId => {
      deleteTag(tagId)
    }

    return {
      textInputRef,
      newTagName,
      showPopover,
      createTag,
      handleRemoveTag,
      handleDeleteTag,
      filteredOptions,
      showDropdown,
      isChoosing,
      handleOptionClicked,
      handleSearchOptionClicked
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/scss/variables';

.tag-select {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  padding: 4px 12px;
  position: relative;
  min-height: 46px;
  align-items: center;
}
.tag-select.active {
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
}
.tag {
  line-height: 1rem;
  display: flex;
  align-items: center;
  column-gap: 5px;
  padding: 7px 8px;
  font-size: 14px;
  font-weight: 400;
}
.tag__delete {
  cursor: pointer;
  display: grid;
  place-items: center;
  color: $red;
  width: 18px;
  height: 18px;
  padding: 2px;
  border-radius: 10px;
  font-weight: 700;
  &:hover {
    background-color: $white;
  }
}
.text-input-container {
  position: relative;
  flex-grow: 1;
}
.text-input {
  font-size: 16px;
  line-height: 22px;
  padding: 5px;
  border: none;
  outline: none;
  width: 100%;
  min-width: 30%;
}
.warnning-popover {
  position: absolute;
  top: 100%;
  background-color: $white;
  padding: 4px 12px;
  border-radius: 5px;
  filter: drop-shadow(0 1px 4px rgba(241, 90, 96, 0.15));
  z-index: 10;
  &:before {
    content: '';
    position: absolute;
    top: -12px;
    left: 5%;
    width: 0;
    height: 0;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-bottom: 12px solid $white;
  }
}
.options {
  position: absolute;
  box-sizing: content-box;
  top: 100%;
  left: -1px;
  background-color: $white;
  border: 1px solid $gray-5;
  width: 100%;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  max-height: 200px;
  overflow: auto;
}
.option {
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 6px 24px;
  font-weight: normal;
  color: $gray-2;
  &:hover {
    background-color: $gray-5;
  }
  &-label {
    padding: 6px 12px;
    color: $gray-3;
  }
  &__delete {
    display: none;
    padding: 6px;
    width: 36px;
    height: 36px;
    position: absolute;
    right: 0;
    top: 0;
    &:hover {
      background-color: $red-light;
    }
  }
  &:hover &__delete {
    display: block;
  }
}
</style>
