export const experienceTypes = [
  'course',
  'activity',
  'competition',
  'work',
  'certificate',
  'other'
]

export const experienceTypesInChinese = {
  course: '課程紀錄',
  activity: '活動經驗',
  competition: '競賽經驗',
  work: '工作經驗',
  certificate: '外語能力或證照',
  other: '其他'
}

export class KeyNoPairedError extends Error {
  constructor(message) {
    super(message)
    this.name = 'KeyNoPairedError'
  }
}

export const navbarLinks = [
  {
    dest: 'Experience',
    icon: 'shoePrint',
    name: '學習歷程'
  }, {
    dest: 'Portfolio',
    icon: 'textBoxMultiple',
    name: '經歷整合'
  }
]

export const experienceNavbarLinks = [
  {
    name: '課程紀錄',
    dest: 'course',
  }, {
    name: '活動經驗',
    dest: 'activity',
  }, {
    name: '競賽經驗',
    dest: 'competition',
  }, {
    name: '工作經驗',
    dest: 'work',
  }, {
    name: '外語能力或證照',
    dest: 'certificate',
  }, {
    name: '其他',
    dest: 'other',
  }
]

export const defaultTagNames = [
  '人文素養',
  '公民素養',
  '國際視野',
  '社會關懷',
  '語文與溝通能力',
  '思考與判斷能力',
  '專業與跨域能力',
  '創新與領導能力',
  '邏輯與分析能力',
  '勇敢落實的能力',
  '闡述與敘事能力',
  '拆解問題的能力',
  '人本關懷的能力'
].map((ability, i) => {
  return {
    id: i + 1,
    name: ability
  }
})
