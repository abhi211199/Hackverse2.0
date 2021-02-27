export const SET_COURSES = "SET_COURSES";
export const ADD_PENDING_COURSE = "ADD_PENDING_COURSE";
export const ADD_COMPLETED_COURSE = "ADD_COMPLETED_COURSE";

import * as authActions from "./Auth";

import { db } from "../../firebase";

export const fetchCourses = () => {
    return async (dispatch, getState) => {
        const completeList = getState().auth.coursesCompleted;
        const incompleteList = getState().auth.coursesIncomplete;

        try {
            const response = await fetch(
                "https://prepup-api.herokuapp.com/getAllCourses"
            );
            if (!response.ok) {
                console.log("Error");
            }
            const courseData = await response.json();
            const transformedData = [];
            for (const key in courseData) {
                transformedData.push({ ...courseData[key], courseId: key });
            }
            const allCourses = transformedData.filter(
                (data) => data.status === "ACCEPTED"
            );
            const completedCourses = transformedData.filter((data) =>
                completeList.includes(data.courseId)
            );
            const pendingCourses = transformedData.filter((data) =>
                incompleteList.includes(data.courseId)
            );
            dispatch({
                type: SET_COURSES,
                allCourses: allCourses,
                completedCourses: completedCourses,
                pendingCourses: pendingCourses,
            });
        } catch (err) {
            throw err;
        }
    };
};

export const enrollToCourse = (courseId) => {
    return async (dispatch, getState) => {
        const user = getState().auth.userObject;

        try {
            const response = await fetch(
                `https://prepup-api.herokuapp.com/addPendingCourse/${user.uid}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        courseId: courseId,
                    }),
                }
            );
            if (!response.ok) {
                console.log("RESPONSE", response);
            }
            dispatch(authActions.fetchUser(user)).then(() => {
                dispatch(fetchCourses());
            });
        } catch (err) {
            throw err;
        }
    };
};

export const completeCourse = (courseId) => {
    return async (dispatch, getState) => {
        const user = getState().auth.userObject;

        try {
            const response = await fetch(
                `https://prepup-api.herokuapp.com/addCompletedCourse/${user.uid}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        courseId: courseId,
                        pepCoins: 100
                    }),
                }
            );
            if (!response.ok) {
                console.log("RESPONSE", response);
            }
            dispatch(authActions.fetchUser(user)).then(() => {
                dispatch(fetchCourses());
            });
        } catch (err) {
            throw err;
        }
    };
};
