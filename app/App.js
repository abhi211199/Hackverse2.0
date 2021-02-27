import React, { useState } from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import { enableScreens } from "react-native-screens";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

import learnReducer from "./store/reducers/Learn";
import authReducer from "./store/reducers/Auth";
import teachReducer from "./store/reducers/Teach";
import MainNavigator from "./navigation/Navigator";
import NavigationContainer from "./navigation/NavigationContainer";

import * as firebase from 'firebase';
import apiKeys from './keys';

const rootReducer = combineReducers({
    learn: learnReducer,
    auth: authReducer,
    teach: teachReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

enableScreens();

const fetchFonts = () => {
    return Font.loadAsync({
        montserrat: require("./assets/fonts/Montserrat-Regular.ttf"),
        "montserrat-bold": require("./assets/fonts/Montserrat-Bold.ttf"),
        pacifico: require("./assets/fonts/Pacifico-Regular.ttf"),
    });
};

export default function App() {
    if (!firebase.apps.length) {
        console.log('Connected with Firebase')
        firebase.initializeApp(apiKeys.firebaseConfig);
      }
      else
      {
          console.log("already connected with firebase!");
      }
    const [fontLoaded, setFontLoaded] = useState(false);

    if (!fontLoaded) {
        return (
            <AppLoading
                startAsync={fetchFonts}
                onFinish={() => {
                    setFontLoaded(true);
                }}
                onError={(err) => console.log(err)}
            />
        );
    }

    return (
        <Provider store={store}>
            <NavigationContainer />
        </Provider>
    );
}
