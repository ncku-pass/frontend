<template>
  <form class="login-form" @submit.prevent="handleSubmit">
    <h2 class="login-form__title">
      登入E-portfolio
    </h2>
    <div>
      <label for="studentId" class="form-label">帳號</label>
      <input
        id="studentId"
        v-model="authData.studentId"
        type="text"
        class="form-control"
        required
        pattern="[a-zA-Z0-9]{8,}"
        title="請輸入8位以上英數字"
      >
    </div>
    <div>
      <label for="password" class="form-label">密碼</label>
      <input
        id="password"
        v-model="authData.password"
        type="password"
        class="form-control"
        required
        pattern="[a-zA-Z0-9]{8,}"
        title="請輸入8位以上英數字"
      >
    </div>
    <p v-if="error">
      登入失敗，請重新嘗試
    </p>
    <button
      class="btn"
      :disabled="isPending"
      type="submit"
    >
      {{ isPending ? '登入中' : '登入' }}
    </button>
    <a class="register">還沒註冊嗎，點我立即註冊</a>
  </form>
</template>

<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
// import { login } from '@/api/auth'
import useAuth from '@/composables/useAuth'

export default {
  setup () {
    const authData = reactive({
      studentId: '',
      password: ''
    })
    const { login, tokenStr, error, isPending } = useAuth()

    const router = useRouter()

    const handleSubmit = async () => {
      if (isPending.value) {
        return
      }
      await login(authData)
      if (!error.value) {
        router.push({ name: 'Experience' })
        console.log('登入成功', tokenStr.value)
      }
    }

    return { authData, handleSubmit, error, isPending }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/scss/mixins";
.login-form {
  @include grid(row, 20px, 0);
  width: 350px;
  &__title {
    margin: 0;
    font-size: 26px;
  }
  label {
    color: #fff;
  }
  .btn, .register {
    justify-self: flex-end;
  }
  .register {
    color: #fff;
    text-decoration-line: underline;
  }
}

@media (max-width: 1023px) {
  .login-form {
    width: 250px;
  }
}
@media (max-width: 767px) {
  .login-form {
    margin-top: 60px;
    width: 350px;
  }
}
</style>
