import React from "react";
import { StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import Colors from "../constants/Colors";

const CourseItem = (props) => {
    return (
        <View
            style={{ ...styles.card, ...{ height: props.status ? 140 : 125 } }}
        >
            <TouchableNativeFeedback onPress={props.onClick}>
                <View style={styles.dataContainer}>
                    <Text style={styles.title}>{props.title}</Text>
                    {/* <View style={styles.infoContainer}>
                        <Text style={styles.label}>Tags</Text>
                        <Text style={styles.data}>{props.tags}</Text>
                    </View> */}
                    <View
                        style={{
                            ...styles.infoContainer,
                            ...{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "baseline"
                            },
                        }}
                    >
                        <Text style={styles.label}>
                            Number of students enrolled:
                        </Text>
                        <Text style={styles.dataBold}>
                            {props.numberOfStudents}
                        </Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.data} numberOfLines={2}>{props.summary}</Text>
                    </View>
                    {props.status ? (
                        <View
                            style={{
                                ...styles.infoContainer,
                                ...{ alignItems: "flex-end" },
                            }}
                        >
                            <Text
                                style={{
                                    ...styles.dataBold,
                                    ...{
                                        color:
                                            props.status === "ACCEPTED"
                                                ? Colors.primary
                                                : Colors.accent,
                                    },
                                }}
                            >
                                {props.status}
                            </Text>
                        </View>
                    ) : null}
                </View>
            </TouchableNativeFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: "100%",
        elevation: 3,
        backgroundColor: "white",
        marginBottom: 15,
        borderRadius: 10,
        overflow: "hidden",
    },
    dataContainer: {
        width: "100%",
        height: "100%",
        padding: 15,
    },
    title: {
        fontSize: 20,
        fontFamily: "montserrat-bold",
    },
    label: {
        fontSize: 11,
        fontFamily: "montserrat",
    },
    infoContainer: {
        marginTop: 5,
    },
    data: {
        fontSize: 15,
        fontFamily: "montserrat",
    },
    dataBold: {
        fontSize: 15,
        fontFamily: "montserrat-bold",
    },
});

export default CourseItem;
