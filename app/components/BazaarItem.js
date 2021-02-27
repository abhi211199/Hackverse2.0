import React from "react";
import {
    Image,
    StyleSheet,
    Text,
    TouchableNativeFeedback,
    View,
} from "react-native";

import Colors from "../constants/Colors";

const BazaarItem = (props) => {
    return (
        <View style={styles.card}>
            <TouchableNativeFeedback onPress={() => {}} useForeground>
                <View>
                    <View style={styles.imageContainer}>
                        <Image
                            source={{
                                uri:
                                    "https://images-na.ssl-images-amazon.com/images/I/616bhfyXimL._SL1500_.jpg",
                            }}
                            style={styles.image}
                            resizeMode="contain"
                        />
                    </View>
                    <View style={styles.title}>
                        <Text style={styles.titleText} numberOfLines={2}>
                            OnePlus Bullets Wireless Z in-Ear Bluetooth
                            Earphones with Mic (Black)
                        </Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: "100%",
        height: 250,
        backgroundColor: "white",
        borderRadius: 10,
        overflow: "hidden",
        elevation: 3,
    },
    imageContainer: {
        width: "100%",
        height: 175,
    },
    image: {
        height: 175,
    },
    title: {
        height: 75,
        paddingHorizontal: 10,
        justifyContent: "center",
    },
    titleText: {
        fontFamily: "montserrat-bold",
        fontSize: 20,
        color: Colors.primary,
    },
});

export default BazaarItem;
