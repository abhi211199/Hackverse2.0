import React, { useCallback, useEffect } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableNativeFeedback,
    View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

import Colors from "../../constants/Colors";
import * as learnActions from "../../store/actions/Learn";

const LearnMainScreen = (props) => {
    const allCourses = useSelector((state) => state.learn.allCourses);
    const completedCourses = useSelector(
        (state) => state.auth.coursesCompleted
    );
    const pendingCourses = useSelector((state) => state.auth.coursesIncomplete);
    const userName = useSelector(state => state.auth.name)
    const dispatch = useDispatch();

    const loadCourses = useCallback(async () => {
        try {
            await dispatch(learnActions.fetchCourses());
        } catch (err) {
            console.log(err);
        }
    }, [dispatch]);

    useEffect(() => {
        loadCourses();
    }, [dispatch, loadCourses]);

    return (
        <View style={styles.screen}>
            <ScrollView>
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>Hi, {userName}!</Text>
                </View>
                <View style={styles.summaryContainer}>
                    <View
                        style={{
                            width: "50%",
                            height: 100,
                            paddingHorizontal: 15,
                        }}
                    >
                        <View style={styles.summaryBox}>
                            <View>
                                <Text style={styles.text}>Completed</Text>
                                <Text style={styles.text}>Courses</Text>
                            </View>
                            <View>
                                <Text style={styles.count}>{completedCourses.length}</Text>
                            </View>
                        </View>
                    </View>
                    <View
                        style={{
                            width: "50%",
                            height: 100,
                            paddingHorizontal: 15,
                        }}
                    >
                        <View style={styles.summaryBox}>
                            <View>
                                <Text style={styles.text}>Pending</Text>
                                <Text style={styles.text}>Courses</Text>
                            </View>
                            <View>
                                <Text style={styles.count}>{pendingCourses.length}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.navArea}>
                    <View style={styles.card}>
                        <TouchableNativeFeedback
                            onPress={() => {
                                props.navigation.navigate("AllCourses", {
                                    header: "All Courses",
                                });
                            }}
                        >
                            <View style={styles.dataContainer}>
                                <View>
                                    <Text style={styles.heading}>
                                        View All Courses
                                    </Text>
                                </View>
                                <View>
                                    <MaterialIcons
                                        name="arrow-forward-ios"
                                        size={24}
                                        color={Colors.primary}
                                    />
                                </View>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                    <View style={styles.card}>
                        <TouchableNativeFeedback
                            onPress={() => {
                                props.navigation.navigate("CompletedCourses", {
                                    header: "Completed Courses",
                                });
                            }}
                        >
                            <View style={styles.dataContainer}>
                                <View>
                                    <Text style={styles.heading}>
                                        View Completed Courses
                                    </Text>
                                </View>
                                <View>
                                    <MaterialIcons
                                        name="arrow-forward-ios"
                                        size={24}
                                        color={Colors.primary}
                                    />
                                </View>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                    <View style={styles.card}>
                        <TouchableNativeFeedback
                            onPress={() => {
                                props.navigation.navigate("PendingCourses", {
                                    header: "Pending Courses",
                                });
                            }}
                        >
                            <View style={styles.dataContainer}>
                                <View>
                                    <Text style={styles.heading}>
                                        View Pending Courses
                                    </Text>
                                </View>
                                <View>
                                    <MaterialIcons
                                        name="arrow-forward-ios"
                                        size={24}
                                        color={Colors.primary}
                                    />
                                </View>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

LearnMainScreen.navigationOptions = (navData) => {
    return {
        headerTitle: "PrepUp - Learn",
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    nameContainer: {
        paddingHorizontal: 15,
        marginVertical: 20,
    },
    name: {
        fontSize: 20,
        fontFamily: "montserrat-bold"
    },
    summaryContainer: {
        width: "100%",
        flexDirection: "row",
    },
    summaryBox: {
        width: "100%",
        borderColor: Colors.primaryLight,
        borderWidth: 4,
        height: "100%",
        borderRadius: 10,
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    text: {
        fontSize: 15,
        fontFamily: "montserrat"
    },
    count: {
        fontSize: 40,
        color: Colors.accent,
    },
    navArea: {
        width: "100%",
        paddingHorizontal: 15,
        paddingBottom: 15,
    },
    card: {
        width: "100%",
        height: 75,
        elevation: 3,
        backgroundColor: "white",
        marginTop: 15,
        borderRadius: 10,
        overflow: "hidden",
    },
    dataContainer: {
        width: "100%",
        height: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 15,
    },
    heading: {
        fontSize: 18,
        fontFamily: "montserrat-bold"
    },
});

export default LearnMainScreen;
