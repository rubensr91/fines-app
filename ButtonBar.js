import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ButtonBar = () => {
  const navigation = useNavigation();

  const buttons = [
    { label: "Fines", onPress: () => navigation.navigate("Dashboard") },
    { label: "Home", onPress: () => navigation.navigate("Dashboard") },
    { label: "Logout", onPress: () => navigation.navigate("Login") },
  ];

  return (
    <View style={styles.container}>
      {buttons.map((button, index) => (
        <TouchableOpacity
          key={index}
          onPress={button.onPress}
          style={styles.button}
        >
          <Text style={styles.label}>{button.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#1F3447",
    paddingVertical: 10,
  },
  button: {
    backgroundColor: "#002444",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  label: {
    color: "#B8B8B8",
    fontWeight: "bold",
    fontSize: 15
  },
});

export default ButtonBar;
