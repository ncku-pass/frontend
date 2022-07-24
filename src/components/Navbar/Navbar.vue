<template>
  <nav class='navbar'>
    <h1 class='navbar__brand'>
      <a href='/' class='navbar__brand__link'>E-portfolio</a>
    </h1>
    <ul class='navbar__links'>
      <li v-for='(link, idx) in navbarLinks' :key='`navbar-${idx}`'>
        <router-link class='navbar__links__link tab-link' :to='{ name: link.dest }'>
          {{ link.name }}
        </router-link>
      </li>
      <li>
        <a class='navbar__links__link tab-link' @click='handleLogout'>
          登出
        </a>
      </li>
    </ul>
    <ConfirmModal
      v-if='showConfirmModal'
      message='確定要登出？'
      confirmMessage='登出'
      confirmType='customize'
      @confirm='logout'
      @cancel='showConfirmModal = false'
    />
  </nav>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import ConfirmModal from '@/components/ConfirmModal.vue'
import { navbarLinks } from '@/config'

export default {
  name: 'Navbar',
  components: {
    ConfirmModal
  },
  setup() {
    const store = useStore()
    const logout = () => store.dispatch('auth/logout')

    const showConfirmModal = ref(false)
    const handleLogout = () => {
      showConfirmModal.value = true
    }
    return { navbarLinks, showConfirmModal, logout, handleLogout }
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
    background-color: $red;
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
