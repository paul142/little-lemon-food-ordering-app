import {StyleSheet, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";

export default function HeaderBeckBtn(props, {navigation}) {
    return (
        <TouchableOpacity
            onPress={props.navigation.goBack}
            style={[styles.btn]}
        >
            <Ionicons
                name="arrow-back-outline"
                size={20}
                color="#fff"
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: '#495e57',
        borderWidth: 0,
        borderRadius: 25,
        padding: 5
    },
});
