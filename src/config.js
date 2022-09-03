export const ExperienceTypes = [
  'course',
  'activity',
  'competition',
  'work',
  'certificate',
  'other'
]

export const chineseOfExperienceTypes = {
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
