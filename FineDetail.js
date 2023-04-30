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
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 30,
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
    color: "#333",
  },
  infoContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
    marginTop: 20,
  },
  text: {
    fontSize: 18,
    color: "#333",
    marginBottom: 10,
  },
  dashboard: {
    flex: 1,
    paddingHorizontal: 0,
  },
  title: {
    alignItems: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  fineContainer: {
    flex: 1,
    paddingHorizontal: 80,
    paddingVertical: 30,
    marginVertical: 5,
    backgroundColor: "#7f8fa6",
    borderRadius: 0,
  },
  fineDescription: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#000",
  },
  fineAmount: {
    fontSize: 14,
    color: "#005",
  },
  fineDate: {
    fontSize: 12,
    color: "#005",
  },
  switchContainer: {
    position: "absolute",
    top: 20,
    right: 20,
  },
});

export default FineDetail;
