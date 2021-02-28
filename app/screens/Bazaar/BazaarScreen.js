import React from "react";
import { StyleSheet, Text, View } from "react-native";

import BazaarItem from "../../components/BazaarItem";

const BazaarScreen = (props) => {
    return (
        <View style={styles.screen}>
            <BazaarItem />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
});

export default BazaarScreen;
