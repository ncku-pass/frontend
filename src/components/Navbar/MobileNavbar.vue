<template>
  <nav class='navbar'>
    <div class='navbar__brand'>
      <img class='navbar__brand__icon' src='@/assets/Logo/icon_white_withname.svg' alt='NCKU PASS' />
    </div>
    <ul class='navbar__links'>
      <li v-for='(link, idx) in navbarLinks' :key='`navbar-${idx}`'>
        <router-link v-slot='{ isActive, navigate }' :to='{ name: link.dest }' custom>
          <transition name='tab' mode='out-in'>
            <div v-if='isActive' class='navbar__tab navbar__tab--active'>
              <mdicon :name='link.icon' size='20' />
              <span class='navbar__tab__name'>{{ link.name }}</span>
            </div>
            <div v-else class='navbar__tab' @click='navigate'>
              <mdicon :name='link.icon' size='16' />
            </div>
          </transition>
        </router-link>
      </li>
      <li>
        <div class='navbar__tab' @click='handleLogout'>
          <mdicon name='locationExit' size='16' />
        </div>
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
  name: 'MobileNavbar',
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
  background-color: $red-5;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: $mobile-navbar-height;
  padding: 0 16px;
  z-index: 10;

  &__brand {
    margin: 0;

    &__icon {
      height: $mobile-navbar-height;
      width: $mobile-navbar-height;
    }
  }

  &__links {
    @include grid(column, 0, 20px);
    padding: 0;
    list-style: none;
    align-items: end;
  }

  &__tab {
    background: $white;
    border-radius: 8px 8px 0 0;
    padding: 4px 16px;
    filter: drop-shadow(4px 0px 0px $red-4);
    @include font-format($type: 'b3', $color: $red-5, $bold: true);
    letter-spacing: 0.2em;

    &--active {
      background: $white;
      padding: 8px 10px;

      .navbar__tab__name {
        margin-left: 6px;
      }
    }
  }
}

// for <transition>
.tab-enter-active {
  transition: all 0.5s ease;
}

.tab-enter-from{
  opacity: 0;
}
</style>
