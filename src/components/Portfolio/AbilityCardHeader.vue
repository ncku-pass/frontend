<template>
  <div class='ability-card-header'>
    <mdicon
      name='dotsVertical'
      class='ability-card-header__btn-drag'
      aria-haspopup='true'
      aria-conteols='ability-card-header-menu'
      @click='toggleMenu'
    />
    <Menu id='ability-card-header-menu' ref='headerMenuRef' :model='headerMenuItems' :popup='true'>
      <template #item='{item}'>
        <div class='p-menuitem-content' @click='item.command'>
          <a class='p-menuitem-link'>
            <mdicon class='p-menuitem-icon' :name='item.icon' />
            <span class='p-menuitem-text'>{{ item.label }}</span>
          </a>
        </div>
      </template>
    </Menu>

    <InputText
      v-model='topicValue'
      type='text'
      class='input-topic'
      placeholder='為這些經歷訂定一個主題吧'
      @input='$emit("update-topic", $event.target.value)'
    />
  </div>
</template>

<script>
import { ref } from 'vue'
import InputText from 'primevue/inputtext'
import Menu from 'primevue/menu'

export default {
  name: 'AbilityCardHeader',
  components: {
    InputText,
    Menu,
  },
  props: {
    topic: {
      type: String,
      default: ''
    }
  },
  emits: ['delete-ability', 'update-topic', 'duplicate-ability', 'copy-ability-text'],
  setup(props, { emit }) {
    const topicValue = ref(props.topic)

    // === HEADER MENU ===
    const headerMenuRef = ref()
    const toggleMenu = (event) => {
      headerMenuRef.value.toggle(event)
    }
    const headerMenuItems = ref([
      {
        label: '複製區塊內文字',
        icon: 'clipboardTextMultipleOutline',
        command: () => {
          emit('copy-ability-text')
          headerMenuRef.value.hide()
        }
      },
      {
        label: '複製區塊',
        icon: 'contentCopy',
        command: () => {
          emit('duplicate-ability')
          headerMenuRef.value.hide()
        },
      },
      {
        label: '刪除區塊',
        icon: 'trashCanOutline',
        command: () => {
          emit('delete-ability')
        },
      },
    ])

    return {
      topicValue,
      headerMenuRef,
      headerMenuItems,
      toggleMenu,
    }
  }
}
</script>

<style lang='scss' scoped>
@import '~@/scss/variables';

.ability-card-header {
  display: flex;
  align-items: center;
  padding-bottom: 12px;
  border-bottom: 1px solid #E0E0E0;

  &__btn-drag {
    cursor: grab;
    color: $grey-3;

    &:hover {
      color: $grey-4;
    }
  }

  #ability-card-header-menu {
  }

  .input-topic {
    background-color: transparent;
    border: none;
    font-size: 20px;
    margin-right: 24px;
    &:focus {
      box-shadow: 0 0 0 0.1rem $grey-4 !important;
    }
  }
}
</style>
