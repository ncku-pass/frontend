<template>
  <form class='login-form' @submit.prevent='handleSubmit'>
    <h2 class='login-form__title'>
      登入E-portfolio
    </h2>
    <div class='input-group'>
      <label for='studentId'>帳號</label>
      <InputText
        id='studentId'
        v-model='authData.studentId'
        aria-label='帳號'
        type='text'
      />
    </div>
    <div class='input-group'>
      <label for='password'>密碼</label>
      <Password
        id='password'
        v-model='authData.password'
        aria-label='密碼'
        required
        toggleMask
        :feedback='false'
      />
    </div>
    <p v-if='error'>
      登入失敗，請重新嘗試
    </p>
    <Button :loading='isPending' type='submit' label='登入' />
  </form>
</template>

<script>
import { reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'

export default {
  name: 'LoginForm',
  components: {
    InputText,
    Password
  },
  setup() {
    const store = useStore()

    const authData = reactive({
      studentId: '',
      password: ''
    })
    const error = computed(() => store.state.auth.error)
    const isPending = computed(() => store.state.auth.isPending)
    const login = authData => store.dispatch('auth/login', authData)

    const router = useRouter()

    const handleSubmit = async() => {
      if (isPending.value) {
        return
      }
      await login(authData)
      if (!error.value) {
        router.push({ name: 'Experience' })
      }
    }

    return { authData, handleSubmit, error, isPending }
  }
}
</script>

<style lang='scss' scoped>
@import '~@/scss/mixins';
@import '~@/scss/variables';

.login-form {
  width: 350px;
  padding: 50px;

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 16px 0 16px 0;
  }
}
</style>
