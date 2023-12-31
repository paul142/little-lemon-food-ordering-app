import {StyleSheet, View} from "react-native";
import HeroSection from "../components/HeroSection";
import Testimonials from "../components/testimonials";
import OnboardingSection from "../components/onboardingSection";

export default function Onboarding(props) {
  return (<View style={styles.container}>
    <HeroSection/>
    <Testimonials/>
    <OnboardingSection navigation={props.navigation}/>
  </View>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: "#fff",
  },
});
