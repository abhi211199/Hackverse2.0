import React, { useEffect, useRef } from "react";
import { NavigationActions } from "react-navigation";
import { useDispatch, useSelector } from "react-redux";
import * as firebase from "firebase";

import MainNavigator from "./Navigator";
import * as authActions from "../store/actions/Auth";
import "../firebase";

const NavigationContainer = (props) => {
    const navRef = useRef();
    const uid = useSelector((state) => state.auth.uid);

    const dispatch = useDispatch();

    useEffect(() => {
        if (uid === "") {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    console.log("USER", user);
                    dispatch(authActions.fetchUser(user));
                }
            });
        }
    }, [uid, dispatch]);

    return <MainNavigator ref={navRef} />;
};

export default NavigationContainer;
