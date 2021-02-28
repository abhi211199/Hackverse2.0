import React, { useCallback, useEffect } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableNativeFeedback,
    View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";

import CourseItem from "../../components/CourseItem";
import Colors from "../../constants/Colors";
import * as teachActions from "../../store/actions/Teach";

const TeachMainScreen = (props) => {
    const uploadedCourses = useSelector((state) => state.teach.uploadedCourses);

    const dispatch = useDispatch();

    const loadUploadedCourses = useCallback(async () => {
        try {
            await dispatch(teachActions.fetchUploadedCourses());
        } catch (err) {
            console.log(err);
        }
    }, [dispatch]);

    useEffect(() => {
        loadUploadedCourses();
    }, [dispatch, loadUploadedCourses]);

    if (uploadedCourses.length === 0) {
        return (
            <View style={styles.screen}>
                <Text>No Course Uploaded</Text>
                <View style={styles.addButtonBar}>
                    <View style={styles.addButton}>
                        <TouchableNativeFeedback
                            onPress={() => {
                                props.navigation.navigate("AddCourse");
                            }}
                        >
                            <View style={styles.addButtonData}>
                                <MaterialIcons
                                    name="add"
                                    size={40}
                                    color="white"
                                />
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            <FlatList
                data={uploadedCourses}
                keyExtractor={(item) => item.courseId}
                renderItem={(itemData) => (
                    <CourseItem
                        title={itemData.item.title}
                        tags={itemData.item.tags}
                        summary={itemData.item.summary}
                        instructor={itemData.item.instructorId}
                        numberOfStudents={itemData.item.numberOfStudents}
                        status={itemData.item.status}
                        onClick={() => {}}
                    />
                )}
                style={{
                    paddingHorizontal: 10,
                    paddingBottom: 30,
                    marginTop: 15,
                }}
            />
            <View style={styles.addButtonBar}>
                <View style={styles.addButton}>
                    <TouchableNativeFeedback
                        onPress={() => {
                            props.navigation.navigate("AddCourse");
                        }}
                    >
                        <View style={styles.addButtonData}>
                            <MaterialIcons name="add" size={40} color="white" />
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </View>
        </View>
    );
};

TeachMainScreen.navigationOptions = (navData) => {
    return {
        headerTitle: "Teach",
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    addButtonBar: {
        // width: "100%",
        height: 50,
        bottom: 10,
        position: "absolute",
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingRight: 10,
        right: 0,
    },
    addButton: {
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: Colors.accent,
        overflow: "hidden",
    },
    addButtonData: {
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
});

export default TeachMainScreen;
