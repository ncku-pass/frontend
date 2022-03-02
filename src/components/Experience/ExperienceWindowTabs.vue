<template>
  <ul class='experience__window__tabs'>
    <li>
      <router-link
        class='tab-link'
        :class='{ &apos;router-link-active&apos;: type === &apos;course&apos; }'
        :to='{ name: &apos;Experience&apos;, params: { type: &apos;course&apos; } }'
      >
        課程紀錄
      </router-link>
    </li>
    <li>
      <router-link class='tab-link' :to='{ name: &apos;Experience&apos;, params: { type: &apos;activity&apos; } }'>
        活動經驗
      </router-link>
    </li>
    <li>
      <router-link class='tab-link' :to='{ name: &apos;Experience&apos;, params: { type: &apos;competition&apos; } }'>
        競賽經驗
      </router-link>
    </li>
    <li>
      <router-link class='tab-link' :to='{ name: &apos;Experience&apos;, params: { type: &apos;work&apos; } }'>
        工作經驗
      </router-link>
    </li>
    <li>
      <router-link class='tab-link' :to='{ name: &apos;Experience&apos;, params: { type: &apos;certificate&apos; } }'>
        外語能力或證照
      </router-link>
    </li>
    <li>
      <router-link class='tab-link' :to='{ name: &apos;Experience&apos;, params: { type: &apos;other&apos; } }'>
        其他
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'ExperienceWindwoTabs',
  props: {
    type: {
      type: String,
      default: 'course'
    }
  }
};
</script>

<style lang="scss" scoped>
.experience__window__tabs {
  display: flex;
  justify-content: space-between;
  padding: 8px 10px;
  min-height: 50px;
  list-style: none;
  box-shadow: 0px 4px 15px rgba(241, 90, 96, 0.06);
  overflow-x: auto;
}
</style>
