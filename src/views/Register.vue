<template>
  <div class="register">
    <form class="register__form" @submit.prevent="handleSubmit">
      <h2 class="register__title">
        註冊帳號
      </h2>

      <div>
        <label for="studentId" class="form-label">學號</label>
        <input
          id="studentId"
          v-model="formData.studentId"
          type="text"
          class="form-control"
        />
      </div>
      <div>
        <label for="password" class="form-label">密碼</label>
        <input
          id="password"
          v-model="formData.password"
          type="text"
          class="form-control"
        />
      </div>
      <div>
        <label for="confirmPassword" class="form-label">確認密碼</label>
        <input
          id="confirmPassword"
          v-model="formData.confirmPassword"
          type="text"
          class="form-control"
        />
      </div>
      <div>
        <label for="name" class="form-label">姓名</label>
        <input
          id="name"
          v-model="formData.name"
          type="text"
          class="form-control"
        />
      </div>
      <div>
        <label for="email" class="form-label">信箱</label>
        <input
          id="email"
          v-model="formData.email"
          type="email"
          class="form-control"
        />
      </div>
      <div>
        <label for="major" class="form-label">系所</label>
        <select
          id="major"
          v-model="major"
          class="form-control"
        >
          <option value="請選擇">
            請選擇
          </option>
        </select>
      </div>
      <div class="btns">
        <div class="btn">
          取消
        </div>
        <div class="btn--red">
          送出
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive } from 'vue'

export default {
  name: 'Register',
  setup () {
    const formData = reactive({
      name: '',
      email: '',
      studentId: '',
      password: '',
      confirmPassword: '',
      major: ''
    })

    return { formData }
  }
}
</script>

<style lang="scss" scoped>
.register {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  &__title {
    font-weight: normal;
  }
  &__form {
    width: 600px;
    max-width: 600px;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    display: grid;
    row-gap: 15px;
    box-shadow: -2px 4px 25px rgba(241, 90, 96, 0.05),
      2px -4px 20px rgba(241, 90, 96, 0.1);
  }
}
.btns {
  display: flex;
  justify-content: flex-end;
  column-gap: 10px;
}
</style>
