import * as firebase from "firebase";

// Optionally import the services that you want to use
//import "firebase/auth";
//import "firebase/database";
import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBrp9-rGGzjMnd6F5qgmQNDDtWWVxCx2Oo",
    authDomain: "prepup-c39de.firebaseapp.com",
    databaseURL: "https://prepup-c39de.firebaseio.com",
    projectId: "prepup-c39de",
    storageBucket: "prepup-c39de.appspot.com",
    messagingSenderId: "999977673350",
    appId: "1:999977673350:web:3bc9ecf41601a6188b2707",
    measurementId: "G-EBGD20WJM1",
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
