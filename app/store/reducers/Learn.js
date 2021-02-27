import { SET_COURSES } from "../actions/Learn";

const initialState = {
    allCourses: [],
    completedCourses: [],
    pendingCourses: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_COURSES:
            return {
                ...state,
                allCourses: action.allCourses,
                completedCourses: action.completedCourses,
                pendingCourses: action.pendingCourses,
            };

        default:
            return state;
    }
};
