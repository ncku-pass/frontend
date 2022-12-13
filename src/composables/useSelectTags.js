import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { defaultTagNames } from '@/config'
import { searchTag } from '@/api/tags'
import { debounce } from '@/helpers'
import { isEmpty } from 'lodash-es'

const trimQuery = (query) => {
  return query?.replaceAll(/[^\u4e00-\u9fa5_a-zA-Z0-9\s-]+/g, '')
}

const getTagsByOthers = async(query) => {
  query = trimQuery(query)
  if (query === undefined || query === '') return []

  const { data } = await searchTag(query)
  return data
}

const useSelectTags = () => {
  const selectedTags = ref([])
  const store = useStore()
  let latestReqTime = null

  const tagsFromStore = computed(() => store.state.tags.tags.filter(tag => tag.id > 14))
  const initTagOptions = ref([
    {
      label: '我的 Tag',
      code: 'own',
      options: tagsFromStore,
    }, {
      label: '預設 Tag',
      code: 'default',
      options: defaultTagNames,
    }, {
      label: '其他人也輸入的 Tag',
      code: 'others',
      options: []
    }
  ])
  const filteredTags = ref([...initTagOptions.value])

  const isTagUsed = (tagId) => {
    return selectedTags.value.some(tag => tag.id === tagId)
  }

  const filterEachTagGroups = (query) => {
    const needFilterQuery = !isEmpty(query)
    const newFilteredTags = []

    for (const tagGroup of initTagOptions.value) {
      const filteredOpts = tagGroup.options.filter(opt => {
        if (needFilterQuery) {
          return opt.name.includes(query) && !isTagUsed(opt.id)
        } else {
          return !isTagUsed(opt.id)
        }
      })
      if (filteredOpts?.length > 0) newFilteredTags.push({ ...tagGroup, ...{ options: filteredOpts } })
    }
    filteredTags.value = newFilteredTags
  }

  const debouncedByTagsByOthers = debounce(async(query) => {
    latestReqTime = new Date()
    const thisReqTime = latestReqTime

    const data = await getTagsByOthers(query)
    if (latestReqTime === thisReqTime) {
      (initTagOptions.value.find(group => group.code === 'others')).options = data
    }
  }, 500)

  const searchTagsOptions = (event) => {
    const query = trimQuery(event.query)

    filterEachTagGroups(query)
    debouncedByTagsByOthers(query)
  }

  const createNewTag = async(value) => {
    value = value.trim()
    if (!value) return
    if (!value.match(/^[\u4e00-\u9fa5_a-zA-Z0-9\s-]+$/)) {
      throw new Error('只接受中、英、數、底線 (_)、橫線(-)哦！')
    }
    if (selectedTags.value.some(tag => tag.name === value)) {
      throw new Error('已經有這個 tag 了！')
    }
    // same tag name exist in list, no need to create
    const existedTag = defaultTagNames.find(tag => tag.name === value) || tagsFromStore.value.find(tag => tag.name === value)
    if (existedTag) {
      selectedTags.value = [...selectedTags.value, existedTag]
      return
    }

    const newTag = await store.dispatch('tags/addTag', value)
    selectedTags.value = [...selectedTags.value, newTag]
  }

  return {
    filteredTags,
    selectedTags,
    searchTagsOptions,
    createNewTag,
  }
}

export default useSelectTags
