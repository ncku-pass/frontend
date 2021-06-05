<template>
  <div class="register">
    <Form
      class="register__form"
      :validation-schema="currentSchema"
      autocomplete="off"
      @submit="nextStep"
    >
      <h2 class="register__title">
        {{ currentStep === 0 ? '註冊帳號' : '個人資料' }}
      </h2>

      <template v-if="currentStep === 0">
        <div class="form-input-group">
          <label for="studentId" class="form-label">學號</label>
          <Field
            id="studentId"
            v-model="formData.studentId"
            name="studentId"
            class="form-control"
          />
          <ErrorMessage name="studentId" />
        </div>
        <div class="form-input-group">
          <label for="password" class="form-label">密碼</label>
          <Field
            id="password"
            v-model="formData.password"
            name="password"
            class="form-control"
          />
          <ErrorMessage name="password" />
        </div>
        <div class="form-input-group">
          <label for="confirmPassword" class="form-label">確認密碼</label>
          <Field
            id="confirmPassword"
            v-model="formData.confirmPassword"
            name="confirmPassword"
            class="form-control"
          />
          <ErrorMessage name="confirmPassword" />
        </div>
      </template>

      <template v-if="currentStep === 1">
        <div class="form-input-group">
          <label for="name" class="form-label">姓名</label>
          <Field
            id="name"
            v-model="formData.name"
            name="name"
            class="form-control"
          />
          <ErrorMessage name="name" />
        </div>
        <div class="form-input-group">
          <label for="email" class="form-label">信箱</label>
          <Field
            id="email"
            v-model="formData.email"
            name="email"
            type="email"
            class="form-control"
          />
          <ErrorMessage name="email" />
        </div>
        <div class="form-input-group">
          <label for="major" class="form-label">系所</label>
          <Field
            id="major"
            v-model="formData.major"
            name="major"
            as="select"
            class="form-control"
          >
            <option value="" disabled>
              請選擇
            </option>
            <option
              v-for="dep in departments"
              :key="dep"
              :value="dep"
            >
              {{ dep }}
            </option>
          </Field>
          <ErrorMessage name="major" />
        </div>
        <div class="form-input-group">
          <label for="graduationYear" class="form-label">系級</label>
          <Field
            id="graduationYear"
            v-model="formData.graduationYear"
            name="graduationYear"
            as="select"
            class="form-control"
          >
            <option value="" disabled>
              請選擇
            </option>
            <option
              v-for="year in yearOptions"
              :key="year"
              :value="year"
            >
              {{ year }}
            </option>
          </Field>
          <ErrorMessage name="graduationYear" />
        </div>
      </template>

      <p v-if="registerError">
        <!-- TODO: 等待後端修正錯誤格式 -->
        {{ registerError.data.errorMessage }}
      </p>

      <div class="btns">
        <button
          class="btn"
          type="button"
          @click="prevStep"
        >
          {{ currentStep === 0 ? '取消' : '上一步' }}
        </button>
        <button
          v-if="currentStep === 0"
          class="btn--red"
          type="submit"
        >
          下一步
        </button>
        <button
          v-else
          class="btn--red"
          type="submit"
          :disabled="isPending"
        >
          {{ isPending ? '送出中' : '送出' }}
        </button>
      </div>
    </Form>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { object, string, number } from 'yup'
import { Form, Field, ErrorMessage } from 'vee-validate'
import departments from '@/assets/departments.json'
import useAuth from '@/composables/useAuth'

export default {
  name: 'Register',
  components: {
    Form,
    Field,
    ErrorMessage
  },
  setup () {
    const router = useRouter()

    const currentStep = ref(0)
    const formData = reactive({})

    const thisYear = new Date().getFullYear() - 1911
    const yearOptions = Array.from({ length: 11 }, (v, i) => thisYear - 5 + i)

    // 每一個步驟的資料驗證
    const schemas = [
      object({
        studentId: string()
          .required('請輸入學號')
          .matches(/^[a-zA-Z]\d{8}$/, '請輸入正確學號格式')
          .length(9, '請輸入正確學號格式'),
        password: string()
          .required('請輸入密碼')
          .matches(
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            '密碼需包含數字與字母'
          )
          .min(8, '密碼字元需大於8位'),
        confirmPassword: string().test(
          'passwords-match',
          '與密碼不相符',
          function (value) {
            return this.parent.password === value
          }
        )
      }),
      object({
        name: string().required('請輸入姓名'),
        email: string()
          .required('請輸入信箱')
          .email('信箱格式不符'),
        major: string()
          .required('請選擇系所')
          .oneOf(departments, '請選擇系所'),
        graduationYear: number()
          .required()
          .oneOf(yearOptions, '請選擇系級')
      })
    ]
    const currentSchema = computed(() => {
      return schemas[currentStep.value]
    })

    // 控制表單步驟
    const { register, error: registerError, isPending } = useAuth()
    const nextStep = async () => {
      if (currentStep.value === 1) {
        console.log('完成表單：', formData)
        await register(formData)
        if (!registerError.value) {
          router.push({ name: 'Experience' })
        }
        return
      }
      currentStep.value++
    }
    const prevStep = () => {
      if (currentStep.value === 0) {
        router.go(-1)
      }
      currentStep.value--
    }

    return {
      departments,
      yearOptions,
      formData,
      currentStep,
      currentSchema,
      nextStep,
      prevStep,
      registerError,
      isPending
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/variables';

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
.form-input-group {
  display: grid;
  row-gap: 8px;
  span {
    color: $red;
  }
}
.btns {
  display: flex;
  justify-content: flex-end;
  column-gap: 10px;
}
</style>
