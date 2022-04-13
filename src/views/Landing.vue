<template>
  <div class='landing' :class='device'>
    <section class='hero'>
      <div class='container hero__content'>
        <div class='intro'>
          <img class='intro__icon' src='@/assets/brand_icon_white.svg' alt='brand__icon' />
          <h2 class='intro__title'>
            幫助你整理經歷，<br />
            全方位展現個人特質
          </h2>
          <p class='intro__subtitle'>
            NCKU PASS 陪你整理學習經歷
          </p>
        </div>
        <div class='login'>
          <p class='login__title'>
            登入 NCKU PASS
          </p>
          <a href='https://i.ncku.edu.tw/ncku/oauth/eportfolio/login.php' class='ncku-login'>
            使用<img src='@/assets/ncku_login.png' alt='ncku login' />登入
          </a>
        </div>
      </div>
      <svg
        class='scroll-arrow'
        width='44'
        height='29'
        viewBox='0 0 44 29'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        @click='scrollToFeatures'
      >
        <path d='M3 2L22 24L41 2' stroke='white' stroke-width='5' />
      </svg>
    </section>
    <div class='container'>
      <section class='features'>
        <h1 class='features__title'>
          NCKU PASS 三大功能
        </h1>
        <ul class='features__list'>
          <li class='features__item'>
            <img src='@/assets/card-record.svg' alt='' class='features__item__img' />
            <p class='features__item__title'>
              紀錄大學各項經驗
            </p>
          </li>
          <li class='features__item'>
            <img src='@/assets/card-plan.svg' alt='' class='features__item__img' />
            <p class='features__item__title'>
              以TAG 整理個人能力
            </p>
          </li>
          <li class='features__item'>
            <img src='@/assets/card-portfolio.svg' alt='' class='features__item__img' />
            <p class='features__item__title'>
              簡易製作履歷
            </p>
          </li>
        </ul>
      </section>
      <section class='feature'>
        <img class='feature__img' src='@/assets/landing-1.png' />
        <div class='feature__text'>
          <h2 class='feature__text__title'>
            紀錄大學各項經驗
          </h2>
          <p class='feature__text__content'>
            內建校內學習紀錄，以簡潔快速的方式一覽大學學習歷程，可以即時的在已修習過的課程進行紀錄，更能透過自行增減不同的學習紀錄，來增添你精彩大學的學習經歷。
          </p>
        </div>
      </section>
      <section class='feature feature--reverse'>
        <img class='feature__img' src='@/assets/landing-2.png' />
        <div class='feature__text'>
          <h2 class='feature__text__title'>
            以TAG整理個人能力
          </h2>
          <p class='feature__text__content'>
            提供個人專屬的分類工具，以TAG 來標示課程所得到的能力，透過分類 TAG
            歸納出個人的關鍵技能，快速歸納自身特質及專長，精準統整，侃侃而談個人能力不再是難事。
          </p>
        </div>
      </section>
      <section class='feature'>
        <img class='feature__img' src='@/assets/landing-3.png' />
        <div class='feature__text'>
          <h2 class='feature__text__title'>
            簡易製作履歷
          </h2>
          <p class='feature__text__content'>
            可以針對履歷、研究所備審等編排不同版本，在各版本中能主題式的展現個人能力，不再擔心不會排版，只需拉入各項經驗即可，最後一鍵即能輸出簡潔的個人履歷。
          </p>
        </div>
      </section>
    </div>
    <footer class='footer'>
      <img class='footer__icon' src='@/assets/brand_icon_white.svg' alt='brand icon' />
      <p class='footer__info'>
        © NCKU 教學發展中心版權所有<br /><br />
        701 台南市大學路一號光復校區雲平大樓3樓<br />
        Mail：<a href='mailto:nckuexperience@gmail.com'>nckuexperience@gmail.com</a><br /><br />
        [ 若有任何問題歡迎寄信與我們聯繫或填寫以下表單 ]<br />
        <a href='https://forms.gle/tSSNHvQERSyVsHMJ6' target='_blank'>回饋表單</a>
      </p>
      <div class='footer__links'>
        <a href='https://web.ncku.edu.tw/' target='_blank'>國立成功大學 National Cheng Kung University</a>
        <a href='https://ctld-acad.ncku.edu.tw/' target='_blank'>教學發展中心</a>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Landing',
  inject: ['mq'],
  computed: {
    device() {
      return this.mq.current
    }
  },
  methods: {
    scrollToFeatures: () => {
      const features = document.getElementsByClassName('features')[0]
      features.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/scss/mixins';
@import '~@/scss/variables';

.landing {
  background-color: $gray-6;
}

.hero {
  position: relative;
  color: $white;
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
    @include font-format('b2')
  }
}

.intro {
  &__icon {
    height: 60px;
    margin-bottom: 21px;
  }
  &__title {
    @include font-format('h2')
  }
  &__subtitle {
    @include font-format('b2')
  }
}

.scroll-arrow {
  position: absolute;
  bottom: 72px;
  left: 50%;
  transform: translateX(-50%);
  animation: jump 1.5s infinite;
  cursor: pointer;
}

.features {
  @include grid(row, 30px, 0);
  text-align: center;
  margin: 115px 0 45px;
  &__title {
    @include font-format('h1', 100px, $red-light);
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
      @include font-format($type: 'b2', $color: $gray-1);
    }
  }
}

.feature {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 100px 0;
  &--reverse {
    flex-direction: row-reverse;
  }
  &__img {
    max-width: 540px;
    min-height: 300px;
    margin: 0 24px;
  }
  &__text {
    min-width: 540px;
    max-width: 620px;
    &__title {
      @include font-format('h2', 20px, $red-light);
      text-align: center;
    }
    &__content {
      @include font-format($type: 'b2', $color: $gray-2);
    }
  }
}

.footer {
  @include font-format($type: 'b3', $color: $white);
  height: 250px;
  padding: 32px 140px;
  background: $red;
  display: flex;

  a {
    color: $white;
  }

  &__icon {
    height: 64px;
    align-self: center;
    margin-right: 76px;
  }
  &__info {
    margin-right: auto;
  }
  &__links {
    text-align: right;
    display: flex;
    flex-direction: column;
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

.laptop, .tablet, .mobile {
  .hero__content {
    flex-direction: column;
  }
  .intro {
    align-self: flex-start;
  }
  .feature {
    flex-direction: column-reverse;
    text-align: center;
    &__img {
      max-width: 100%;
    }
  }
}

.laptop {
  .intro__subtitle {
    margin-bottom: 120px;
  }
  .features {
    margin: 68px 0 90px 0;
    &__title {
      margin-bottom: 42px;
    }
  }
  .feature {
    padding: 70px 0;
    &__text {
      max-width: 100%;
      margin-bottom: 48px;
      &__title {
        margin-bottom: 48px;
      }
    }
  }
  .footer {
    padding: 32px 100px;
    &__icon {
      margin-right: 45px;
    }
  }
}

.tablet, .mobile {
  .intro {
    &__subtitle {
      margin-bottom: 45px;
    }
  }
  .feature {
    padding: 65px 0;
    &__text {
      margin-bottom: 20px;
    }
  }
}

.tablet {
  .hero__content {
    margin-bottom: 200px;
  }
  .intro {
    &__icon {
      height: 56px;
      margin-bottom: 10px;
    }
  }
  .features {
    margin: 80px 0;
    &__title {
      margin-bottom: 24px;
    }
    &__item_img {
      max-width: 135px;
    }
  }
  .feature {
    padding: 40px 0;
    &__text {
      &__title {
        margin-bottom: 24px;
      }
      &__content {
        @include font-format('b2');
      }
    }
  }
  .footer {
    height: 160px;
    padding: 20px 80px;
    &__icon {
      height: 48px;
      margin-right: 30px;
    }
  }
}

.mobile {
  .hero {
    height: calc(100vh - 200px);
    &__content {
      margin-bottom: 250px;
    }
  }
  .intro {
    margin-left: 40px;
    &__icon {
      height: 30px;
      margin-bottom: 5px;
    }
    &__subtitle {
      @include font-format('b1');
      margin-bottom: 42px;
    }
  }
  .login {
    @include font-format('b4', $mb: 0px);
    justify-content: center;
    margin-top: 0;
    @include grid(row, 0, 0);
    img {
      width: 188px;
    }
  }
  .features {
    @include grid(row, 14px, 0);
    margin: 45px 0;
    &__title {
      margin-bottom: 14px;
    }
    &__item {
      gap: 20px 0;
      &__img {
        max-width: 80px;
      }
    }
  }
  .feature {
    padding: 20px 0;
    &__text {
      padding: 0 40px;
      max-width: unset;
      min-width: unset;
      &__title {
        margin-bottom: 20px;
      }
      &__content {
        @include font-format('b4')
      }
    }
    &__img {
      min-height: unset;
    }
  }
  .footer {
    @include font-format('b6');
    height: 90px;
    padding: 24px 30px;
    &__icon {
      height: 18px;
      margin-right: 10px;
    }
  }
}
</style>
