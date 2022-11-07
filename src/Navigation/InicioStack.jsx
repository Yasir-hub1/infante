import { createStackNavigator } from '@react-navigation/stack';


import { View, Text } from 'react-native';

import Inicio from '../Screens/Inicio';

const Stack = createStackNavigator();
const myConfig = {
  // title: 'Feed',
  headerShown: false,
  headerTitleAlign: 'center',
  presentation: 'modal',
  animationEnabled: true,
  gestureEnabled: true, //El valor predeterminado es verdadero en iOS, falso en Android.
  animationTypeForReplace: 'push', //El tipo de animación que se usará cuando esta pantalla reemplace a otra pantalla
  keyboardHandlingEnabled: true, //el teclado NO se descartará automáticamente al navegar a una nueva pantalla desde esta pantalla. El valor predeterminado es verdadero.
  //custom header
  /*  header: ({ navigation, route, options, back }) => (
    <CustomHeader title={route.name} />
  ), */
  // cardStyle: { backgroundColor: 'red' },
};
function CustomHeader({ title }) {
  return (
    <View
      style={{
        height: 80,
        width: '100%',
        backgroundColor: Colors.secundary,
        padding: 10,
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: Colors.ligth,
        }}
      >
        {title}
      </Text>
    </View>
  );
}

/* inicializamos las vistas Inicio y config */
export default function InicioStack() {
  return (
    <Stack.Navigator initialRouteName="Inicio" screenOptions={myConfig}>
      <Stack.Screen name="Inicio" component={Inicio} />
   
    </Stack.Navigator>
  );
}
