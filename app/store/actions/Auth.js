export const SET_PROFILE = "SET_PROFILE";

export const fetchUser = (user) => {
    return async (dispatch) => {
        try {
            // console.log("user", user);
            const requestBody = {
                uid: user.uid,
                name: user.providerData[0].displayName,
                email: user.providerData[0].email,
            };
            const response = await fetch(
                "https://prepup-api.herokuapp.com/fetchProfile",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestBody),
                }
            );
            const resData = await response.json();
            // console.log(resData);
            var coursesCompleted = [];
            var coursesIncomplete = [];
            var coursesUploaded = [];
            if (resData !== "profile created") {
                coursesCompleted = resData.coursesCompleted;
                coursesIncomplete = resData.coursesIncomplete;
                coursesUploaded = resData.coursesUploaded;
            }
            dispatch({
                type: SET_PROFILE,
                name: resData.name,
                email: resData.email,
                avatar: user.providerData[0].photoURL,
                coursesCompleted: coursesCompleted,
                coursesIncomplete: coursesIncomplete,
                coursesUploaded: coursesUploaded,
                pepCoins: resData.prepCoins,
                uid: user.uid,
                userObject: user,
            });
        } catch (err) {
            throw err;
        }
    };
};
