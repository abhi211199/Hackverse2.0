import React, { useCallback, useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import CourseItem from "../../components/CourseItem";
import * as learnActions from "../../store/actions/Learn";

const CoursesScreen = (props) => {
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

    const data = useSelector((state) => state.learn.completedCourses);

    const onClickHandler = (data) => {
        props.navigation.navigate("CourseDetail", { course: data.item });
    };

    if (data.length === 0) {
        return <View style={styles.screen}>
            <Text>No Completed Courses Found!!</Text>
        </View>;
    }

    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.courseId}
            renderItem={(itemData) => (
                <CourseItem
                    title={itemData.item.title}
                    tags={itemData.item.tags}
                    summary={itemData.item.summary}
                    instructor={itemData.item.instructorId}
                    numberOfStudents={itemData.item.numberOfStudents}
                    onClick={() => onClickHandler(itemData)}
                />
            )}
            style={{
                paddingHorizontal: 10,
                paddingBottom: 30,
                marginTop: 15,
            }}
        />
    );
};

CoursesScreen.navigationOptions = (navData) => {
    const header = navData.navigation.getParam("header");
    return {
        headerTitle: header,
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default CoursesScreen;
