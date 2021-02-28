import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import LearnMainScreen from "../screens/Learn/LearnMainScreen";
import CoursesScreen from "../screens/Learn/CoursesScreen";
import AllCoursesScreen from "../screens/Learn/AllCoursesScreen";
import PendingCoursesScreen from "../screens/Learn/PendingCoursesScreen";
import CompletedCoursesScreen from "../screens/Learn/CompletedCoursesScreen";
import CourseDetailScreen from "../screens/Learn/CourseDetailScreen";
import TeachMainScreen from "../screens/Teach/TeachMainScreen";
import UploadedCourseDetailScreen from "../screens/Teach/UploadedCourseDetailScreen";
import AddCourseScreen from "../screens/Teach/AddCourseScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import BazaarScreen from "../screens/Bazaar/BazaarScreen";
import Colors from "../constants/Colors";

import Onboarding from "../screens/Onboarding/onboarding";
import LoginScreen from "../screens/Login/LoginScreen";
import SignUpScreen from "../screens/Login/SignupScreen";
import AddQuiz from "../screens/Teach/AddQuiz";

const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: Colors.primary,
    },
    headerTintColor: "white",
    headerTitleStyle: {
        fontFamily: "montserrat-bold",
    },
};

const LearnNavigator = createStackNavigator(
    {
        LearnMain: LearnMainScreen,
        Courses: CoursesScreen,
        CourseDetail: CourseDetailScreen,
        AllCourses: AllCoursesScreen,
        CompletedCourses: CompletedCoursesScreen,
        PendingCourses: PendingCoursesScreen,
    },
    {
        defaultNavigationOptions: defaultStackNavOptions,
    }
);

const TeachNavigator = createStackNavigator(
    {
        TeachMain: TeachMainScreen,
        UploadedCourseDetail: UploadedCourseDetailScreen,
        AddCourse: AddCourseScreen,
        AddQuiz: AddQuiz
    },
    {
        defaultNavigationOptions: defaultStackNavOptions,
    }
);

const ProfileNavigator = createStackNavigator(
    {
        Profile: ProfileScreen,
    },
    {
        defaultNavigationOptions: defaultStackNavOptions,
    }
);

const BazaarNavigator = createStackNavigator(
    {
        Bazaar: BazaarScreen,
    },
    {
        defaultNavigationOptions: defaultStackNavOptions,
    }
);

const tabScreenConfig = {
    Learn: {
        screen: LearnNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return (
                    <FontAwesome
                        name="graduation-cap"
                        size={20}
                        color={tabInfo.tintColor}
                    />
                );
            },
            tabBarColor: "white",
            tabBarLabel: "Learn",
        },
    },
    Teach: {
        screen: TeachNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return (
                    <FontAwesome
                        name="building"
                        size={20}
                        color={tabInfo.tintColor}
                    />
                );
            },
            tabBarColor: "white",
            tabBarLabel: "Teach",
        },
    },
    Profile: {
        screen: ProfileNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return (
                    <FontAwesome
                        name="user-circle"
                        size={20}
                        color={tabInfo.tintColor}
                    />
                );
            },
            tabBarColor: "white",
            tabBarLabel: "Profile",
        },
    },
    Bazaar: {
        screen: BazaarNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return (
                    <FontAwesome
                        name="shopping-bag"
                        size={20}
                        color={tabInfo.tintColor}
                    />
                );
            },
            tabBarColor: "white",
            tabBarLabel: "Bazaar",
        },
    },
};

const MainNavigator = createMaterialBottomTabNavigator(tabScreenConfig, {
    activeColor: Colors.primary,
    shifting: true,
    inactiveColor: Colors.primaryLight,
});

const PreNavigator = createSwitchNavigator(
    {
        Onboard: Onboarding,
        Login: LoginScreen,
        SignUp: SignUpScreen,
        AddQuiz: AddQuiz,
        App: MainNavigator,
    },
    {
        initialRouteName: "Login",
    }
);
export default createAppContainer(PreNavigator);
