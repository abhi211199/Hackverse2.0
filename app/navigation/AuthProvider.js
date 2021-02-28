import React, { createContext, useState } from "react";
import auth from "@react-native-firebase/auth";
// import { GoogleSignin } from '@react-native-community/google-signin';
import * as GoogleSignIn from "expo-google-sign-in";
import * as Google from "expo-google-app-auth";

import { LoginManager, AccessToken } from "react-native-fbsdk";
import "../firebase";
import * as firebase from "firebase";

// export const AuthContext = createContext();

// export const AuthProvider = ({children}) => {
//   const [user, setUser] = useState(null);

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         setUser,
//         login: async (email, password) => {
//           try {
//             await auth().signInWithEmailAndPassword(email, password);
//           } catch (e) {
//             console.log(e);
//           }
//         },
//         // googleLogin: async () => {
//         //   try {
//         //     // Get the users ID token
//         //     const { idToken } = await GoogleSignin.signIn();

//         //     // Create a Google credential with the token
//         //     const googleCredential = auth.GoogleAuthProvider.credential(idToken);

//         //     // Sign-in the user with the credential
//         //     await auth().signInWithCredential(googleCredential);
//         //   } catch(error) {
//         //     console.log({error});
//         //   }
//         // },
//         // fbLogin: async () => {
//         //   try {
//         //     // Attempt login with permissions
//         //     const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

//         //     if (result.isCancelled) {
//         //       throw 'User cancelled the login process';
//         //     }

//         //     // Once signed in, get the users AccesToken
//         //     const data = await AccessToken.getCurrentAccessToken();

//         //     if (!data) {
//         //       throw 'Something went wrong obtaining access token';
//         //     }

//         //     // Create a Firebase credential with the AccessToken
//         //     const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

//         //     // Sign-in the user with the credential
//         //     await auth().signInWithCredential(facebookCredential);
//         //   } catch(error) {
//         //     console.log({error});
//         //   }
//         // },
//         register: async (email, password) => {
//           try {
//             await auth().createUserWithEmailAndPassword(email, password);
//           } catch (e) {
//             console.log(e);
//           }
//         },
//         logout: async () => {
//           try {
//             await auth().signOut();
//           } catch (e) {
//             console.log(e);
//           }
//         },
//       }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

export async function login(email, password) {
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        const currentUser = firebase.auth().currentUser;
    } catch (e) {
        console.log(e);
    }
}

export async function logOut() {
    console.log("logout!");
    try {
        await firebase.auth().signOut();
        return;
        // navigation.navigate("Login");
    } catch (err) {
        console.log("There is something wrong!", err.message);
    }
}

export async function register(email, password) {
    try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const currentUser = firebase.auth().currentUser;
        console.log(currentUser);
    } catch (e) {
        console.log(e);
    }
}

export async function GoogleAuthF() {
    const result = await Google.logInAsync({
        androidClientId:
            "999977673350-lgpr6j4kt83n84rcrtdgritkuiep7mgp.apps.googleusercontent.com",
        androidStandaloneAppClientId:
            "999977673350-lgpr6j4kt83n84rcrtdgritkuiep7mgp.apps.googleusercontent.com",
        behavior: "web",
        scopes: ["email"],
    });

    if (result.type === "success") {
        /* `accessToken` is now valid and can be used to get data from the Google API with HTTP requests */
        // console.log(user);
        onSignIn(result);
        // return user;
        return result;
    }
}

function onSignIn(googleUser) {
    console.log("Google Auth Response", googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(
        function (firebaseUser) {
            unsubscribe();
            // Check if we are already signed-in Firebase with the correct user.
            if (!isUserEqual(googleUser, firebaseUser)) {
                // Build Firebase credential with the Google ID token.
                var credential = firebase.auth.GoogleAuthProvider.credential(
                    googleUser.idToken,
                    googleUser.accessToken
                );
                // Sign in with credential from the Google user.
                firebase.auth().signInWithCredential(credential);
            } else {
                console.log("User already signed-in Firebase.");
            }
        }.bind(this)
    );
}

const isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
        var providerData = firebaseUser.providerData;
        for (var i = 0; i < providerData.length; i++) {
            if (
                providerData[i].providerId ===
                    firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                providerData[i].uid === googleUser.getBasicProfile().getId()
            ) {
                // We don't need to reauth the Firebase connection.
                return true;
            }
        }
    }
    return false;
};
