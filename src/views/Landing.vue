<template>
  <div class="landing">
    <section class="hero">
      <div class="container hero__content">
        <div class="intro">
          <img class="intro__icon" src="@/assets/brand_icon_white.svg" alt="brand__icon" />
          <h1 class="intro__title">
            幫助你整理經歷，<br />
            全方位展現個人特質
          </h1>
          <h2 class="intro__subtitle">
            NCKU PASS 陪你整理學習經歷
          </h2>
        </div>
        <div class="login">
          <h2 class="login__title">
            登入 NCKU PASS
          </h2>
          <a href="https://i.ncku.edu.tw/ncku/oauth/eportfolio/login.php" class="ncku-login">
            使用<img src="@/assets/ncku_login.png" alt="ncku login" />登入
          </a>
        </div>
      </div>
      <svg
        class="scroll-arrow"
        width="44"
        height="29"
        viewBox="0 0 44 29"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M3 2L22 24L41 2" stroke="white" stroke-width="5" />
      </svg>
    </section>
    <div class="container">
      <section class="features">
        <h2 class="features__title">
          NCKU PASS 三大功能
        </h2>
        <ul class="features__list">
          <li class="features__item">
            <img src="@/assets/card-record.svg" alt="" class="features__item__img" />
            <h3 class="features__item__title">
              紀錄大學各項經驗
            </h3>
          </li>
          <li class="features__item">
            <img src="@/assets/card-plan.svg" alt="" class="features__item__img" />
            <h3 class="features__item__title">
              以TAG 整理個人能力
            </h3>
          </li>
          <li class="features__item">
            <img src="@/assets/card-portfolio.svg" alt="" class="features__item__img" />
            <h3 class="features__item__title">
              簡易製作履歷
            </h3>
          </li>
        </ul>
      </section>
      <section class="feature">
        <img class="feature__img" src="@/assets/landing-1.png" />
        <div class="feature__text">
          <h2>個人化紀錄</h2>
          <p>
            內建校內學習紀錄，以簡潔快速的方式一覽大學學習歷程，可以即時的在已修習過的課程進行紀錄，更能透過自行增減不同的學習紀錄，來增添你精彩大學的學習經歷。
          </p>
        </div>
      </section>
      <section class="feature feature--reverse">
        <img class="feature__img" src="@/assets/landing-2.png" />
        <div class="feature__text">
          <h2>以TAG整理個人能力</h2>
          <p>
            提供個人專屬的分類工具，以TAG 來標示課程所得到的能力，透過分類 TAG
            歸納出個人的關鍵技能，快速歸納自身特質及專長，精準統整，侃侃而談個人能力不再是難事。
          </p>
        </div>
      </section>
      <section class="feature">
        <img class="feature__img" src="@/assets/landing-3.png" />
        <div class="feature__text">
          <h2>簡易製作履歷</h2>
          <p>
            可以針對履歷、研究所備審等編排不同版本，在各版本中能主題式的展現個人能力，不再擔心不會排版，只需拉入各項經驗即可，最後一鍵即能輸出簡潔的個人履歷。
          </p>
        </div>
      </section>
    </div>
    <footer class="footer">
      <div class="container">
        <img class="footer__icon" src="@/assets/brand_icon_white.svg" alt="brand icon" />
        <p class="footer__info">
          © NCKU 教學發展中心版權所有<br /><br />
          701 台南市大學路一號光復校區雲平大樓3樓<br />
          Mail：<a href="mailto:nckuexperience@gmail.com">nckuexperience@gmail.com</a><br /><br />
          [ 若有任何問題歡迎寄信與我們聯繫或填寫以下表單 ]<br />
          <a href="https://forms.gle/tSSNHvQERSyVsHMJ6" target="_blank">回饋表單</a>
        </p>
        <div class="footer__links">
          <a href="https://web.ncku.edu.tw/" target="_blank">國立成功大學 National Cheng Kung University</a>
          <a href="https://ctld-acad.ncku.edu.tw/" target="_blank">教學發展中心</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Landing'
}
</script>

<style lang="scss" scoped>
@import '~@/scss/mixins';
@import '~@/scss/variables';
.landing {
  background-color: #faf5f5;
}
.hero {
  position: relative;
  color: #fff;
  height: 100vh;
  display: flex;
  align-items: center;
  background-image: url('~@/assets/landing_bg.svg');
  background-position: center -50px;
  background-size: cover;
  background-repeat: no-repeat;
  &__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 100px;
    width: 100%;
  }
}

.login {
  @include grid(row, 20px, 0);
  width: 350px;
  margin-top: 50px;
  &__title {
    margin: 0;
    font-size: 26px;
  }
}
.intro {
  &__icon {
    height: 60px;
    margin-bottom: 64px;
  }
  &__title {
    font-size: 60px;
    line-height: 97px;
  }
  &__subtitle {
    font-size: 21px;
    line-height: 34px;
  }
}
.scroll-arrow {
  position: absolute;
  bottom: 72px;
  left: 50%;
  transform: translateX(-50%);
  animation: jump 1.5s infinite;
}

.features {
  @include grid(row, 45px, 0);
  text-align: center;
  margin: 115px 0 45px;
  &__title {
    color: $red-light;
    font-weight: $weight-black;
    font-size: 60px;
    line-height: 97px;
  }
  &__list {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
  }
  &__item {
    @include grid(row, 40px, 0);
    justify-items: center;
    &__img {
      width: 150px;
    }
    &__title {
      font-size: 32px;
      line-height: 52px;
      color: $gray-1;
    }
  }
}

.feature {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 135px 0;
  &--reverse {
    flex-direction: row-reverse;
  }
  &__img {
    max-width: 500px;
  }
  &__text {
    max-width: 540px;
    h2 {
      margin-bottom: 50px;
      color: $red-light;
      font-weight: $weight-black;
      font-size: 60px;
      line-height: 97px;
    }
    p {
      font-size: 21px;
      line-height: 34px;
      color: $gray-2;
    }
  }
}

.footer {
  padding: 40px;
  background: $red;
  color: $white;
  line-height: 26px;
  .container {
    display: flex;
    margin: 0 auto;
  }
  &__icon {
    height: 40px;
    align-self: center;
    margin-right: 30px;
  }
  &__info {
    margin-right: auto;
    a {
      color: $white;
    }
  }
  &__links {
    text-align: right;
    display: flex;
    flex-direction: column;
    a {
      color: $white;
      align-self: end;
    }
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

@media (max-width: 1279px) {
  .features {
    margin: 115px 0;
  }
  .feature {
    flex-direction: column-reverse;
    text-align: center;
    padding: 65px 0;
    &__img {
      max-width: 800px;
    }
    &__text {
      max-width: 800px;
      margin-bottom: 20px;
      h2 {
        margin-bottom: 20px;
      }
    }
  }
}

@media (max-width: 1023px) {
  .intro {
    &__icon {
      margin-bottom: 32px;
    }
    &__title {
      font-size: 52px;
      line-height: 70px;
    }
  }
  .features {
    margin: 115px 0;
    &__title {
      font-size: 52px;
    }
    &__item {
      &__img {
        max-width: 135px;
      }
      &__title {
        font-size: 26px;
      }
    }
  }
  .feature {
    flex-direction: column-reverse;
    text-align: center;
    padding: 65px 0;
    &__img {
      max-width: 720px;
    }
    &__text {
      max-width: 720px;
      h2 {
        margin-bottom: 20px;
        font-size: 52px;
      }
    }
  }
}

@media (max-width: 767px) {
  .hero__content {
    flex-direction: column;
    text-align: center;
    align-items: center;
  }
  .intro {
    &__icon {
      height: 48px;
      display: inline-block;
      margin: auto 0;
    }
  }
  .features {
    &__item {
      &__img {
        max-width: 115px;
      }
      &__title {
        font-size: 20px;
      }
    }
  }
  .feature {
    &__img {
      max-width: 600px;
    }
    &__text {
      max-width: 600px;
      margin-bottom: 30px;
      h2 {
        margin-bottom: 20px;
      }
    }
  }
  .footer {
    padding: 20px;
    text-align: center;
    .container {
      flex-direction: column;
      gap: 20px;
    }
    &__links {
      text-align: center;
    }
  }
}
@media (max-width: 639px) {
  .intro {
    &__title {
      font-size: 44px;
      line-height: 70px;
    }
  }

  .features {
    &__title {
      font-size: 44px;
    }
    &__list {
      flex-direction: column;
    }
    &__item {
      gap: 5px 0;
      &:not(:last-child) {
        margin-bottom: 40px;
      }
      &__img {
        max-width: 150px;
      }
      &__title {
        font-size: 26px;
      }
    }
  }

  .feature {
    padding: 40px 20px;
    &__text h2 {
      line-height: 52px;
    }
    &__img {
      max-width: 100%;
    }
  }
}
</style>
