import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import RootNavigation from "./src/Navigation/RootNavigation"

import { AuthProvider } from './src/context/AuthContext';
export default function App() {
  return(
    <AuthProvider>
      <RootNavigation />
   </AuthProvider>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
