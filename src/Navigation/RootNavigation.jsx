import {NavigationContainer}from "@react-navigation/native";
import InicioStack from "./InicioStack";
import AuthStack from "./AuthStack";

export default  RootNavigation = () => {
    const user=true
    return (
        <NavigationContainer>
          {/* <InicioStack/> */}
          {user ?<InicioStack />  :<AuthStack /> }
    
          {/* <ButtonTab/> */}
        </NavigationContainer>
      );
  
}


