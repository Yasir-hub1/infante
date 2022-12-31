import React, { useState, useEffect, useContext } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking
} from "react-native";

import LottieView from "lottie-react-native";
import { Ionicons } from "@expo/vector-icons";
import InputField from "../../components/InputField";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import CustomButton from "../../components/CustonButton";
import axios, { Axios } from 'axios';
import { AuthContext } from "../../context/AuthContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { proyectSoftware } from "../../util/Apis";

import * as SecureStore from 'expo-secure-store';

const Login = ({ navigation }) => {
  //TODO: Inicializacion de Onboarding
  useEffect(() => {
    iniciarOnboarding()
  }, []);
  
  // funcion para guardar localmente el onboarding
  async function iniciarOnboarding(){
    const iniciarOnboarding =await AsyncStorage.getItem('@onboarding');
    if (iniciarOnboarding) {
      return;
    }else{
      await AsyncStorage.setItem('@onboarding','true');
      navigation.navigate('Onboarding');
    }
  }

  //FIN


  
  const {userInfo, setUserInfo} = useContext(AuthContext);
  // console.log(userInfo)
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
     // Guarda el id del niño en el dispositivo
  async function save(key, value) {
    console.log('entra a guardar la clave al phone');
    await SecureStore.setItemAsync(key, value);
    
    let result = await SecureStore.getItemAsync('idBoy');
    console.log('muestra valor guardado', result);
  }
  const register_token = (token) => {
    console.log(token)
    axios.post(
      `${proyectSoftware}/register_token_boy`,
      {
        token
      },
    ).then(res => {
      let c = res.data
      console.log(c)
      if(c.boy_id){
        console.log('hay boy_id', c.boy_id)
        setUserInfo(c.boy_id)
        let saveBoy= c.boy_id + ''
        save('idBoy', saveBoy);
        console.log('user info', userInfo)
      }
      if(c.error){
        setError(c.error);
        console.log('entra')
        console.log(error)
      }else{
        setError('');
      }
    }).catch(e => {
      console.log(`logouot error  ${e}`);
      console.log(e.response)
    })
  }
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
        {error ? 
            <>
            { <Text style={styles.textError}>{error}</Text> } 
            </>
            : ''}
        <InputField
          label={"Escribe tu token aqui..."}
          value={token}
          onChangeText={value => setToken(value)}
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

        <CustomButton label={"Ingresar"} padding={10} onPress={() => register_token(token)} />


        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <Text>Descarga la APP de tutor </Text>
          <TouchableOpacity onPress={() =>Linking.openURL("http://protectingyou.sw1.lol/Android/ProtectingYou.apk")}>
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
  textError: {
    justifyContent: 'center',
    
    paddingBottom: 0,
    color:'red',
    // textAlign: 'center',
  },
});
export default Login;