// import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { Axios } from 'axios';
// import React, { createContext, useState } from "react";
import React, { createContext, useEffect, useState } from 'react';

import { proyectSoftware } from "../util/Apis";

// import * as Device from 'expo-device';
// import * as Notifications from 'expo-notifications';

// import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState('');


    const quantity_of_content = () => {
        // console.log('entra a cantidad total de contenido');
    
        axios.post(
          `${BASE_URL}/quantity_of_content`,
          {
            params: {
              // id: user.id
            }
          },
          {
            headers: { Authorization: `Bearer ${userInfo.access_token}` },
          }
        ).then(res => {
          let c = res.data
          setContent(c)
          // console.log(c)
          // console.log(JSON.stringify(res.data.contenido))
        }).catch(e => {
          console.log(`logouot error  ${e}`);
        })
      }
    
  return (
    <AuthContext.Provider
      value={{
        userInfo, setUserInfo
      }}
      >
        {children}
      </AuthContext.Provider>  
  );
}