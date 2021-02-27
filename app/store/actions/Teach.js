export const SET_TEACHING_COURSES = "SET_TEACHING_COURSES";

import { db } from "../../firebase";

export const fetchUploadedCourses = () => {
    return async (dispatch, getState) => {
        const completeList = getState().auth.coursesUploaded;

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
            const uploadedCourses = transformedData.filter((data) =>
                completeList.includes(data.courseId)
            );
            dispatch({
                type: SET_TEACHING_COURSES,
                uploadedCourses: uploadedCourses,
            });
        } catch (err) {
            throw err;
        }
    };
};
