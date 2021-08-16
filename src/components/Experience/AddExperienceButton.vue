<template>
  <Menu as="div" class="add-experience-button">
    <MenuButton class="add-experience-button__btn">
      新增經驗
      <ChevronDownIcon />
    </MenuButton>
    <MenuItems as="ul">
      <MenuItem v-slot="{ active }">
        <li :class="{ active }" @click="$emit('add-experience')">
          新增校外或其他經驗
        </li>
      </MenuItem>
      <MenuItem v-if="type === 'course' || type === 'activity'" v-slot="{ active }">
        <li :class="{ active }" @click="$emit('import-ncku-data')">
          匯入校內原有資料
        </li>
      </MenuItem>
    </MenuItems>
  </Menu>
</template>

<script>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/solid'

export default {
  name: 'AddExperienceButton',
  components: {
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
    ChevronDownIcon
  },
  props: {
    type: {
      type: String,
      required: true
    }
  },
  emits: ['import-ncku-data', 'add-experience']
}
</script>

<style lang="scss" scoped>
@import '~@/scss/variables';

.add-experience-button {
  position: relative;
  &__btn {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 8px 16px;
    background-color: $red;
    border-radius: 4px;
    border: none;
    color: $white;
    line-height: 26px;
    box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.05);
  }
  svg {
    width: 24px;
    height: 24px;
  }
}

ul {
  position: absolute;
  border: 1px solid $gray-6;
  margin-top: 4px;
  padding: 4px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: max-content;
  border-radius: 4px;
}
li {
  display: inline-block;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  &.active {
    background-color: $gray-6;
  }
}
</style>
