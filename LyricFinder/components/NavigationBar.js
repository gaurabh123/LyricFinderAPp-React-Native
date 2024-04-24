import React from "react";
import { Text, SafeAreaView, StyleSheet } from "react-native";

const NavigationBar = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.navbarText}>Lyrics Finder</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#212529",
  },
  navbarText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    padding: 20,
  },
});

export default NavigationBar;