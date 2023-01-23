<template>
  <nav class='navbar'>
    <h1 class='navbar__brand'>
      <a href='/' :class='["navbar__brand__link", { "router-link__disabled": isEditMode }]'>E-portfolio</a>
    </h1>
    <ul class='navbar__links'>
      <li v-for='(link, idx) in navbarLinks' :key='`navbar-${idx}`'>
        <router-link :to='{ name: link.dest }' :class='["router-link", { "router-link__disabled": isEditMode }]'>
          {{ link.name }}
        </router-link>
      </li>
      <li>
        <a class='router-link' @click='showLogoutConfirm'>
          登出
        </a>
      </li>
    </ul>
  </nav>
  <ConfirmDialog class='no-header no-icon' group='logout' />
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
import { useConfirm } from 'primevue/useconfirm'

import { navbarLinks } from '@/config'

export default {
  name: 'Navbar',
  setup() {
    const store = useStore()
    const logout = () => store.dispatch('auth/logout')
    const isEditMode = computed(() => store.state.expQuickEdit.quickEditMode)

    // === CONFIRMATION MODEL ===
    const confirm = useConfirm()
    const showLogoutConfirm = () => {
      confirm.require({
        group: 'logout',
        message: '確定要登出？',
        acceptLabel: '登出',
        rejectLabel: '取消',
        accept: () => {
          logout()
        },
      })
    }

    return { navbarLinks, isEditMode, showLogoutConfirm }
  },
}
</script>

<style lang="scss" scoped>
@import '~@/scss/_variables';
@import '~@/scss/_mixins';

.navbar {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: $navbar-height;
  padding: 2px 24px 0;
  box-shadow: 0 2px 5px #8e3438;
  background-color: #fff;
  z-index: 10;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background-color: $red-5;
  }
}

.navbar__brand {
  margin: 0;
  &__link {
    display: block;
    height: 40px;
    width: 200px;
    background-image: url('../../assets/Logo/normal_red.svg');
    background-size: 200px;
    background-repeat: no-repeat;
    text-indent: 101%;
    overflow: hidden;
  }
}

.navbar__links {
  @include grid(column, 0, 10px);
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
