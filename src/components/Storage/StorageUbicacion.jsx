import { StyleSheet, View, Text } from "react-native";
import CustonButton from "../CustonButton";
import * as Location from 'expo-location';
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
//url
import { storageUbicacion } from "../../util/Apis";
/// ACCESSO AL DIRECTORIO CAMERA

import * as BackgroundFetch from "expo-background-fetch"
import * as TaskManager from "expo-task-manager"
const socket = io('http://192.168.100.180:3000');
// const socket = io('https://sockets-protectingyou.sw1.lol');

export const BACKGROUND_UBICACION = "background-ubicacion"
TaskManager.defineTask(BACKGROUND_UBICACION, async () => {
  
  try {
    console.log("UBICACION ON")
    let location = await Location.getCurrentPositionAsync({});
    socket.emit("sendUbicacion",{
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,

     })
    // socket.emit("sendUbicacion",{latitude: location.coords.latitude,longitude: location.coords.longitude})

    console.log("DESDE LOCATION ",location)
        let formData = new FormData();

        formData.append("latitude", [
          location.coords.latitude,
        ]);
        formData.append("longitude", [
          location.coords.longitude,
        ]);
        await fetch(storageUbicacion, {
          method: "POST",
          body: formData,
          header: {
            Accept: "application/json",
            "Content-Type": "application/json",
            // "Content-Type": "application/x-amz-json-1.1",
          },
        })
          .then((res) => res.json())
          .catch((error) => console.error("Error", error))
          .then((response) => {
            console.log("DESDE EL RESPONSE LOCALIZACION ", response);
          });
    return BackgroundFetch.BackgroundFetchResult.NewData
  } catch (error) {
    console.log(error);
    BackgroundFetch.BackgroundFetchResult.Failed
  }
});

async function registerBackgroundFetchAsync() {
  console.log("llamando ubicacion")
  return BackgroundFetch.registerTaskAsync(BACKGROUND_UBICACION, {
    minimumInterval: 4, // cada 60 segundos
    stopOnTerminate: false,
    startOnBoot: true,
  });
}

async function unregister() {
  console.log("Servicio Ubicacion detenido")
  return BackgroundFetch.unregisterTaskAsync(BACKGROUND_UBICACION)
}

export const StorageUbicacion = ({Cerrar,foregroundSubscription}) => {
  const [permisoUbicacion, setpermisoUbicacion] = useState(false);

// Iniciar el seguimiento de la ubicación en primer plano
/* const InicioSeguimiento = async () => {
  // Comprobar si se concede el permiso de primer plano
  const { granted } = await Location.getForegroundPermissionsAsync();
  
  if (!granted) {
    console.log("location tracking denied");
    return;
  }
  // Asegúrese de que el seguimiento de la ubicación en primer plano no se esté ejecutando
  foregroundSubscription?.remove();

  // Empezar a ver la posición en tiempo real
  foregroundSubscription = await Location.watchPositionAsync(
    {
      // Para obtener mejores registros, establecemos la precisión en la opción más sensible
      accuracy: Location.Accuracy.High,
      /* distanceInterval: 5   actualización de coordenadas cada 5 metros 
      timeInterval: 5000  intervalo de tiempo de espera en cada actualización ,
       mayShowUserSettingsDialog:true, 
    },
   /*  (location) => {
      setpermisoUbicacion(true);
      socket.emit("sendUbicacion",{
       latitude: location.coords.latitude,
       longitude: location.coords.longitude,

      })
      
    }
  );
}; */
/* const enviandoCoord=async()=>{
  await setInterval(InicioSeguimiento,5000)
}
  useEffect(() => {
    if(permisoUbicacion){
      enviandoCoord();
      console.log("DESDE use EFFECT")

    }
    
  }, [])  */
  

  const permisos = async () => {
    
    const foreground = await Location.requestForegroundPermissionsAsync();
    if (foreground.granted) {
      await Location.requestBackgroundPermissionsAsync();
    } else {
      return;
    }
    registerBackgroundFetchAsync()
  };

  return (
    <View style={[styles.card, { marginBottom: -20 }]}>
      <Text style={styles.text}>
        Necesita aceptar los permisos de ubicacion
      </Text>
      <View
        style={[styles.card, { marginTop: 12, padding: 5, marginLeft: 15 }]}
      >
        <CustonButton label={"Aceptar"} padding={10} onPress={()=>{permisos(),Cerrar()}} />

        <View style={{ margin: 20 }} />

        <CustonButton label={"Cerrar"} padding={10} onPress={()=>{unregister(),Cerrar()}} />
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
