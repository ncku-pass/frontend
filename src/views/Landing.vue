<template>
  <div class='landing' :class='device'>
    <section class='hero'>
      <div class='container hero__content'>
        <div class='intro'>
          <img class='intro__icon' src='@/assets/Logo/normal_white.svg' alt='brand__icon' />
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
            主題式歸納經歷
          </h2>
          <p class='feature__text__content'>
            可以針對履歷、研究所備審等編排不同版本，在各版本中能主題式展現個人能力，不再擔心不會排版，只須拉入各項經驗即可。定時整理歸納經歷，方便日後做履歷。
          </p>
        </div>
      </section>
    </div>
    <footer class='footer'>
      <img v-if='device !== "mobile"' class='footer__icon' src='@/assets/Logo/normal_white.svg' alt='brand icon' />
      <p class='footer__info'>
        <span>© NCKU 教學發展中心版權所有</span>
        <br />
        <span>Design by NCKU PASS 製作團隊</span>
        <span>Mail：<a href='mailto:ncku.pass@gmail.com'>ncku.pass@gmail.com</a></span>
        <br />
        <span>[ 若有任何問題歡迎寄信與我們聯繫或填寫以下表單 ]</span>
        <span><a href='https://forms.gle/tSSNHvQERSyVsHMJ6' target='_blank'>回饋表單</a></span>
      </p>
      <div class='footer__links'>
        <a href='https://web.ncku.edu.tw/' target='_blank'>國立成功大學 National Cheng Kung University</a>
        <a href='https://ctld-acad.ncku.edu.tw/' target='_blank'>教學發展中心</a>
        <img v-if='device === "mobile"' class='footer__icon' src='@/assets/Logo/normal_white.svg' alt='brand icon' />
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
  background-color: $grey-1;
}

.hero {
  position: relative;
  color: $white;
  display: flex;
  align-items: center;
  background-image: url('~@/assets/landing_bg.svg');
  background-position: center -100px;
  background-size: cover;
  background-repeat: no-repeat;

  &__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 50px;
    margin-bottom: 300px;
    width: 100%;
  }
}

.login {
  @include grid(row, 20px, 0);
  width: 350px;
  margin-top: 50px;
  &__title {
    @include font-format($type: 'b3', $bold: true)
  }
}

.intro {
  &__icon {
    height: 96px;
    margin-bottom: 40px;
  }
  &__title {
    @include font-format($type: 'h2', $mb: 12px, $bold: true)
  }
  &__subtitle {
    @include font-format('b2')
  }
}

.scroll-arrow {
  position: absolute;
  bottom: 110px;
  left: 50%;
  transform: translateX(-50%);
  animation: jump 1.5s infinite;
  cursor: pointer;
}

.features {
  @include grid($orientation: row, $row-gap: 20px);
  text-align: center;
  margin: 150px 0;
  padding: 0 92px;

  &__title {
    @include font-format('h2', 56px, $red-4, true);
  }
  &__list {
    display: flex;
    justify-content: space-between;
  }
  &__item {
    @include grid(row, 40px, 0);
    justify-items: center;
    &__img {
      width: 150px;
    }
    &__title {
      @include font-format($type: 'b2', $color: $grey-6);
    }
  }
}

.feature {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 160px 0;
  &--reverse {
    flex-direction: row-reverse;
  }
  &__img {
    max-width: 540px;
    margin: 0 24px;
  }
  &__text {
    min-width: 540px;
    max-width: 630px;
    &__title {
      @include font-format('h2', 24px, $red-4, true);
      text-align: center;
    }
    &__content {
      @include font-format($type: 'b2', $color: $grey-5, $line-height: 56px);
    }
  }
}

.footer {
  @include font-format($type: 'b5', $color: $white);
  height: 252px;
  padding: 40px 120px;
  background: $red-5;
  display: flex;

  a {
    color: $white;
  }

  &__icon {
    width: 276px;
    align-self: center;
    margin-right: 76px;
  }
  &__info {
    margin-right: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  &__links {
    text-align: right;
    display: flex;
    flex-direction: column;
    justify-content: center;
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
    &__title {
      @include font-format($type: 'h1', $mb: 12px, $bold: true)
    }
    &__subtitle {
      @include font-format($type: 'b1');
    }
  }
  .login {
    margin-top: 0;
    justify-content: center;
    &__title {
      @include font-format($type: 'b2')
    }
  }
  .features {
    padding: 0;
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
  .intro {
    &__icon {
      height: 76px;
    }
    &__subtitle {
      margin-bottom: 137px;
    }
  }
  .features {
    margin: 104px 0 152px 0;
    &__title {
      margin-bottom: 48px;
    }
  }
  .feature {
    padding: 0 80px 160px 80px;
    &__text {
      max-width: 100%;
      margin-bottom: 32px;
      &__title {
        margin-bottom: 32px;
      }
    }
  }
  .footer {
    padding: 40px 90px;
    &__icon {
      width: 276px;
      margin-right: 96px;
    }
  }
}

.tablet, .mobile {
  .scroll-arrow {
    width: 30px;
  }

  .intro {
    &__subtitle {
      margin-bottom: 45px;
    }
  }
  .feature {
    padding: 65px 0;
    &__text {
      &__content {
        @include font-format($type: 'b2', $color: $grey-5, $line-height: 48px);
      }
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
      margin-bottom: 32px;
    }
    &__subtitle {
      margin-bottom: 100px;
    }
  }
  .features {
    margin: 80px 0 96px 0;
    padding: 0;

    &__title {
      @include font-format($type: 'h1', $mb: 32px, $bold: true)
    }
    &__item__img {
      max-width: 120px;
    }
  }
  .feature {
    padding: 0 0 96px 0;
    &__text {
      &__title {
        @include font-format($type: 'h1', $mb: 24px, $bold: true)
      }
      &__content {
        @include font-format('b2', $line-height: 40px);
        margin-bottom: 24px;
      }
    }
  }
  .footer {
    height: 176px;
    padding: 36px 48px;
    &__icon {
      width: 176px;
      margin-right: 40px;
    }
  }
}

.mobile {
  .hero {
    &__content {
      margin-bottom: 200px;

      .intro {
        margin-left: 40px;

        &__icon {
          height: 28px;
          margin-bottom: 16px;
        }

        &__subtitle {
          @include font-format('b3');
          margin-bottom: 42px;
        }
      }
    }
  }

  .login {
    @include grid(row, 0, 0);
    &__title {
      @include font-format('b3', $mb: 8px, $bold: false);
    }
    img {
      width: 160px;
    }
  }
  .features {
    @include grid(row, 16px, 0);
    margin: 20px 30px 48px 30px;
    &__title {
      margin-bottom: 16px;
    }
    &__item {
      gap: 10px 0;
      &__title {
        @include font-format($type: 'b3', $color: $grey-6);
      }
      &__img {
        max-width: 60px;
      }
    }
  }
  .feature {
    padding: 0 40px 40px 40px;
    &__text {
      max-width: unset;
      min-width: unset;
      margin-bottom: 16px;
      &__title {
        margin-bottom: 16px;
      }
      &__content {
        @include font-format('b3', $line-height: 16px)
      }
    }
    &__img {
      min-height: unset;
    }
  }
  .footer {
    @include font-format('b4');
    height: 110px;
    padding: 20px 28px;

    &__icon {
      width: 96px;
      margin: 12px 0 0 0;
      align-self: flex-end;
    }
  }
}
</style>
