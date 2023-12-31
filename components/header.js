import React from "react";
import {Image, StyleSheet, View} from "react-native";

export default function Header({navigation}) {
    return (<View>
        <Image
          style={{width: 150, height: 38}}
          source={require("../assets/logo-header.png")}
        />
    </View>);
};

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: "#fff", justifyContent: "center", alignItems: "center",
    }, logo: {
        height: 'auto', width: "auto", resizeMode: "contain",
    },
});
