import {StyleSheet, Text, View} from "react-native";

export default function LogIn({navigation}) {
    return (<View style={styles.container}>
        <Text>Log In</Text>
    </View>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: "#fff", justifyContent: "center", alignItems: "center",
    },
});
