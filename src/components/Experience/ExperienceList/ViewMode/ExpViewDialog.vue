<template>
  <Dialog
    id='exp-view-dialog'
    v-model:visible='showDialog'
    :dismissableMask='true'
    :modal='true'
    :draggable='false'
  >
    <div v-for='item in schema' :key='item.inputKey'>
      <div v-if='typeof item.inputKey !== "string" || !isEmpty(experience[item.inputKey])' class='field'>
        <label :class='{ "required": item.required }'>
          {{ item.label }}
        </label>

        <div v-if='typeof item.inputKey !== "string" && JSON.stringify(item.inputKey) === JSON.stringify(["dateStart", "dateEnd"])'>
          {{ getDisplayDate(experience.dateStart, experience.dateEnd) }}
        </div>

        <div v-else-if='item.inputKey === "categories" || item.inputKey === "tags"' class='field__tags'>
          <Chip
            v-for='listItem in experience[item.inputKey]'
            :key='listItem?.id === undefined ? listItem : listItem.id'
            :label='listItem?.name === undefined ? listItem : listItem.name'
          />
        </div>

        <ul v-else-if='item.inputKey === "link"' class='field__links'>
          <li v-for='link in experience.link.split(",")' :key='link'>
            <a class='field-value' :href='link.trim()' target='_blank'>
              {{ link.trim() }}
            </a>
          </li>
        </ul>

        <p v-else class='field__value'>
          {{ experience[item.inputKey] }}
        </p>
      </div>
    </div>
  </Dialog>
</template>

<script>
import { computed } from 'vue'
import { isEmpty } from 'lodash-es'
import Chip from 'primevue/chip'
import Dialog from 'primevue/dialog'

import * as formSchema from '@/components/Experience/ExperienceEdit/experienceSchema'

export default {
  name: 'ExpViewDialog',
  components: {
    Dialog,
    Chip
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    expType: {
      type: String,
      required: true,
      validator(value) {
        return ['course', 'activity', 'competition', 'work', 'certificate', 'other'].includes(value)
      }
    },
    experience: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  emits: ['close-view-dialog'],
  setup(props, { emit }) {
    const schema = computed(() => formSchema[props.expType])
    const showDialog = computed({
      get: () => props.visible,
      set: () => emit('close-view-dialog')
    })

    const getDisplayDate = (start, end) => {
      start = start.substring(0, start.indexOf('T'))
      end = end?.substring(0, end?.indexOf('T'))

      return end === undefined ? start : `${start} ~ ${end}`
    }

    return {
      showDialog,
      isEmpty,
      schema,
      getDisplayDate
    }
  }
}
</script>

<style lang='scss'>
@import '~@/scss/_variables';
@import '~@/scss/_mixins';

#exp-view-dialog {
  width: 100%;
  max-width: 600px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;

  .p-dialog-header {
    justify-content: flex-end;
    padding: 0;
  }

  .field {
    margin-bottom: 28px;

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
    }

    &__value {
      line-break: anywhere;
    }

    &__tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    &__links {
      display: flex;
      flex-direction: column;
      gap: 5px;

      a {
        color: $blue-6;
      }
    }
  }
}
</style>
