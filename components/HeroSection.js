import React from "react";
import {Image, StyleSheet, Text, View} from "react-native";

export default function HeroSection() {
  return (
    <View style={styles.heroSection}>
      <Text style={styles.heroH1}>Little Lemon</Text>
      <View style={styles.heroWrapper}>
        <View style={styles.heroContent}>
          <Text style={styles.heroH2}>Chicago</Text>
          <Text style={styles.heroText}>We are a family owned Mediterranean restaurant, focused on traditional recipes
            served with a modern
            twist.</Text>
        </View>
        <Image
          style={styles.heroImage}
          source={require("../assets/restauranfood.png")}
          accessible={true}
          accessibilityLabel={"Little Lemon Food"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heroSection: {
    backgroundColor: "#495e57",
    padding: 15,
    paddingTop: 5,
  },
  heroWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
    padding: 0
  },
  heroH1: {
    color: "#f4ce14",
    fontSize: 56,
    fontFamily: "MarkaziText-Medium",
    margin: 0,
    padding: 0
  },
  heroH2: {
    color: "#fff",
    fontSize: 30,
    fontFamily: "MarkaziText-Medium",
    margin: 0,
    padding: 0
  },
  heroText: {
    color: "#fff",
    fontFamily: "Karla-Medium",
    fontSize: 16,
  },
  heroContent: {
    flex: 1,
    paddingRight: 10,
    paddingBottom: 10
  },
  heroImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
});
