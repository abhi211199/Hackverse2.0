import React, { useContext, useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Platform,
    StyleSheet,
    ScrollView,
} from "react-native";
import { useDispatch } from "react-redux";

import FormInput from "../../components/Login/FormInput";
import FormButton from "../../components/Login/FormButton";
import SocialButton from "../../components/Login/SocialButton";
import { login, GoogleAuthF } from "../../navigation/AuthProvider";
import * as authActions from "../../store/actions/Auth";
import * as firebase from "firebase";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const dispatch = useDispatch();

    // const {login} = useContext(AuthContext);
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = firebase
            .auth()
            .onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) return null;

    if (user) {
        dispatch(authActions.fetchUser(user));
        navigation.navigate("App");
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image
                source={require("../../assets/prepup_logo_3.png")}
                style={styles.logo}
            />
            {/* <Text style={styles.text}>PrepUP</Text> */}

            <FormInput
                labelValue={email}
                onChangeText={(userEmail) => setEmail(userEmail)}
                placeholderText="Email"
                iconType="user"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />

            <FormInput
                labelValue={password}
                onChangeText={(userPassword) => setPassword(userPassword)}
                placeholderText="Password"
                iconType="lock"
                secureTextEntry={true}
            />

            <FormButton
                buttonTitle="Sign In"
                onPress={() => login(email, password)}
            />

            <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
                <Text style={styles.navButtonText}>Forgot Password?</Text>
            </TouchableOpacity>

            {Platform.OS === "android" ? (
                <View>
                    <SocialButton
                        buttonTitle="Sign In with Facebook"
                        btnType="facebook"
                        color="#4867aa"
                        backgroundColor="#e6eaf4"
                        // onPress={() => fbLogin()}
                    />

                    <SocialButton
                        buttonTitle="Sign In with Google"
                        btnType="google"
                        color="#de4d41"
                        backgroundColor="#f5e7ea"
                        onPress={() => GoogleAuthF()}
                    />
                </View>
            ) : null}

            <TouchableOpacity
                style={styles.forgotButton}
                onPress={() => navigation.navigate("SignUp")}
            >
                <Text style={styles.navButtonText}>
                    Don't have an acount? Create here
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    logo: {
        height: 150,
        width: 150,
        resizeMode: "cover",
    },
    text: {
        fontFamily: "Kufam-SemiBoldItalic",
        fontSize: 28,
        marginBottom: 10,
        color: "#051d5f",
    },
    navButton: {
        marginTop: 15,
    },
    forgotButton: {
        marginVertical: 35,
    },
    navButtonText: {
        fontSize: 18,
        fontWeight: "500",
        color: "#2e64e5",
        fontFamily: "montserrat",
    },
});
