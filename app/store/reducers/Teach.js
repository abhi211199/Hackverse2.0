import { SET_TEACHING_COURSES } from "../actions/Teach";

const initialState = {
    uploadedCourses: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_TEACHING_COURSES:
            return {
                ...state,
                uploadedCourses: action.uploadedCourses
            };

        default:
            return state;
    }
};
