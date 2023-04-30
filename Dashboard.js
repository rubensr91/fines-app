import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import ButtonBar from "./ButtonBar";
import i18n from "./i18n";
import { ScrollView } from "react-native-gesture-handler";

const FINES_EN = [
  { id: 1, description: "Speeding", amount: "100.00", date: "2023-01-02" },
  {
    id: 2,
    description: "Disobeying traffic signals",
    amount: "75.00",
    date: "2023-04-12",
  },
];

const FINES_AR = [
  {
    id: 1,
    description: "تجاوز السرعة المسموح بها",
    amount: "100",
    date: "2023-01-02",
  },
  {
    id: 2,
    description: "عدم احترام الإشارة الضوئية",
    amount: "75",
    date: "2023-04-12",
  },
];

const Dashboard = ({ navigation, params }) => {
  const [language, setLanguage] = useState("en-US");
  const { t } = useTranslation();

  const toggleLanguage = () => {
    const newLanguage = language === "en-US" ? "ar-SA" : "en-US";
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);

    AsyncStorage.setItem("language", newLanguage);
  };

  useEffect(() => {
    AsyncStorage.getItem("language")
      .then((value) => {
        if (value) {
          setLanguage(value);
          i18n.changeLanguage(value);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("FineDetail", { fine: item })}
      >
        <View style={styles.fineContainer}>
          <Text style={styles.fineDescription}>{item.description}</Text>
          <Text style={styles.fineDate}>{item.date}</Text>
          <Text style={styles.fineAmount}>{item.amount} SAR</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const fines = language === "en-US" ? FINES_EN : FINES_AR;

  return (
    <View style={styles.dashboard}>
      <View style={styles.switchContainer}>
        <Switch
          value={language === "ar-SA"}
          onValueChange={toggleLanguage}
          thumbColor="#fff"
          trackColor={{ false: "#333", true: "#1F3447" }}
        />
        <Text style={[styles.switchLabel]}>{t("language")}</Text>
      </View>
      <Text style={styles.title}>{t("dashboard.title")}</Text>

      <View style={styles.switchContainer}>
        <Switch
          value={language === "ar-SA"}
          onValueChange={toggleLanguage}
          thumbColor="#fff"
          trackColor={{ false: "#333", true: "#1F3447" }}
        />
        <Text style={[styles.switchLabel]}>{t("language")}</Text>
      </View>

      <View>
        <Text style={styles.subTitle}>{t("dashboard.loan.title")}</Text>
        <View style={styles.fineContainer}>
          <Text style={styles.amountPending}>2,175 SAR</Text>
        </View>
      </View>

      <View>
        <Text style={styles.subTitle}>{t("dashboard.violationsTotal.title")}</Text>
        <View style={styles.fineContainer}>
          <Text style={styles.amountPending}>175 SAR</Text>
        </View>
      </View>

      <View>
        <Text style={styles.subTitle}>{t("dashboard.violationsDetails.title")}</Text>
      </View>

      <FlatList
        data={fines}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />

      <ButtonBar />
    </View>
  );
};

const styles = StyleSheet.create({
  dashboard: {
    flex: 1,
    paddingTop: 80,
    backgroundColor: "#002444",
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    paddingHorizontal: 20,
    color: "#B8B8B8",
  },
  subTitle: {
    fontSize: 22,
    marginBottom: 10,
    marginTop: 10,
    paddingHorizontal: 20,
    color: "#B8B8B8",
  },
  fineContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    margin: 5,
    backgroundColor: "#1F3447",
    borderRadius: 15
  },
  fineDescription: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#B8B8B8",
  },
  fineAmount: {
    fontSize: 16,
    color: "#B8B8B8",
  },
  fineDate: {
    fontSize: 14,
    color: "#B8B8B8",
  },
  amountPending: {
    fontSize: 18,
    color: "#B8B8B8",
  },
  switchContainer: {
    position: "absolute",
    top: 50,
    right: 20,
  },
  switchLabel: {
    color: "#B8B8B8"
  },
});

export default Dashboard;
