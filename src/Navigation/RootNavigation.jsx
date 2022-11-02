import {NavigationContainer}from "@react-navigation/native";
import InicioStack from "./InicioStack";
import AuthStack from "./AuthStack";

export default  RootNavigation = () => {
    const user=false
    return (
        <NavigationContainer>
          {/* <InicioStack/> */}
          {user ?<InicioStack />  :<AuthStack /> }
    
          {/* <ButtonTab/> */}
        </NavigationContainer>
      );
  
}


