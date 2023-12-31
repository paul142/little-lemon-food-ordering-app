import React from "react";
import {Image, StyleSheet, View} from "react-native";

export default function SplashScreen() {
    return (<View style={styles.container}>
        <Image
          style={styles.logo}
          source={require("../assets/splash.png")}
        />
    </View>);
};

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: "#fff", justifyContent: "center", alignItems: "center",
    }, logo: {
        height: '100%', width: "100%", resizeMode: "contain",
    },
});
