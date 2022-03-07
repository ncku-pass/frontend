import {
  getExperiences as getExperiencesAPI,
  addExperience as addExperienceAPI,
  updateExperience as updateExperienceAPI,
  importExperiences as importExperiencesAPI
} from '@/api/experiences';
import { getNCKUExperiences as getNCKUExperiencesAPI } from '@/api/ncku-portal';
import { semesterToDate, dateToSemester } from '@/helpers/index';
import { sortExperiences, classifyBySemester, orderBySemester } from '@/helpers/experiences';
import { KeyNoPairedError } from '@/config';

const experiences = {
  namespaced: true,
  state: () => ({
    experiences: null,
    nckuExperiences: null,
    error: null,
    isPending: false
  }),
  mutations: {
    SET_EXPERIENCES(state, experiences) {
      state.experiences = experiences;
    },
    SET_NCKU_EXPERIENCES(state, nckuExperiences) {
      state.nckuExperiences = nckuExperiences;
    },
    ADD_EXPERIENCE(state, { type, experience }) {
      const expArray = state.experiences[type];
      let i = 0;
      while (i < expArray.length && expArray[i].semester > experience.semester) {
        i++;
      }
      expArray.splice(i, 0, experience);
    },
    UPDATE_EXPERIENCE(state, { id, experience }) {
      const expArray = state.experiences[experience.type];
      expArray.some((exp, i) => {
        if (exp.id === id) {
          expArray[i] = experience;
          return true;
        }
        return false;
      });
    },
    SET_STATUS(state, { error = undefined, isPending = undefined }) {
      if (error !== undefined) state.error = error;
      if (isPending !== undefined) state.isPending = isPending;
    }
  },
  actions: {
    initExperiences({ state, dispatch }) {
      if (!state.experiences) {
        dispatch('getExperiences');
      }
    },
    async getExperiences({ commit }) {
      try {
        commit('SET_STATUS', { isPending: true, error: null });

        const { data } = await getExperiencesAPI();

        commit('SET_EXPERIENCES', sortExperiences(data));
      } catch (error) {
        commit('SET_STATUS', { error });
      } finally {
        commit('SET_STATUS', { isPending: false });
      }
    },
    async addExperience(
      { commit },
      { name, position, description, feedback, semester, link, type, tags, categories, dateStart, dateEnd }
    ) {
      const { data } = await addExperienceAPI({
        name,
        position,
        description,
        feedback,
        semester,
        link,
        type,
        tags,
        categories,
        dateStart,
        dateEnd
      });
      commit('ADD_EXPERIENCE', { type, experience: data });
    },
    async updateExperience({ commit, dispatch }, { id, experience }) {
      const { data } = await updateExperienceAPI(id, experience);
      commit('UPDATE_EXPERIENCE', { id: data.id, experience: data });
      dispatch('resumes/getResumes', {}, { root: true });
    },
    async importExperiences({ commit }, experiences) {
      try {
        commit('SET_STATUS', { isPending: true, error: null });

        const { data } = await importExperiencesAPI(experiences);

        data.forEach(experience => {
          commit('ADD_EXPERIENCE', {
            type: experience.type,
            experience
          });
        });
      } catch (error) {
        commit('SET_STATUS', { error });
      } finally {
        commit('SET_STATUS', { isPending: false });
      }
    },
    async getNckuExperiences({ commit, rootState }) {
      try {
        if (!rootState.auth.key || !rootState.auth.keyval) {
          throw new KeyNoPairedError('沒有key / keyval');
        }
        const res = await getNCKUExperiencesAPI({
          key: rootState.auth.key,
          keyval: rootState.auth.keyval
        });
        console.log(res);
        const data = res.data?.data;
        if (!data) {
          throw new KeyNoPairedError(res.data.msg);
        }

        const course = changeCoursesToExperiences(data.course);
        const club = changeClubsToExperiences(data.club);
        const activity = changeActivitiesToExperiences(filterDuplicateActivity(data.activity));

        commit('SET_NCKU_EXPERIENCES', {
          course: orderBySemester(course),
          activity: orderBySemester([...club, ...activity])
        });
      } catch (error) {
        if (error instanceof KeyNoPairedError) {
          throw error;
        } else {
          console.error(error.stack);
          commit('SET_STATUS', { error });
        }
      }
    }
  },
  getters: {
    /**
     * 把所有經驗整合到同一個array
     */
    experiencesArray(state) {
      const arr = [];
      for (const type in state.experiences) {
        arr.push(...state.experiences[type]);
      }
      return arr;
    },
    /**
     * 將每個活動類別內的資料，依照學期分類好
     */
    classifiedExperiences(state) {
      const experiences = {};
      for (const type in state.experiences) {
        experiences[type] = classifyBySemester(state.experiences[type]);
      }
      return experiences;
    },
    classifiedNckuExperiences(state) {
      if (!state.nckuExperiences) {
        return null;
      }
      return {
        course: classifyBySemester(
          state.nckuExperiences.course.filter(nckuExp => {
            return !state.experiences.course.find(exp => exp.name === nckuExp.name && exp.semester === nckuExp.semester);
          })
        ),
        activity: classifyBySemester(
          state.nckuExperiences.activity.filter(nckuExp => {
            return !state.experiences.activity.find(
              exp => exp.name === nckuExp.name && exp.semester === nckuExp.semester
            );
          })
        )
      };
    },
    /**
     * 取得不重複的所有學期
     */
    semesters(state, getters) {
      const semesters = new Set();
      for (const exp of getters.experiencesArray) {
        semesters.add(exp.semester);
      }
      return [...semesters].sort((a, b) => {
        return a > b ? -1 : 1; // 學期靠近的排在前面
      });
    },
    /**
     * 取得有使用到，且不重複的所有Tag
     */
    tags(state, getters) {
      const tags = new Set();
      for (const exp of getters.experiencesArray) {
        for (const tag of exp.tags) {
          tags.add(tag);
        }
      }
      return [...tags];
    }
  }
};

const experience = {
  name: '',
  position: '',
  semester: '',
  link: '',
  coreAbilities: '',
  type: null,
  dateStart: null,
  dateEnd: null
};
const changeActivitiesToExperiences = activities => {
  return activities.map(activity => ({
    ...experience,
    name: activity.activity_name,
    position: '參與者',
    semester: dateToSemester(new Date(activity.active_start)),
    link: activity.activity_url,
    type: 'activity',
    dateStart: new Date(activity.active_start.replace(/\s/, 'T')).toISOString()
  }));
};
const changeClubsToExperiences = clubs => {
  return clubs.map(club => ({
    ...experience,
    name: club.club_name,
    position: club.position,
    semester: `${club.syear}-${club.sem}`,
    type: 'activity',
    dateStart: semesterToDate(`${club.syear}-${club.sem}`).toISOString()
  }));
};
const changeCoursesToExperiences = courses => {
  return courses.map(course => ({
    ...experience,
    name: course.course_name,
    semester: `${course.syear}-${course.sem}`,
    link: course.course_url,
    coreAbilities: Object.values(course.core_abilities).join('、'),
    type: 'course',
    dateStart: semesterToDate(`${course.syear}-${course.sem}`).toISOString()
  }));
};
const filterDuplicateActivity = activities => {
  const record = new Set();
  const res = [];
  activities.forEach(activity => {
    if (!record.has(activity.activity_name)) {
      res.push(activity);
      record.add(activity.activity_name);
    }
  });
  return res;
};

export default experiences;
