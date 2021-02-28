import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    TouchableNativeFeedback,
    TouchableOpacity,
    View,
} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

import Colors from "../../constants/Colors";
import * as learnActions from "../../store/actions/Learn";

const CourseDetailScreen = (props) => {
    const [isLoading, setIsLoading] = useState(false);

    const course = props.navigation.getParam("course");

    const dispatch = useDispatch();

    const isCompleted = useSelector((state) =>
        state.auth.coursesCompleted.includes(course.courseId)
    );
    const isPending = useSelector((state) =>
        state.auth.coursesIncomplete.includes(course.courseId)
    );

    const registerHandler = () => {
        Alert.alert(
            "Enroll to Course?",
            "Are you sure you want to enroll to course?",
            [
                { text: "No", style: "default" },
                {
                    text: "Yes",
                    style: "destructive",
                    onPress: () => {
                        setIsLoading(true);
                        dispatch(learnActions.enrollToCourse(course.courseId))
                            .then(() => {
                                setIsLoading(false);
                                props.navigation.navigate("PendingCourses");
                            })
                            .catch((err) => {
                                setIsLoading(false);
                            });
                    },
                },
            ]
        );
    };

    const markAsCompleteHandler = () => {
        Alert.alert(
            "Mark as Completed?",
            "Are you sure you want to mark the course as completed?",
            [
                { text: "No", style: "default" },
                {
                    text: "Yes",
                    style: "destructive",
                    onPress: () => {
                        setIsLoading(true);
                        dispatch(learnActions.completeCourse(course.courseId))
                            .then(() => {
                                setIsLoading(false);
                                props.navigation.navigate("CompletedCourses");
                            })
                            .catch((err) => {
                                setIsLoading(false);
                            });
                    },
                },
            ]
        );
    };

    return (
        <View style={styles.screen}>
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: "space-between",
                    flexDirection: "column",
                }}
            >
                <View style={{ flex: 1, justifyContent: "flex-start" }}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={{
                                uri:
                                    "https://study.com/cimages/course-image/the-crucible-study-guide_204067_large.jpg",
                            }}
                            style={styles.image}
                        />
                    </View>
                    <View style={styles.dataContainer}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{course.title}</Text>
                        </View>
                        <View>
                            <Text style={styles.summary}>{course.summary}</Text>
                        </View>
                        <View style={{ marginVertical: 10 }}>
                            <Text style={styles.heading}>Resources</Text>
                        </View>
                        {course.links.map((link, key) => (
                            <TouchableOpacity
                                key={key}
                                onPress={() => {
                                    Linking.openURL(link);
                                }}
                            >
                                <View style={styles.resource}>
                                    <Ionicons
                                        name="document-text"
                                        size={24}
                                        color={Colors.primaryLight}
                                    />
                                    <Text style={styles.resourceText}>
                                        Resource {key + 1}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
                <View
                    style={{
                        flex: 1,
                        justifyContent: "flex-end",
                        paddingHorizontal: 30,
                    }}
                >
                    {isPending && !isLoading && (
                        <View style={styles.registerButtonContainer}>
                            <TouchableNativeFeedback
                                onPress={markAsCompleteHandler}
                            >
                                <View style={styles.registerButton}>
                                    <View>
                                        <Text style={styles.registerText}>
                                            Mark as Completed
                                        </Text>
                                    </View>
                                    <View>
                                        <MaterialIcons
                                            name="check-circle"
                                            size={30}
                                            color="white"
                                        />
                                    </View>
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                    )}
                    {!isPending && !isCompleted && !isLoading && (
                        <View style={styles.registerButtonContainer}>
                            <TouchableNativeFeedback onPress={registerHandler}>
                                <View style={styles.registerButton}>
                                    <View>
                                        <Text style={styles.registerText}>
                                            Enroll to course
                                        </Text>
                                    </View>
                                    <View>
                                        <FontAwesome5
                                            name="arrow-right"
                                            size={20}
                                            color="white"
                                        />
                                    </View>
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                    )}
                    {isLoading && (
                        <View
                            style={{
                                ...styles.registerButtonContainer,
                                ...{
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: "transparent",
                                },
                            }}
                        >
                            <ActivityIndicator color={Colors.accent} />
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

CourseDetailScreen.navigationOptions = (navData) => {
    const course = navData.navigation.getParam("course");
    return {
        headerTitle: course.title,
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    imageContainer: {
        width: "100%",
        height: 200,
        backgroundColor: "black",
    },
    dataContainer: {
        width: "100%",
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    title: {
        fontSize: 30,
        fontFamily: "montserrat-bold",
    },
    titleContainer: {
        marginBottom: 15,
    },
    registerButtonContainer: {
        height: 50,
        width: "100%",
        backgroundColor: Colors.accent,
        borderRadius: 25,
        overflow: "hidden",
        marginBottom: 20,
    },
    image: {
        width: "100%",
        height: "100%",
    },
    summary: {
        fontFamily: "montserrat",
        fontSize: 14,
    },
    registerText: {
        fontFamily: "montserrat-bold",
        fontSize: 20,
        color: "white",
    },
    registerButton: {
        height: "100%",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    },
    heading: {
        fontFamily: "pacifico",
        fontSize: 23,
    },
    resource: {
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    resourceText: {
        marginLeft: 10,
        fontSize: 15,
        fontFamily: "montserrat-bold",
        color: Colors.primary,
    },
});

export default CourseDetailScreen;
