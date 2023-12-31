import {StyleSheet, View} from "react-native";
import HeroSection from "../components/HeroSection";
import Menu from "../components/menu";

export default function Home() {
    return (<View style={styles.container}>
        <HeroSection/>
        <Menu/>
    </View>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: "#fff",
    },
});
