import { useRoute } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import ButtonBar from "./ButtonBar";

const FineDetail = () => {
  const route = useRoute();
  const fine = route.params.fine;

  return (
    <View style={styles.dashboard}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleFine}>{fine.description}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.text}>{fine.date}</Text>
          <Text style={styles.label}>Amount:</Text>
          <Text style={styles.text}>{fine.amount} SAR</Text>
        </View>
      </View>
      <ButtonBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F3447",
    paddingHorizontal: 20,
    paddingVertical: 30,
    paddingTop: 80,
  },
  titleContainer: {
    borderBottomWidth: 2,
    borderBottomColor: "#ddd",
    paddingBottom: 10,
    marginBottom: 20,
  },
  titleFine: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#B8B8B8",
  },
  infoContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#B8B8B8",
    marginTop: 20,
  },
  text: {
    fontSize: 22,
    color: "#B8B8B8",
    marginBottom: 10,
  },
  dashboard: {
    flex: 1,
    paddingHorizontal: 0,
  },
});

export default FineDetail;
