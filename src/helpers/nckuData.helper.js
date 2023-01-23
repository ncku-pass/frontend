import { dateToSemester, semesterToDate } from '@/helpers/semester.helper'

const emptyExp = {
  name: '',
  position: '',
  semester: '',
  link: '',
  coreAbilities: '',
  type: null,
  dateStart: null,
  dateEnd: null
}

export const covertActivitiesToExps = (activities) => {
  return activities.map(activity => ({
    ...emptyExp,
    name: activity.activity_name,
    position: '參與者',
    semester: dateToSemester(new Date(activity.active_start)),
    link: activity.activity_url,
    type: 'activity',
    dateStart: new Date(activity.active_start.replace(/\s/, 'T')).toISOString()
  }))
}
export const covertClubsToExps = (clubs) => {
  return clubs.map(club => ({
    ...emptyExp,
    name: club.club_name,
    position: club.position,
    semester: `${club.syear}-${club.sem}`,
    type: 'activity',
    dateStart: semesterToDate(`${club.syear}-${club.sem}`).toISOString()
  }))
}

export const covertCoursesToExps = (courses) => {
  return courses.map(course => ({
    ...emptyExp,
    name: course.course_name,
    semester: `${course.syear}-${course.sem}`,
    link: course.course_url,
    coreAbilities: Object.values(course.core_abilities).join('、'),
    type: 'course',
    dateStart: semesterToDate(`${course.syear}-${course.sem}`).toISOString()
  }))
}

export const uniqueActivities = (activities) => {
  const record = new Set()
  const res = []
  activities.forEach(activity => {
    if (!record.has(activity.activity_name)) {
      res.push(activity)
      record.add(activity.activity_name)
    }
  })
  return res
}
