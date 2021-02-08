<template>
  <div class="experience">
    <div class="experience__window">
      <ul class="tabs">
        <li>
          <router-link class="tabs__tab" :to="{name: 'Experience', params: { type: 'class' }}">課程紀錄</router-link>
        </li>
        <li>
          <router-link class="tabs__tab" :to="{name: 'Experience', params: { type: 'activity' }}">活動經驗</router-link>
        </li>
        <li>
          <router-link class="tabs__tab" :to="{name: 'Experience', params: { type: 'competition' }}">競賽經驗</router-link>
        </li>
        <li>
          <router-link class="tabs__tab" :to="{name: 'Experience', params: { type: 'work' }}">工作經驗</router-link>
        </li>
        <li>
          <router-link class="tabs__tab" :to="{name: 'Experience', params: { type: 'certificate' }}">外語能力或證照</router-link>
        </li>
        <li>
          <router-link class="tabs__tab" :to="{name: 'Experience', params: { type: 'others' }}">其他</router-link>
        </li>
      </ul>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Experience'
}
</script>

<style lang="scss">
@import "../scss/variables";
@import "../scss/mixins";

.experience {
  height: 100%;
  padding: 52px 0 68px;
  display: flex;
  justify-content: center;
}

.experience__window {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  box-shadow: 0px 0px 30px rgba(241, 90, 96, 0.05), 0px 0px 25px rgba(241, 90, 96, 0.1);
}

.tabs {
  display: grid;
  grid-auto-flow: column;
  gap: 0 20px;
  padding: 8px 10px;
  list-style: none;
  box-shadow: 0px 4px 15px rgba(241, 90, 96, 0.06);
  &__tab {
    @include tab-link;
  }
}
</style>
