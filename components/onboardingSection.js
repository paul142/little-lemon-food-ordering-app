import {Pressable, StyleSheet, Text, View} from "react-native";

export default function OnboardingSection(props) {
    return (<View style={styles.onboarding}>
        <Text style={styles.onboardingH1}>
            Are you Hungry?
        </Text>
        <View style={styles.btnBox}>
            <Pressable
                style={[styles.btn, styles.btnDark]}
                onPress={() => props.navigation.navigate("LogIn")}
            >
                <Text style={[styles.btnText, styles.btnTextDark]}>Log In</Text>
            </Pressable>
            <Pressable
                style={[styles.btn]}
                onPress={() => props.navigation.navigate("SignUp")}
            >
                <Text style={[styles.btnText]}>Sign Up</Text>
            </Pressable>
        </View>
    </View>);
}

const styles = StyleSheet.create({
    onboarding: {
        flex: 1, backgroundColor: "#f4ce14", justifyContent: "center", alignItems: "center",
    }, onboardingH1: {
        fontSize: 28, fontFamily: "Karla-Medium", paddingBottom: 15,
    }, btnBox: {
        flexDirection: "row", justifyContent: "center", alignItems: "center",
    }, btn: {
        margin: 5,
        width: 130,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#495e57',
        color: '#495e57',
        backgroundColor: "#ffffff",
        alignItems: "center",
    }, btnDark: {
        color: "#ffffff", backgroundColor: '#495e57',
    }, btnText: {
        fontFamily: "Karla-Medium", fontSize: 16,
    }, btnTextDark: {
        color: "#ffffff",
    }
});
