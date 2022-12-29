import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Screens/Auth/Login';
import SignUp from '../Screens/Auth/SignUp';
import Onboarding from '../Screens/Onboarding';

const authStack = createStackNavigator();
const AuthStack = () => {
  return (
    <authStack.Navigator
    screenOptions={{
        headerShown:false,
    }}
    >
      <authStack.Screen name="Login" component={Login} />
      <authStack.Screen name="Onboarding" component={Onboarding}/>
      <authStack.Screen name="Signup" component={SignUp} />
    </authStack.Navigator>
  );
};

export default AuthStack;

const styles = StyleSheet.create({});
