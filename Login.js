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
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { I18nextProvider, useTranslation } from "react-i18next";
import { Switch } from "react-native";
import i18n from "./i18n";
import Constants from 'expo-constants';
const appConfig = Constants.manifest;

const Login = ({ navigation }) => {
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [language, setLanguage] = useState("en-US");

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

  const handleLogin = () => {
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setEmail(user.email);
        navigation.navigate("Dashboard");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode + errorMessage);
        setErrorMessage("Incorrect email or password.");
      });
  };

  const handleReset = () => {
    setEmail("");
    setPassword("");
  };

  const handleSignup = () => {
    navigation.navigate("Signup");
  };

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

  return (
    <View style={styles.container}>
      <View style={styles.switchContainer}>
        <Switch
          value={language === "ar-SA"}
          onValueChange={toggleLanguage}
          thumbColor="#fff"
          trackColor={{ false: "#333", true: "#7f8fa6" }}
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
          {t("welcome")}
        </Text>
      </I18nextProvider>
      <TextInput
        style={[
          styles.input,
          { textAlign: language === "ar-SA" ? "right" : "left" },
        ]}
        placeholder={t("email")}
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={[
          styles.input,
          { textAlign: language === "ar-SA" ? "right" : "left" },
        ]}
        placeholder={t("password")}
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <Text style={styles.errorMessage}>{errorMessage}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>{t("login")}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.resetButtonText}>{t("reset")}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.signupLink} onPress={handleSignup}>
        <Text style={styles.signupLinkText}>{t("dontHaveAccount")}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1A5276",
  },
  title: {
    fontSize: 32,
    marginBottom: 32,
    color: "#FFFE",
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
    backgroundColor: "#7f8fa6",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  signupLink: {
    marginTop: 24,
  },
  signupLinkText: {
    color: "#fff",
    textDecorationLine: "underline",
    fontSize: 16,
  },
  errorMessage: {
    color: "#FF0000",
    marginBottom: 16,
  },
  switchContainer: {
    position: "absolute",
    top: 20,
    right: 20,
  },
});

export default Login;
