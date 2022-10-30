import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Permisos from './src/components/Permisos';
import StoragePrueba from './src/components/Storage';
import Storage from './src/components/StorageInternal';
import SubirImagen from './src/components/SubirImagen';

export default function App() {
  return <StoragePrueba/>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
