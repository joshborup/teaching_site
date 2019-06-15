const INITIAL_STATE = {
  user: {}
};

const SET_USER = "SET_USER";
const SET_USER_SAVED_COURSES = "SET_USER_SAVED_COURSES";

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload
      };
    case SET_USER_SAVED_COURSES:
      return {
        ...state,
        user: {
          ...state.user,
          saved_courses: action.payload
        }
      };
    default:
      return state;
  }
};

export function setUser(user) {
  return {
    type: SET_USER,
    payload: user
  };
}

export function setSavedCourses(courses) {
  return {
    type: SET_USER_SAVED_COURSES,
    payload: courses
  };
}
