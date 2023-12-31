import {Image, StyleSheet, Text, TouchableOpacity} from "react-native";
import React from "react";

export default function HeaderRightBox(props) {
    return (<TouchableOpacity
        onPress={() => props.navigation.navigate('Profile')}
        style={[styles.btn]}
    >
        {(!props?.profile?.image) ?
            <Text style={styles.btnText}>{props?.profile?.firstName[0]}{props?.profile?.lastName[0]}</Text> : <Image
                style={styles.btnImg}
                source={{uri: props?.profile?.image}}
                accessible={true}
            />}
    </TouchableOpacity>);
}

const styles = StyleSheet.create({
    btn: {
        alignItems: "center",
        width: 30,
        height: 30,
        backgroundColor: '#495e57',
        borderWidth: 0,
        borderRadius: 25,
        padding: 5
    }, btnText: {
        color: '#ffffff', fontFamily: "Karla-Bold", fontSize: 14,
    }, btnImg: {
        width: 30, height: 30, borderWidth: 0, borderRadius: 25,
    }
});
