<template>
  <ul class='experience__navbar' :class='`experience__navbar--${device}`'>
    <li v-for='link in experienceNavbarLinks' :key='`exp-navbar-${link.type}`'>
      <router-link
        class='tab-link'
        :class='[`tab-link--${device}`, { "router-link-active": link.dest === activeTab }]'
        :to='{ name: "Experience", params: { activeTab: link.dest } }'
      >
        {{ link.name }}
      </router-link>
    </li>
  </ul>
</template>

<script>
import { experienceNavbarLinks } from '@/config'
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'ExperienceNavbar',
  inject: ['mq'],
  setup() {
    const store = useStore()
    const activeTab = computed(() => store.state.experiences.activeTab)

    return { activeTab, experienceNavbarLinks }
  },
  computed: {
    device() {
      return this.mq.current
    },
  },
}
</script>

<style lang='scss' scoped>
@import '~@/scss/_variables';
@import '~@/scss/_mixins';

.experience__navbar {
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
  min-height: 50px;
  list-style: none;
  box-shadow: 0 4px 15px rgba(241, 90, 96, 0.06);
  overflow-x: auto;

  &--mobile {
    box-shadow: 0 1px 4px rgba(241, 90, 96, 0.1);
    min-height: 42px;
    max-height: 42px;
  }

  .tab-link {
    font-weight: $weight-regular;

    &--mobile {
      @include font-format('b3');
      padding: 4px 16px 8px 16px;

      &.is-active {
        color: $grey-6;
        box-shadow: 0px -2px 0px $red-5 inset;
      }
    }
  }
}
</style>
