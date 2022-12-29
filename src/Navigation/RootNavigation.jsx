import {NavigationContainer}from "@react-navigation/native";
import InicioStack from "./InicioStack";
import AuthStack from "./AuthStack";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import * as SecureStore from 'expo-secure-store';

export default  RootNavigation = () => {
  const {userInfo, setUserInfo} = useContext(AuthContext);
  
    const user=false

    async function getValueFor() {
      let idBoy = await SecureStore.getItemAsync('idBoy');
      console.log('muestra idBoy', idBoy);
      if(idBoy){
        console.log('hay idBoy', idBoy)
        setUserInfo(idBoy);
      }else{
        console.log('no hay idBoy')
      }
  }
  if(userInfo.access_token){
    console.log('hay user info')
  }else{
    console.log(' no hay user info')
    getValueFor();
  }
    return (
        <NavigationContainer>
          {/* <InicioStack/> */}
          {userInfo!='' ?<InicioStack />  :<AuthStack /> }
    
          {/* <ButtonTab/> */}
        </NavigationContainer>
      );
  
}


