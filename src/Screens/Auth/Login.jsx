import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import LottieView from "lottie-react-native";
import { Ionicons } from "@expo/vector-icons";
import InputField from "../../components/InputField";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import CustomButton from "../../components/CustonButton";

export default Login = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <View style={{ paddingHorizontal: 25 }}>
        <View style={{ alignItems: "center" }}>
          {/* portada */}
          <LottieView
            resizeMode={"contain"}
            style={{ width: 250, height: 250 }}
            source={require("../../Image/lottie/68033-black-family.json")}
            autoPlay
          />
        </View>

        <Text
          style={{
            // fontFamily: 'roboto-medium',
            fontSize: 28,
            fontWeight: "500",
            color: "#333",
            marginBottom: 30,
          }}
        >
          Ingresa tu token
        </Text>
        <InputField
          label={"Escribe tu token aqui..."}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#41D0D1"
              style={{ marginRight: 5 }}
            />
          }
          keyboardType="email-address"
        />

        <CustomButton label={"Ingresar"} padding={10} onPress={() => navigation.navigate('Inicio')} />


        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <Text>Descarga la APP de tutor </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={{ color: "#41D0D1", fontWeight: "700" }}> Aqui.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inpuToken: {
    borderColor: "#ddd",
    borderWidth: 5,
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
});
