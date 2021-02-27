import { SET_PROFILE } from "../actions/Auth";

const initialState = {
    avatar:
        "https://www.kindpng.com/picc/m/22-223941_transparent-avatar-png-male-avatar-icon-transparent-png.png",
    coursesCompleted: [],
    coursesIncomplete: [],
    coursesUploaded: [],
    name: "",
    email: "",
    pepCoins: 1000,
    uid: "",
    userObject: {},
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PROFILE:
            return {
                ...state,
                avatar: action.avatar,
                coursesCompleted: action.coursesCompleted,
                coursesIncomplete: action.coursesIncomplete,
                coursesUploaded: action.coursesUploaded,
                name: action.name,
                email: action.email,
                pepCoins: action.pepCoins,
                uid: action.uid,
                userObject: action.userObject,
            };

        default:
            return state;
    }
};
