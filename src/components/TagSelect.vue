<template>
  <div
    class="tag-select form-control"
    :class="{ active: showDropdown }"
    @click.self="textInput.focus()"
  >
    <div
      v-for="tag in tags"
      :key="tag.id"
      class="tag"
    >
      <span>{{ tag.name }}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="tag__delete"
        @click="deleteTag(tag.id)"
      >
        <path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
    <input
      ref="textInput"
      v-model.trim="newTagName"
      class="text-input"
      type="text"
      @keydown.enter="createTag"
      @focus="showDropdown = true"
      @blur="!isChoosing && (showDropdown = false)"
    />
    <div
      v-show="showDropdown && filteredOptions.length"
      class="options"
      @mousedown="isChoosing = true"
      @mouseup="isChoosing = false"
    >
      <div
        v-for="tag in filteredOptions"
        :key="tag.id"
        class="option"
        @click="handleOptionClicked(tag)"
      >
        {{ tag.name }}
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { addTag } from '@/api/tags'

export default {
  name: 'TagSelect',
  props: {
    options: {
      type: Array,
      required: true
    },
    tags: {
      type: Array,
      required: true
    }
  },
  emits: ['update:tags'],
  setup (props, { emit }) {
    // ===== 下拉選單 =====
    const showDropdown = ref(false)
    const isChoosing = ref(false)

    const unusedOptions = computed(() => {
      return props.options.filter(tag => {
        return props.tags.every(({ id }) => {
          return tag.id !== id
        })
      })
    })
    const filteredOptions = computed(() => {
      return unusedOptions.value.filter(opt => {
        return opt.name.includes(newTagName.value)
      })
    })
    const handleOptionClicked = tag => {
      emit('update:tags', [...props.tags, tag])
      isChoosing.value = false
      showDropdown.value = false
      newTagName.value = ''
    }

    // ===== 輸入 =====
    const textInput = ref(null) // dom
    const newTagName = ref('')
    const createTag = async () => {
      if (!newTagName.value) return
      const { data } = await addTag(newTagName.value)
      console.log(data)
      emit('update:tags', [...props.tags, data[0]])
      newTagName.value = ''
    }

    // ===== 標籤 =====
    const deleteTag = id => {
      emit(
        'update:tags',
        props.tags.filter(tag => tag.id !== id)
      )
    }

    return {
      textInput,
      newTagName,
      createTag,
      deleteTag,
      filteredOptions,
      showDropdown,
      isChoosing,
      handleOptionClicked
    }
  }
}
</script>

<style scoped lang="scss">
@import '../scss/variables';

.tag-select {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  padding: 4px 12px;
  position: relative;
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
    background-color: #fff;
  }
}
.text-input {
  font-size: 16px;
  line-height: 22px;
  padding: 5px;
  border: none;
  outline: none;
  flex: 1;
  min-width: 30%;
}
.options {
  position: absolute;
  box-sizing: content-box;
  top: 100%;
  left: -1px;
  background-color: white;
  border: 1px solid $gray-5;
  width: 100%;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  max-height: 200px;
  overflow: auto;
}
.option {
  padding: 6px 12px;
  font-weight: normal;
  &:hover {
    background-color: $gray-5;
  }
}
</style>
