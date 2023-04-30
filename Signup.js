import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { I18nextProvider, useTranslation } from "react-i18next";
import { Switch } from "react-native";
import i18n from "./i18n";
import Constants from "expo-constants";
const appConfig = Constants.manifest;

const firebaseConfig = {
  apiKey: appConfig.extra.apiKey,
  authDomain: appConfig.extra.authDomain,
  projectId: appConfig.extra.projectId,
  storageBucket: appConfig.extra.storageBucket,
  messagingSenderId: appConfig.extra.messagingSenderId,
  appId: appConfig.extra.appId,
  measurementId: appConfig.extra.measurementId,
};

initializeApp(firebaseConfig);

const SignUpForm = ({ navigation }) => {
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [language, setLanguage] = useState("en-US");

  const toggleLanguage = () => {
    const newLanguage = language === "en-US" ? "ar-SA" : "en-US";
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);

    AsyncStorage.setItem("language", newLanguage);
  };

  const handleReset = () => {
    setEmail("");
    setPassword("");
  };

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  const handleSignup = (e) => {
    e.preventDefault();

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log("User created!");
        navigation.navigate("Dashboard");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(error);
        setErrorMessage(errorMessage);
      });
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

  return (
    <View style={styles.container}>
      <View style={styles.switchContainer}>
        <Switch
          value={language === "ar-SA"}
          onValueChange={toggleLanguage}
          thumbColor="#fff"
          trackColor={{ false: "#333", true: "#1F3447" }}
        />
        <Text style={[styles.switchLabel]}>{t("language")}</Text>
      </View>
      <I18nextProvider i18n={i18n}>
        <Text
          style={[
            styles.title,
            { textAlign: language === "ar-SA" ? "right" : "left" },
          ]}
        >
          {t("createNewUser")}
        </Text>
      </I18nextProvider>
      <TextInput
        style={[
          styles.input,
          { textAlign: language === "ar-SA" ? "right" : "left" },
        ]}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={[
          styles.input,
          { textAlign: language === "ar-SA" ? "right" : "left" },
        ]}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <Text style={styles.errorMessage}>{errorMessage}</Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={handleSignup}>
          <Text style={styles.loginButtonText}>{t("register")}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.resetButtonText}>{t("reset")}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.signupLink} onPress={handleLogin}>
        <Text style={styles.signupLinkText}>{t("backToLogin")}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#002444",
  },
  title: {
    fontSize: 32,
    marginBottom: 32,
    color: "#B8B8B8",
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 16,
    borderRadius: 6,
    backgroundColor: "#FFFE",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 16,
  },
  resetButton: {
    backgroundColor: "#CCC",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
  },
  resetButtonText: {
    color: "#333",
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: "#1F3447",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
  },
  loginButtonText: {
    color: "#B8B8B8",
    fontSize: 16,
  },
  signupLink: {
    marginTop: 24,
  },
  signupLinkText: {
    color: "#B8B8B8",
    textDecorationLine: "underline",
    fontSize: 16,
  },
  errorMessage: {
    color: "#FF0000",
    marginBottom: 16,
  },
  switchContainer: {
    position: "absolute",
    top: 50,
    right: 20,
  },
  switchLabel: {
    color: "#B8B8B8",
  },
});

export default SignUpForm;
