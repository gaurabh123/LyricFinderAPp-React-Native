import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const CustomButton = ({ onPress, title }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 28,
  },
});

export default CustomButton;
