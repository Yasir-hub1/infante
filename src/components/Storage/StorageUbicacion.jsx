import {
    StyleSheet,
    View,
    Text,
  } from "react-native"
  import CustonButton from "../CustonButton"
  import * as Location from 'expo-location'  
  
  
  //url
  import {storageUbicacion} from "../../util/Apis";
  
  /// ACCESSO AL DIRECTORIO CAMERA
  export const StorageUbicacion = ({ onPress }) => {

  const permisos = async() => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if(status !== 'granted') {return}
      let location = await Location.getCurrentPositionAsync()
      console.log(location)
      let formData = new FormData();
      formData.append("coordenadas", location);
      let llega = await fetch(storageUbicacion, {
        method: "POST",
        body: formData,
        header: {
          Accept: "application/json",
          // 'Content-Type':'application/json'
          "Content-Type": "application/x-amz-json-1.1",
        },
      })
      console.log(llega)
    }
    return (
      <View style={[styles.card, { marginBottom: -20 }]}>
        <Text style={styles.text}>
          Necesita aceptar los permisos de ubicacion
        </Text>
        <View
          style={[styles.card, { marginTop: 12, padding: 5, marginLeft: 15 }]}
        >
          <CustonButton label={"Aceptar"} padding={10} onPress={permisos} />
  
          <View style={{ margin: 20 }} />
  
          <CustonButton label={"Cerrar"} padding={10} onPress={onPress} />
  
        </View>
      </View>
    );
  };
  const styles = StyleSheet.create({
    card: {
      marginTop: 10,
      flexDirection: "row",
      flexWrap: "wrap",
    },
    text: {
      justifyContent: "center",
      alignSelf: "center",
      alignItems: "center",
      marginHorizontal: 20,
    },
    btn: {},
  });
  
  export default StorageUbicacion;
  