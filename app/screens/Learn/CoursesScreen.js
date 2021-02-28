import React from "react";
import { FlatList, Text, View } from "react-native";

import CourseItem from "../../components/CourseItem";

const CoursesScreen = (props) => {
    const data = props.navigation.getParam("data");

    const onClickHandler = (data) => {
        props.navigation.navigate("CourseDetail", { course: data.item });
    };

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

export default CoursesScreen;
