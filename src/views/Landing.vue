<template>
  <div class="landing">
    <div class="section section-1">
      <svg
        class="section-1__bg"
        width="1434"
        height="1065"
        viewBox="0 0 1434 1065"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M1012.21 -523.054C1183.44 -457.079 1307.41 -301.352 1382.13 -133.75C1453.3 25.8978 1437.75 203.759 1413.39 376.853C1389.2 548.798 1362.16 729.353 1242.92 855.577C1123.43 982.073 946.005 1028.48 773.861 1053.86C606.82 1078.48 439.607 1060.17 283.001 997.072C117.49 930.381 -53.0788 844.254 -137.067 686.809C-220.88 529.691 -189.228 341.864 -160.244 166.156C-132.109 -4.40497 -96.974 -182.972 26.3849 -304.072C147.847 -423.31 327.737 -439.089 493.889 -475.997C667.497 -514.56 846.272 -586.993 1012.21 -523.054Z"
          fill="#9D2235"
        />
      </svg>
      <div class="container section-1__content">
        <div class="intro">
          <img src="@/assets/brand_icon_white.svg" alt="">
          <h1 class="intro__title">
            因為整理，<br>讓你更了解自己
          </h1>
          <h2 class="intro__subtitle">
            E-portfolio 陪你整理學習經歷
          </h2>
        </div>
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
            >
          </div>
          <div>
            <label for="password" class="form-label">密碼</label>
            <input
              id="password"
              v-model="authData.password"
              type="password"
              class="form-control"
            >
          </div>
          <button class="btn">
            登入
          </button>
          <a class="register">還沒註冊嗎，點我立即註冊</a>
        </form>
      </div>
      <svg
        class="scroll-arrow"
        width="44"
        height="29"
        viewBox="0 0 44 29"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 2L22 24L41 2"
          stroke="white"
          stroke-width="5"
        />
      </svg>
    </div>
    <div class="section section-2">
      <div class="container section-2__content">
        <h2 class="section-2__title">
          透過 e-portfolio 來實現你的目標
        </h2>
        <div class="section-2__cards">
          <div class="card">
            <img
              src="@/assets/card-record.svg"
              alt=""
              class="card__img"
            >
            <h3 class="card__title">
              紀錄學習收穫
            </h3>
            <p class="card__desc">
              紀錄學習過程，
              如：自己過去的努力及收穫
            </p>
          </div>
          <div class="card">
            <img
              src="@/assets/card-plan.svg"
              alt=""
              class="card__img"
            >
            <h3 class="card__title">
              紀錄學習收穫
            </h3>
            <p class="card__desc">
              紀錄學習過程，
              如：自己過去的努力及收穫
            </p>
          </div>
          <div class="card">
            <img
              src="@/assets/card-portfolio.svg"
              alt=""
              class="card__img"
            >
            <h3 class="card__title">
              紀錄學習收穫
            </h3>
            <p class="card__desc">
              紀錄學習過程，
              如：自己過去的努力及收穫
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="section introduction">
      <div class="container">
        <img class="introduction__img">
        <div class="introduction__text">
          個人化紀錄
        </div>
      </div>
    </div>
    <div class="section introduction">
      <div class="container">
        <img class="introduction__img">
        <div class="introduction__text">
          歸納出關鍵能力
        </div>
      </div>
    </div>
    <div class="section introduction">
      <div class="container">
        <img class="introduction__img">
        <div class="introduction__text">
          展現個人優勢
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from '@vue/runtime-core'
import { useRouter } from 'vue-router'
import fullpage from 'fullpage.js'
import 'fullpage.js/dist/fullpage.min.css'
import { login } from '@/api/auth'

export default {
  name: 'Landing',
  setup () {
    const isInit = ref(false)
    onMounted(() => {
      if (!isInit.value) {
        fullpage('.landing', {
          licenseKey: "i#eq#uS42Kr]C~j4g/m~3P;2R+( &83iM?yko4P'HZ9E|k1-x:<okp",
          easingcss3: 'cubic-bezier(0.64, 0.055, 0.345, 1)'
        })
        isInit.value = true
      }
    })

    const router = useRouter()

    const authData = reactive({
      studentId: '',
      password: ''
    })

    const handleSubmit = async () => {
      try {
        const res = await login(authData)
        localStorage.setItem('auth', res.data.tokenStr)
        router.push({ name: 'Experience' })
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }

    return { authData, handleSubmit }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/scss/mixins";
@import "~@/scss/variables";
.landing {
  background-color: #FAF5F5;
}
.container {
  max-width: 1110px;
  margin: 0 auto;
}
.section-1 {
  position: relative;
  color: #fff;
  &__bg {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: -1;
  }
  &__content {
    display: flex;
    justify-content: space-between;
    margin-bottom: 100px;
  }
}
.scroll-arrow {
  position: absolute;
  bottom: 22px;
  left: 50%;
  transform: translateX(-50%);
  animation: jump 1.5s infinite;
}
.intro {
  &__title {
    font-size: 60px;
  }
  &__subtitle {
    font-size: 32px;
  }
}
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

.section-2 {
  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  &__title {
    font-size: 60px;
    color: $red;
    margin-top: 0;
    margin-bottom: 65px;
    padding-bottom: 15px;
    box-shadow: 0 5px $red;
  }
  &__cards {
    @include grid(column, 0px, 65px);
  }
}
.card {
  width: 260px;
  padding: 40px 30px;
  @include grid(row, 20px, 0);
  justify-items: center;
  background-color: #fff;
  border: 1px solid $gray-5;
  box-shadow: 0px 0px 15px rgba(241, 90, 96, 0.1), 2px 2px 10px rgba(241, 90, 96, 0.15);
  border-radius: 15px;
  &__title {
    font-size: 21px;
    font-weight: normal;
  }
  &__desc {
    color: $gray-3;
  }
}

@keyframes jump {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
  100% {
    transform: translateY(0px);
  }
}
</style>
