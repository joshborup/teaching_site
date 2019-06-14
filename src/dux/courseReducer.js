const INITIAL_STATE = {
  courses: []
};

const SET_COURSES = "SET_COURSES";

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_COURSES:
      return {
        ...state,
        courses: action.payload
      };
    default:
      return state;
  }
};

export function setCourse(courses) {
  return {
    type: SET_COURSES,
    payload: courses
  };
}
