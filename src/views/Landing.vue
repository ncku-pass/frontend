<template>
  <div class="landing">
    <div class="section section-1">
      <svg
        class="section-1__bg"
        viewBox="0 0 1440 953"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="720"
          cy="-1547"
          r="2500"
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
      <div class="slide">
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
                紀錄學習過程，<br>
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
                幫助自我學習規劃
              </h3>
              <p class="card__desc">
                安排新學期課程之前，<br>
                檢視過去的學習，讓學習更有脈絡
              </p>
            </div>
            <div class="card">
              <img
                src="@/assets/card-portfolio.svg"
                alt=""
                class="card__img"
              >
              <h3 class="card__title">
                幫助履歷&備審撰寫
              </h3>
              <p class="card__desc">
                彙整學經歷，<br>
                讓撰寫變得更加方便
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="slide">
        <div class="container introduction">
          <img class="introduction__img" src="@/assets/landing-1.png">
          <div class="introduction__text">
            <h2>個人化紀錄</h2>
            <p>內建校內學習紀錄，以簡潔快速的方式一覽大學學習歷程，可以即時的在已修習過的課程進行紀錄，更能透過自行增減不同的學習紀錄，來增添你精彩大學的學習經歷。</p>
          </div>
        </div>
      </div>
      <div class="slide">
        <div class="container introduction introduction--reverse">
          <img class="introduction__img" src="@/assets/landing-2.png">
          <div class="introduction__text">
            <h2>歸納出關鍵能力</h2>
            <p>提供個人專屬的分類工具，以TAG 來標示課程所得到的能力，透過分類 TAG 歸納出個人的關鍵技能，快速歸納自身特質及專長，精準統整，侃侃而談個人能力不再是難事。</p>
          </div>
        </div>
      </div>
      <div class="slide">
        <div class="container introduction">
          <img class="introduction__img" src="@/assets/landing-3.png">
          <div class="introduction__text">
            <h2>展現個人優勢</h2>
            <p>可以針對履歷、研究所備審等編排不同版本，在各版本中能主題式的展現個人能力，不再擔心不會排版，只需拉入各項經驗即可，最後一鍵即能輸出簡潔的個人履歷。</p>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="section">
      <div class="container introduction">
        <img class="introduction__img" src="@/assets/landing-1.png">
        <div class="introduction__text">
          <h2>個人化紀錄</h2>
          <p>內建校內學習紀錄，以簡潔快速的方式一覽大學學習歷程，可以即時的在已修習過的課程進行紀錄，更能透過自行增減不同的學習紀錄，來增添你精彩大學的學習經歷。</p>
        </div>
      </div>
    </div> -->
    <!-- <div class="section">
      <div class="container introduction introduction--reverse">
        <img class="introduction__img" src="@/assets/landing-2.png">
        <div class="introduction__text">
          <h2>歸納出關鍵能力</h2>
          <p>提供個人專屬的分類工具，以TAG 來標示課程所得到的能力，透過分類 TAG 歸納出個人的關鍵技能，快速歸納自身特質及專長，精準統整，侃侃而談個人能力不再是難事。</p>
        </div>
      </div>
    </div> -->
    <!-- <div class="section">
      <div class="container introduction">
        <img class="introduction__img" src="@/assets/landing-3.png">
        <div class="introduction__text">
          <h2>展現個人優勢</h2>
          <p>可以針對履歷、研究所備審等編排不同版本，在各版本中能主題式的展現個人能力，不再擔心不會排版，只需拉入各項經驗即可，最後一鍵即能輸出簡潔的個人履歷。</p>
        </div>
      </div>
    </div> -->
    <!-- TODO: 等待設計師修正 -->
    <div class="section section-footer">
      <div class="section-footer__bg" />
      <div class="container section-footer__content">
        <div class="section-footer__summary">
          E-portfolio幫助學生<span class="red">有效的</span>整理經歷，並<span class="red">全方位</span>展現個人特質
        </div>
        <div class="section-footer__btns">
          <button class="btn">
            馬上登入
          </button>
          <button class="btn--danger">
            立即註冊
          </button>
        </div>
        <div class="section-footer__footer">
          <p>© NCKU 教學發展中心版權所有</p>
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
          easingcss3: 'cubic-bezier(0.64, 0.055, 0.345, 1)',
          anchors: ['1', '2', '3'],
          controlArrows: false,
          slidesNavigation: true,
          slidesNavPosition: 'bottom'
          // onLeave: function (index, nextIndex, direction) {
          //   if (index == 2 && !sliding) {
          //     if (direction == 'down' && slideIndex < 5) {
          //       sliding = true
          //       $.fn.fullpage.moveSlideRight()
          //       slideIndex++
          //       return false
          //     } else if (direction == 'up' && slideIndex > 1) {
          //       sliding = true
          //       $.fn.fullpage.moveSlideLeft()
          //       slideIndex--
          //       return false
          //     }
          //   } else if (sliding) {
          //     return false
          //   }
          // },

          // afterSlideLoad: function (anchorLink, index, slideAnchor, slideIndex) {
          //   sliding = false
          // }
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
    bottom: 50px;
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
  bottom: 72px;
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
.introduction {
  display: flex;
  justify-content: space-between;
  align-items: center;
  &--reverse {
    flex-direction: row-reverse;
  }
  &__img {
    width: 445px;
  }
  &__text {
    width: 540px;
    h2 {
      color: $red-light;
      font-weight: $weight-black;
      margin-top: 0;
      margin-bottom: 50px;
      font-size: 60px;
    }
    p {
      font-size: 21px;
      text-indent : 2em;
      line-height: 34px;
    }
  }
}
.section-footer {
  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__bg {
    position: absolute;
    z-index: -1;
    top: 0;
    width: 100%;
    height: 480px;
    background: url('~@/assets/chatting.png') no-repeat center;
    background-size: cover;
  }
  &__summary {
    padding: 8px 20px;
    margin-bottom: 50px;
    background: rgba(255, 255, 255, 0.69);
    border-radius: 10px;
    color: $gray-1;
    text-align: center;
    font-weight: 900;
    font-size: 60px;
    line-height: 97px;
    .red {
      color: $red-light;
    }
  }
  &__btns {
    @include grid(column, 0, 60px);
    button {
      font-size: 32px;
      line-height: 52px;
    }
  }
  &__footer {
    z-index: -1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    position: absolute;
    bottom: 0;
    padding: 27px;
    height: 200px;
    width: 100%;
    background-color: $red;
    text-align: center;
    color: $white;
  }
}

@keyframes jump {
  0% {
    transform: translate(-50%, 0px);
  }
  50% {
    transform: translate(-50%, -15px);
  }
  100% {
    transform: translate(-50%, 0px);
  }
}
</style>

<style>
.fp-slidesNav {
  width: 300px;
  text-align: center;
}
</style>
