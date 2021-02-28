import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import { useSelector } from "react-redux";

import Colors from "../../constants/Colors";

import * as firebase from "firebase";
import {logOut} from '../../navigation/AuthProvider';

const ProfileScreen = ({navigation}) => {
    const userName = useSelector((state) => state.auth.name);
    const email = useSelector((state) => state.auth.email);
    const pepCoins = useSelector((state) => state.auth.pepCoins);
    const coursesCompleted = useSelector(
        (state) => state.auth.coursesCompleted.length
    );
    const coursesIncomplete = useSelector(
        (state) => state.auth.coursesIncomplete.length
    );
    const avatar = useSelector((state) => state.auth.avatar);

    return (
        <View style={styles.screen}>
            <ScrollView>
                <View style={styles.userDetails}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: avatar }}
                            style={styles.image}
                            resizeMode="cover"
                        />
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.name}>{userName}</Text>
                        <Text style={styles.email}>{email}</Text>
                    </View>
                </View>
                <View style={styles.learnContainer}>
                    <Text style={styles.heading}>Learn</Text>
                    <View style={styles.dataContainer}>
                        <View style={styles.dataCombo}>
                            <Text style={styles.label}>
                                Number of Courses Completed
                            </Text>
                            <Text style={styles.textValue}>
                                {coursesCompleted}
                            </Text>
                        </View>
                        <View style={styles.dataCombo}>
                            <Text style={styles.label}>
                                Number of Pending Courses
                            </Text>
                            <Text style={styles.textValue}>
                                {coursesIncomplete}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.learnContainer}>
                    <Text style={styles.heading}>Teach</Text>
                    <View style={styles.dataContainer}>
                        <View style={styles.dataCombo}>
                            <Text style={styles.label}>
                                Number of Courses Uploaded
                            </Text>
                            <Text style={styles.textValue}>
                                {coursesCompleted}
                            </Text>
                        </View>
                        <View style={styles.dataCombo}>
                            <Text style={styles.label}>
                                Number of Courses Accepted
                            </Text>
                            <Text style={styles.textValue}>
                                {coursesIncomplete}
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.logoutContainer}>
                <View style={styles.button}>
                    <TouchableNativeFeedback onPress={() => logOut().then(()=>navigation.navigate("Login"))}>
                        <View style={styles.buttonMain}>
                            <Text style={styles.logoutText}>Logout</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 15,
    },
    userDetails: {
        marginVertical: 30,
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
    },
    imageContainer: {
        height: 100,
        width: 100,
        borderRadius: 50,
        overflow: "hidden",
    },
    image: {
        height: "100%",
        width: "100%",
    },
    detailsContainer: {
        marginLeft: 30,
    },
    name: {
        fontFamily: "montserrat-bold",
        fontSize: 25,
    },
    email: {
        fontFamily: "montserrat",
        fontSize: 15,
    },
    heading: {
        fontFamily: "pacifico",
        fontSize: 20,
    },
    dataContainer: {
        width: "100%",
        padding: 15,
        borderRadius: 10,
        borderWidth: 4,
        borderColor: Colors.primaryLight,
    },
    dataCombo: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "baseline",
    },
    label: {
        fontFamily: "montserrat",
        fontSize: 15,
    },
    textValue: {
        fontFamily: "montserrat-bold",
        fontSize: 20,
        color: Colors.accent,
    },
    logoutContainer: {
        width: "100%",
        bottom: 0,
        alignItems: "flex-end",
        justifyContent: "center"
    },
    logoutText: {
        color: "white",
        fontFamily: "montserrat-bold",
        fontSize: 20
    },
    button: {
        height: 50,
        width: 150,
        backgroundColor: Colors.accent,
        borderRadius: 10,
        overflow: "hidden"
    },
    buttonMain: {
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    }
});

export default ProfileScreen;
